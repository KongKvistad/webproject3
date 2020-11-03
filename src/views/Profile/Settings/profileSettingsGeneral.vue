<template>
    <ProfileLayout>
        <template v-slot:middleBar>
            <div class="container">
                <h1>General Settings</h1>
                <form class="aligner-item align-item-top" @submit.prevent>
                    <br>
                    <h2>Name:</h2>
                    <br>
                    <label>First Name: </label><input type="text" v-model="fname"><label> Last name: </label><input type="text" v-model="lname"><br>
                    <button type="submit" @click="changeName()">Save</button>
                </form>

                <form class="aligner-item" @submit.prevent>
                    <br>
                    <h2>Gender</h2>
                    <br>
                    <label>Gender: </label> <select v-model="Gender">
                        <option>--Select--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <button type="submit" @click="changeGender()">Save</button>
                </form>

                <form class="aligner-item" @submit.prevent>
                    <br>
                    <h2>Birthday</h2>
                    <br>
                    <label>Select your birthday:</label><input type="date" v-model="Birthday">
                    <button type="submit" @click="updateBirthday()">Save</button>
                </form>

                <form class="aligner-item" @submit.prevent>
                    <br>
                    <h2>About Me:</h2>
                    <br>
                    <textarea v-model="aboutMe" :placeholder="[[userProfile.About]]"></textarea><br>
                    <button type="submit" @click="updateAbout()">Save</button>
                </form>

                <form class="aligner-item align-item-bottom" @submit.prevent>
                    <br>
                    <h2>Location</h2>
                    <br>
                    <label>Your Location: </label><input type="text" v-model="Location" :placeholder="[[userProfile.Location]]"> <button type="submit" @click="updateLocation()">Save</button>
                </form>
            </div>
        </template>

    </ProfileLayout>
  
</template>

<script>
import { mapState } from 'vuex';
import ProfileLayout from '@/components/profileComponents/ProfileLayout.vue';
//import {getCollections} from '@/helpers/collections.js'
import {db, auth} from '@/components/firebaseInit.js';
export default {
    name: 'profileSettingsGeneral',
    components: {
        ProfileLayout,

    },
    data() {
        return{
            result: false,
            fname: '',
            lname: '',
            fullName: '',
            Birthday: Date,
            Gender: String,
            aboutMe: '',
            Location:'',
        }
    },

    computed: mapState(['userProfile']),

    methods:{
        changeName() {
            var docRef = db.collection('Users').doc(auth.currentUser.uid);
            var fullName = this.fname + " " + this.lname
            return docRef.update({
                name: fullName
            })
            .then(function(){
                console.log("Document Updated");
                location.reload();
            })
            .catch(function(error){
                console.log("Error: ", error)
            })
        },

        changeGender() {
            var docRef = db.collection('Users').doc(auth.currentUser.uid);
            var data = this.Gender;
            return docRef.update({
                Gender: data
            })
            .then(function(){
                console.log("Gender Updated");
                location.reload();
            })
            .cath(function(error){
                console.log("Error ", error)
            })
        },

        updateBirthday(){
            var docRef = db.collection('Users').doc(auth.currentUser.uid);
            var data = this.Birthday
            return docRef.update({
                Birthday: data
            })
            .then(function(){
                console.log("Birthday Updated");
                location.reload();
            })
            .catch(function(error){
                console.log("Error ", error)
            })
        },

        updateAbout() {
            var docRef = db.collection('Users').doc(auth.currentUser.uid);
            var data = this.aboutMe
            return docRef.update({
                About: data
            })
            .then(function(){
                console.log("About updated");
                location.reload();
            })
            .catch(function(error){
                console.log("Error: ", error)
            })
        },

        updateLocation() {
            var docRef = db.collection('Users').doc(auth.currentUser.uid);
            var data = this.Location
            return docRef.update({
                Location: data
            })
            .then(function(){
                console.log("Location Updated");
                location.reload();
            })
            .catch(function(error){
                console.log("Error: ", error)
            })
        }
        
        
    },

    created() {
        
        db.collection('Users').doc(auth.currentUser.uid).get()
        .then(function(doc) {
            console.log(doc.data())
        })
        
        
    }

}
</script>

<style scoped>
h1, h2 {
    text-decoration: underline;
}
.container{
    padding-left: 10em;
    display: block;
    align-items: center;
    justify-content: center;
    max-width: 90%;
}

input, textarea, select{
    border: 1px solid;
    
}

textarea{
    width: 30em;
    height: 15em;
}
form {
    padding-bottom: 3%;
    border-bottom: solid 1px;
}

button {
    border: 1px solid;
    padding: 0 0.3% 0 0.3%;
    background-color: #bb4584;
    color: white;
    border-radius: 10%;
}

</style>