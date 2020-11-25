import { db } from '../components/firebaseInit.js'


//#PARAM name: String: name of the collection,
//#PARAM payload: bool: wheter you want the data or the headers

function getCollections(collection, payLoad) {
    let res = []
    //if only one resource has been requested
    if (typeof collection === 'string') {

        db.collection(collection).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // if payload is not requested, assume the programmer wants headers (document ids)
                let data = payLoad ? doc.data() : doc.id
                res.push(data);
            });
        });
        //otherwise
    } else {

        collection.forEach(ref => {
            db.collection(ref).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // if payload is not requested, assume the programmer wants headers (document ids)
                    let data = payLoad ? doc.data() : doc.id
                    res.push(data);
                });
            });
        })
    }
    return res;
}


async function getDocByReference(doctype, refId) {
    
    const ref = db.collection(doctype).doc(refId)
    const res = await ref.get().then(doc => {
        let newObj = doc.data()
        if(newObj != undefined){
            newObj.id = doc.id
        }
       
        return newObj
    })
    return res

}

const multipleDocs = async (ids, type) => {
    return Promise.all(ids.map(item => getDocByReference(type, item)))
}

//true async
async function filtersWithHeaders(type) {
    let ref = db.collection(type);
    let res = {};
    await ref.get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
            res[doc.id] = doc.data()
        });
    })
    return res
}

async function getPostByTerm(collection, searchTerm, type, filters){

    let ref = false
    //users may just have pressed the category
    if(!filters && searchTerm == "false"){ 
        ref =  db.collection(collection)
        
        // or it may have searched along with filters
    } else if(filters) {
        let parsedFilt = filters.split("+")
        console.log(parsedFilt)
        ref =  db.collection(collection).where(type, "==", searchTerm).where('Params', 'array-contains-any', parsedFilt)
    
    } else if(searchTerm && !filters){
        ref =  db.collection(collection).where(type, "==", searchTerm)
    }
    const query = await ref.get();
    const snapshot = query.docs.map(x => {
        let newObj = x.data()
        newObj.id = x.id
        return newObj
    })
    
    return snapshot   
}

const getAllByTerm = async (collections, searchTerm, type, filters) => {
    return Promise.all(collections.map(col => getPostByTerm(col, searchTerm, type, filters)))
}
// kombiner filterByParam,
// getallbyterm og getpostbyterm og getallbyterm
// const multiplePosts = async (ids, type) => {
//     return Promise.all(ids.map(item => getDocByReference(type, item)))
// }

async function populateRandom(refs) {

    let res = []
    let num = 3

    refs.forEach(ref => {
        let i = num;

        db.collection(ref).orderBy("Title", "asc").limit(num).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {

                let obj = doc.data()
                obj.id = doc.id
                obj.isLast = i == num ? ref : false;
                i--

                res.push(obj);
            });
        });
    })
    await res;
    return res

}




export {
    getCollections,
    getDocByReference,
    filtersWithHeaders,
    getPostByTerm,
    populateRandom,
    getAllByTerm,
    multipleDocs,


};
