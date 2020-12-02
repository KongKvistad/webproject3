import {db} from '../components/firebaseInit.js'
import * as firebase from 'firebase'

async function createGroup(obj, user){
    //add the creator as member
    obj["Members"].push(user.id)

    const res = await db.collection("Groups").add(obj)
    .then(function(messageRef) {
        user.belongsTo ? user.belongsTo.push(messageRef.id) : user.belongsTo = [messageRef.id]
        
        let ref = db.collection("Users")
        ref.doc(user.id).set(user)
        //returns messageRef to outer layer
        return messageRef.id
    })
    //returns value from const res (which would be the messageRef)
    return res
}

const updateMembers = async (userIds, groupId, operation) => {

    // Get a new write batch
    var batch = db.batch();

    userIds.map(id => {
        var sfRef = db.collection("Users").doc(id);
        batch.update(sfRef, {
            "belongsTo": operation == "add" ? firebase.firestore.FieldValue.arrayUnion(groupId) : firebase.firestore.FieldValue.arrayRemove(groupId)
        });
    })

    // Commit the batch
    const res = await batch.commit().then(function () {
        return updateGroup(userIds, groupId, operation)
    });

    return res
}

const updateGroup = async (userIds, groupId, operation) => {
    const res = await db.collection("Groups").doc(groupId).update({
        Members: operation == "add" ? firebase.firestore.FieldValue.arrayUnion(...userIds) : firebase.firestore.FieldValue.arrayRemove(...userIds)
    }).then(function(){
        console.log(userIds)
        return true
    })
    return res
}


const createPost = async (postName, postCont, userId, groupId) => {
    
    const res = await db.collection("GroupPosts").add({
        Creator: userId,
        Title: postName,
        Desc: postCont,
        Group: groupId,
    })
    
    return res
}

const createEvent = async (obj) => {
    const res = await db.collection("Events").add(obj)
    .then(function(messageRef) {
        //returns messageRef to outer layer
        return messageRef.id
    })
    //returns value from const res (which would be the messageRef)
    return res

}

export {
    createGroup,
    updateMembers,
    updateGroup,
    createPost,
    createEvent
}