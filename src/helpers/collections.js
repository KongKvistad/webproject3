import {db} from '../components/firebaseInit.js'


//#PARAM name: String: name of the collection,
//#PARAM payload: bool: wheter you want the data or the headers

function getCollections(collection, payLoad){
    let res = []
    
    if(typeof collection === 'string'){
        //if only one resource has been requested
        db.collection(collection).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // if payload is not requested, assume the programmer wants headers (document ids)
                let data = payLoad ? doc.data() : doc.id
                res.push(data);
            });
        });
    } else {
        //otherwise
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


function getDocByReference(refParam, refId){
    db.collection("Users").where(refParam, "==", refId).get().then(res => console.log(res))
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
            
            res.push(doc.data());
        });
    });
    return res;
}

async function getAllByTerm(collections, searchTerm, type, filters){
    
    let res = []
   
    
    collections.forEach(ref => {
        db.collection(ref).where(type, "==", searchTerm).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            let data = doc.data()
            
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
};
