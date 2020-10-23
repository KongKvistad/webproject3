import {db} from '../components/firebaseInit.js'

async function createGroup(){
    db.collection("Groups").add({
        created: new Date(),
    })
}

export {
    createGroup
}