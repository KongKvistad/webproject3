import {db} from '../components/firebaseInit.js'

//#PARAM name: String: name of the collection

function getCollections(param){
    let res = []
    db.collection(param).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            res.push(doc.id);
        });
    });
    return res;

}

function getDocByReference(refParam, refId){
    db.collection("Users").where(refParam, "==", refId).get().then(res => console.log(res))
}

export {getCollections, getDocByReference};