import {db} from '../components/firebaseInit.js'


async function createGroup(obj, user){
    //add the creator as member
    obj.members.push(user.id)

    const res = await db.collection("Groups").add({
        Created: new Date(),
        Title: obj.name,
        Desc: obj.desc,
        Members: obj.members,
        Creator: user.id

    }).then(function(messageRef) {
        user.belongsTo ? user.belongsTo.push(messageRef.id) : user.belongsTo = [messageRef.id]
        
        let ref = db.collection("Users")
        ref.doc(user.id).set(user)
        //returns messageRef to outer layer
        return messageRef.id
    })
    //returns value from const res (which would be the messageRef)
    return res
}

const attatchToMembers = async (groupId, memb) => {

    // returns false if members are already in group, returns id if not

    let exData = memb.belongsTo ? memb.belongsTo : []
    if(exData.filter(x => x.includes(groupId)).length > 0){
        return false
    } else {
        exData.push(groupId)
        let res = await db.collection("Users").doc(memb.id).update({
            belongsTo: exData
        }).then(function(){
            return memb.id
        })
        return res
    }
   
 
}

const attatchToGroup = async (groupId, memberIds, uId) => {
    
    let members = memberIds
    
    if(members.filter(x => x.includes(uId)).length > 0){
        return false
    } else {
        members.push(uId)
        let res = await db.collection("Groups").doc(groupId).update({
            Members: members
        })
        return res
    }
}

// async function removeMembers(groupId, memberIds){
    
// }

export {
    createGroup,
    attatchToMembers,
    attatchToGroup
}