import {db} from '../components/firebaseInit.js'


async function createGroup(obj, user){
    //add the creator as member
    obj.members.push(user.uid)

    const res = await db.collection("Groups").add({
        Created: new Date(),
        Title: obj.name,
        Desc: obj.desc,
        Members: obj.members,
        Creator: user.uid

    }).then(function(messageRef) {
        user.belongsTo ? user.belongsTo.push(messageRef.id) : user.belongsTo = [messageRef.id]
        
        let ref = db.collection("Users")
        ref.doc(user.uid).set(user)
        //returns messageRef to outer layer
        return messageRef.id
    })
    //returns value from const res (which would be the messageRef)
    return res
}

const attatchMembers = async (groupId, memb) => {

    let exData = memb.belongsTo
    exData.push(groupId)
   
    let res = await db.collection("Users").doc(memb.id).update({
        belongsTo: exData
    })
    return res
 
}

// async function removeMembers(groupId, memberIds){
    
// }

export {
    createGroup,
    attatchMembers
}