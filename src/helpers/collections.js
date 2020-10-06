import {db} from '../components/firebaseInit.js'


//#PARAM name: String: name of the collection,
//#PARAM payload: bool: wheter you want the data or the headers

function getCollections(collection, payLoad){
    let res = []
    db.collection(collection).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // if payload is not requested, assume the programmer wants headers (document ids)
            let data = payLoad ? doc.data() : doc.id
            res.push(data);
        });
    });
    return res;
}


function getDocByReference(refParam, refId){
    db.collection("Users").where(refParam, "==", refId).get().then(res => console.log(res))
}

//true async
async function filtersWithHeaders(){
    let ref = db.collection('filters');
    let res = {};
    await ref.get().then((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
            res[doc.id] = doc.data()
        });
    })
    return res
}


export {getCollections, getDocByReference, filtersWithHeaders};
