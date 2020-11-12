<!--
    @desc view for general settings in profile
-->
<template>
    <ProfileLayout>
        <template v-slot:middleBar>
            <div class="container">
                <!-- 
                    FORM TO CHANGE THE DIFFERENT INFORMATION ABOUT THE USER
                    Every setting has its own save button so not everything is changed/saved at once
                -->
                <h1>General Settings</h1>
                <form class="aligner-item align-item-top" @submit.prevent><!-- Form to edit name -->
                    <br>
                    <h2>Name:</h2>
                    <br>
                    <label>First Name: </label><input type="text" v-model="fname"><label> Last name: </label><input type="text" v-model="lname">
                    <button type="submit" @click="changeName()">Save</button>
                </form>

                <form class="aligner-item" @submit.prevent> <!-- Form to edit gender -->
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

                <form class="aligner-item" @submit.prevent> <!-- Form to edit Birthday -->
                    <br>
                    <h2>Birthday</h2>
                    <br>
                    <label>Select your birthday:</label><input type="date" v-model="Birthday">
                    <button type="submit" @click="updateBirthday()">Save</button>
                </form>

                <form class="aligner-item" @submit.prevent><!-- Form to edit the about section -->
                    <br>
                    <h2>About Me:</h2>
                    <br>
                    <textarea v-model="aboutMe" :placeholder="[[userProfile.About]]"></textarea>
                    <button type="submit" @click="updateAbout()">Save</button>
                </form>

                <form class="aligner-item align-item-bottom" @submit.prevent> <!-- Form to edit Location -->
                    <br>
                    <h2>Location</h2>
                    <br>
                    <label>Your Location: </label><input type="text" v-model="Location" :placeholder="[[userProfile.Location]]"> <button type="submit" @click="updateLocation()">Save</button>
                </form>
                <div>
                    <br>
                    <h2>Profile Picture</h2>
                    <p>Upload a new profile picture here</p>
                    <br>
                    <ImgUpload  @imgUpload="addImgURL"/> <!-- Uploads image with the childs Image URL -->
                </div>
            </div>
        </template>

    </ProfileLayout>
  
</template>

<script>
import { mapState } from 'vuex';
import ProfileLayout from '@/components/profileComponents/ProfileLayout.vue';
import ImgUpload from '@/components/ImgUpload.vue';
//import {getCollections} from '@/helpers/collections.js'
import {db, auth} from '@/components/firebaseInit.js';
export default {
    name: 'profileSettingsGeneral',
    components: {
        ProfileLayout,
        ImgUpload,

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
        /*
        ** METHODS FOR CHANGING INFORMATION
        ** Common for all: if the information does not exist in the database it will be created
        ** otherwise it will be overwritten
        */


        changeName() { //updates Name
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

        changeGender() { //updates gender
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

        updateBirthday(){ // Updates Birthday
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

        updateAbout() { //updates About
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

        updateLocation() { //updates location
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
        },

        addImgURL(value) { //Updating imageURL in database with new image
            console.log(value);
            const docRef = db.collection('Users').doc(auth.currentUser.uid);
            var data = value[0];
            return docRef.update({
                ImgURL: data
            })
            .then(function(){
                console.log("image uploaded");
            })
            .catch(function(error){
                console.log("error: ", error)
            })
        }
        
        
    },

    created() {
        
        
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
    border-radius: 7px;
    
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
    float: right;
}

</style>