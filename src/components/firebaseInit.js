import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/performance'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);
const perf = firebase.performance();

const db = firebaseApp.firestore()
const auth = firebase.auth()
const usersCollection = db.collection('Users')



export {
    db,
    auth,
    usersCollection,
    perf

}