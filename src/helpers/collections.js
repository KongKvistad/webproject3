import {db} from '../components/firebaseInit.js'


//#PARAM name: String: name of the collection,
//#PARAM payload: bool: wheter you want the data or the headers

function getCollections(collection, payLoad){
    let res = []
        //if only one resource has been requested
    if(typeof collection === 'string'){
    
        db.collection(collection).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // if payload is not requested, assume the programmer wants headers (document ids)
                let data = payLoad ? doc.data() : doc.id
                res.push(data);
            });
        });
    //otherwise
    } else {
        
        collection.forEach(ref => {
            db.collection(ref).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // if payload is not requested, assume the programmer wants headers (document ids)
                    let data = payLoad ? doc.data() : doc.id
                    res.push(data);
                });
            });
        })
    }
    return res;
}


async function getDocByReference(doctype, refId){
    const ref = db.collection(doctype).doc(refId)
    const res = await ref.get().then(doc => {
        return doc.data()
    })
    return res
      
}

const multipleDocs = async (ids, type) => {
    return Promise.all(ids.map(item => getDocByReference(type, item)))
}

//true async
async function filtersWithHeaders(type){
    let ref = db.collection(type);
    let res = {};
    await ref.get().then((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
            res[doc.id] = doc.data()
        });
    })
    return res
}

async function getPostByTerm(collection, searchTerm, type){
    
    let res = []
    let ref = ""
    type = type == "false" ? false : type

    if(searchTerm !== "false") { 
        ref = db.collection(collection).where(type, "==", searchTerm)
    } else {
        ref = db.collection(collection)
    }
    await ref.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let obj = doc.data()
            obj.id = doc.id
            res.push(obj);
        });
    });
    return res;
}

async function getAllByTerm(collections, searchTerm, type, filters){
    
    let res = []
   console.log(collections, searchTerm, type, filters)
    
    collections.forEach(ref => {
        db.collection(ref).where(type, "==", searchTerm).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            
            let obj = doc.data()
            obj.id = doc.id
            let data = doc
            
            if(data.Params && filters){
                
                let filtered = filterByParam(data, filters)
                
                if(filtered){
                    res.push(filtered);
                }
                
                
            } else {
                console.log("this one failed check", data)
            }
            

            });
        });
    })
    await res
    return res

    
}

function filterByParam(entry, filters){
    
    //extend to include more than one filter

    let filtersArr = filters.split("+")
    
    let matchCount = 0;

    matchCount = entry.Params.filter(x => filtersArr.includes(x)).length
    console.log(matchCount)
    
    return matchCount >= 1 ? entry : false
}


async function populateRandom(refs){

    let res = []
    let num = 3

    refs.forEach(ref => {
        let i = num;
        
        db.collection(ref).orderBy("Title", "asc").limit(num).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                
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
//create function to get all groups by user id



export {
    getCollections,
    getDocByReference,
    filtersWithHeaders,
    getPostByTerm,
    populateRandom,
    getAllByTerm,
    multipleDocs,
   
  
};
