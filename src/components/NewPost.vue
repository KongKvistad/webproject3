<template>
<!-- <div class="box w-full flex flex-col items-between" >
    <form>
    <div class="box-wrapper grid grid-cols-2 grid-rows-1">
        <div class="w-full flex justify-start">
            <span class="w-1 bg-blue-500 mr-4"> </span> -->
            <!-- TOP LEFT -->
            <!-- <div class="bg-white rounded flex items-center w-11/12 shadow-sm border border-gray-200">
                <input v-model="groupName" name="" id="" @keydown.enter="PLACEHOLDER" placeholder="Title" class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
                <select v-model="socialSelect"  name="socialSelect" v-if="currentPage().includes('Social')"> --> <!-- Displayed if the user is in Social -->
                    <!-- <option>Choose Type</option>
                    <option value="event">Event</option>
                    <option value="group">Group</option>
                </select> -->
                <!-- <select v-model="marketSelect" :placeholder="{marketSelect}" name="marketSelect" v-else-if="currentPage().includes('Marketplace')"> --> <!-- Displayed if the user is in marketplace -->
                    <!-- <option>Choose Type</option>
                    <option value="eCourse">E-Course</option>
                    <option value="secondHand">Second Hand</option>
                </select> -->
                <!-- <select v-model="discoverSelect" :placeholder="{discoverSelect}" name="discoverSelect" v-else-if="currentPage().includes('Discover')"> --> <!-- Displayed if the user is in Discover -->
    <!--                 <option>Choose Type</option>
                    <option value="exchange">Exchange</option>
                    <option value="studyProgramme">Study Programe</option>
                    <option value="work">Work</option>
                </select>
            </div>
        </div> -->
        <!-- Top Right -->
       <!--  <div class="w-full flex justify-start relative">
            <span class="w-1 bg-blue-500 mr-4"> </span> -->
            <!-- If the user it at social the following wil be displayed -->
       <!--      <div v-if="currentPage().includes('Social')">
                <div class="bg-white rounded flex items-center w-11/12 shadow-sm border border-gray-200">
                    <button class="outline-none focus:outline-none m-5"><svg class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                    <input v-model="searchTerm" name="" id="" @keydown.enter="PLACEHOLDER" placeholder="Search for people.." class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
                </div>
                <ul v-if="matches.length > 0 && !clickedItem" class="absolute mx-auto text-gray-600 px-8 py-4 pb-6 bg-opacity-75 bg-blue-600 mt-20 ml-5 w-11/12">
                    <li v-on:click="addItem(item)"
                        v-for="(item, idx) in matches"
                        :key="item.name+idx"
                        class="mt-2 bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-300">
                        <img class="h-6 mr-5" src="@/assets/user.svg"/>
                        <p>{{item.name}} {{item.num ? "(" + item.num + ")" : ""}}</p>
                    </li>
                </ul>
            </div>
            
            END
            If the user it at market place the following will be displayed
            <div v-if="currentPage().includes('Marketplace')" class="bg-white rounded flex items-center w-11/12 shadow-sm border border-gray-200">
                <label for="price">Price: </label>
                <input v-model="price" name="price" id="" type="number" min="0" :placeholder="{price}" class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
            </div>
            <div v-if="marketSelect == 'eCourse'" class="bg-white rounded flex items-center w-11/12 shadow-sm border border-gray-200"> Displays if the user has selected ECOURSE
                    <label for="duration">Duration: </label>
                    <input v-model="duration" name="duration" id="" type="number" min="0" placeholder="How long the course last..." class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
            </div>

            If the user is at Discover the following will be displayed
        </div>
        
        
    </div>

    <div class="box-wrapper grid grid-cols-2 grid-rows-1 mb-12">
        <div class="w-full flex justify-start mt-4">
            <span class="w-1 bg-blue-500 mr-4"> </span>
            <div class="bg-white rounded flex items-center h-32 w-11/12 shadow-sm border border-gray-200">
                <textarea v-model="description" name="" id="" @keydown.enter="PLACEHOLDER" placeholder="description.." class="w-full h-full p-2 pl-4 text-sm outline-none focus:outline-none bg-transparent"></textarea>
            </div><br>
        </div>
        <div class="w-full flex justify-start">
            <span class="w-1 bg-blue-500 mr-4"> </span>
            <ul class="memberarea px-4 pt-2 flex items-center w-11/12 mt-4" v-if="currentPage().includes('Social')">  Displayed if the user is at Social

            
                 <ul class="box flex flex-wrap">
                <li class="rounded bg-blue-200 px-4 py-1 mr-2 mb-2" v-for="(item, idx) in members" :key="item+idx">{{item.name}}</li>
                </ul>
                

            </ul>
            <div v-if="marketSelect == 'eCourse'">
                <div class="bg-white rounded flex items-center w-11/12 shadow-sm border border-gray-200"> 
                    <label for="language">Language: </label>
                    <input v-model="Language" name="language" id="" type="text" placeholder="Language" class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
                </div>
                <div class="bg-white rounded flex items-center w-11/12 shadow-sm border border-gray-200">
                    <label for="difficulty">Difficulty: </label>
                    <input v-model="Difficulty" name="difficulty" placeholder="Difficulty from 1-5" id="" type="number" min="1" max="5" class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
                </div>
            </div>
        </div>
         <div class="bg-white rounded flex items-center w-11/12 shadow-sm border border-gray-200">
                <label>Country: </label>
                <input v-model="Country" type="text" placeholder="select country..." class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
        </div>
        <div class="bg-white rounded flex items-center w-11/12 shadow-sm border border-gray-200">
            <label> City: </label>
            <input v-model="City" type="text" placeholder="Select City..." class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
        </div>
        <ImgUpload/>
        
    </div>
    <button @click="submit()" class="w-32 h-8 rounded bg-blue-600 font-bold text-white ml-auto mr-2">Submit</button>
    </form>
</div>     -->
<div>
    <div>
        <div>
            <label for="title">Title </label>
            <input v-model="title" name="title" @keydown.enter="PLACEHOLDER" placeholder="Title..">

            <select v-model="socialSelect"  name="socialSelect" v-if="currentPage().includes('Social')"> --> <!-- Displayed if the user is in Social -->
                <option>Choose Type</option>
                <option value="event">Event</option>
                <option value="group">Group</option>
            </select>
            <select v-model="marketSelect" :placeholder="{marketSelect}" name="marketSelect" v-else-if="currentPage().includes('Marketplace')"> <!-- Displayed if the user is in marketplace -->
                <option>Choose Type</option>
                <option value="eCourse">E-Course</option>
                <option value="secondHand">Second hand</option>
            </select>
            <select v-model="discoverSelect" :placeholder="{discoverSelect}" name="discoverSelect" v-else-if="currentPage().includes('Discover')"> <!-- Displayed if the user is in Discover -->
                
                <option value="exchange">Exchange</option>
                <option value="studyProgramme">Study programme</option>
                <option value="work">Work</option>
            </select> <br>

            <label for="description">Description:</label><br>
            <textarea v-model="description" name="description" placeholder="Description..."></textarea>
        </div> <br>

        <div v-if="currentPage().includes('Social')"> <!-- Displayed if the user is in social -->
            <div>
                <button><svg class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                <input v-model="searchTerm" name="" @keydown.enter="PLACEHOLDER" placeholder="Search for people..">
                
            </div>
            <ul v-if="matches.length > 0 && !clickedItem">
                <li v-on:click="addItem(item)"
                    v-for="(item, idx) in matches"
                    :key="item.name+idx"
                    >
                    <img class="h-6 mr-5" src="@/assets/user.svg"/>
                    <p>{{item.name}} {{item.num ? "(" + item.num + ")" : ""}}</p>
                </li>
            </ul>

            <ul>
                <ul class="box flex flex-wrap">
                <li class="rounded bg-blue-200 px-4 py-1 mr-2 mb-2" v-for="(item, idx) in members" :key="item+idx">{{item.name}}</li>
                </ul>
            </ul>
        </div>

        <div v-if="currentPage().includes('Marketplace')"> <!-- Displayed if the user is in Marketplace -->
            <label for="price">Price: </label>
            <input v-model="price" name="price" type="number" min="0">

            <div v-if="marketSelect == 'secondHand'"> <!-- Displayed if the user selects Second Hand -->
                <label for="type">Type of item: </label>
                <input v-model="type" name="type" type="text" placeholder="Animal, phone etc...">
            </div>
            
            <div v-if="marketSelect == 'eCourse'"> <!-- Displays if user selects e-course -->
                <label for="duration">Duration: </label>
                <input v-model="duration" name="duration" id="" type="number" min="0" placeholder="How long the course last...">

                <label for="language">Language: </label>
                <input v-model="language" name="language" id="" type="text" placeholder="English">

                <label for="difficulty">Difficulty: </label>
                <input v-model="difficulty" name="difficulty" placeholder="Difficulty from 1-5" id="" type="number" min="1" max="5">
            </div>
        </div>

        <div v-if="currentPage().includes('Discover')"> <!-- displays if the user is at Discover Page -->
            <label for="school">School: </label>
            <input v-model="school" name="school" type="text" placeholder="Harvard University"><br>

            <div v-if="discoverSelect == 'studyProgramme'"> <!-- displays if user has selected study Programme -->
                <label for="studyField">Study field: </label>
                <input v-model="studyField" name="studyField" type="text" placeholder="IT">

                <label for="studyDuration">Duration: </label>
                <input v-model="studyDuration" name="studyDuraition" type="text" placeholder="3 years">

                <label for="visa">Visa: </label>
                <input v-model="visa" name="visa" type="text" placeholder="Student VISA">

                <label for="type">Type: </label>
                <input v-model="type" name="type" type="text" placeholder="Bachelor/Master">
            </div>

            <div v-if="discoverSelect == 'studyprogramme' || discoverSelect == 'exchange'"> <!-- displays if the user has selected studyprogram or exchange -->
                <label for="cost">Cost: </label>
                <input v-model="cost" name="cost" type="text" placeholder="150-200k">
            </div>

            <div v-if="discoverSelect == 'work'"> <!-- displays if the user has selected work -->
                <label for="company">Company: </label>
                <input v-model="company" type="text" name="company" placeholder="Company Inc.">

                <label for="duration">Duration: </label>
                <input v-model="studyDuration" type="text" name="duration" placeholder="2-4 Weeks etc..">

                <label for="salary">Salary: </label>
                <input v-model="salary" type="text" name="salary" placeholder="Not Paid"> 

                <label for="type">Type: </label>
                <input v-model="type" type="text" name="type" placeholder="Job, Internship..">

                <label for="deadline">Application Deadline: </label>
                <input v-model="deadline" type="date">
            </div>
            

            


        </div>

        <div>
            <label> City: </label>
            <input v-model="city" type="text" placeholder="Select City...">

            <label>Country: </label>
            <input v-model="country" type="text" placeholder="Select country...">
        </div>
        <ImgUpload v-on:imgUpload="imageUploaded" />


        <button type="submit" @click="submit()" class="w-32 h-8 rounded bg-blue-600 font-bold text-white ml-auto mr-2">Submit</button>
    </div>
    
</div>
</template>
<script>

import {filtersWithHeaders} from "../helpers/collections.js";
import {createGroup} from "../helpers/create.js";
import {db, auth} from "@/components/firebaseInit.js";
import ImgUpload from "@/components/ImgUpload.vue";

export default{
    name: "NewPost",
    props: ["user"],
    components:{
        ImgUpload
    },
    data(){
        return{
            //common data
            searchTerm: "",
            title: "",
            socialSelect: 'Choose Type',
            marketSelect: 'Choose Type',
            discoverSelect: 'exchange',
            description: "",
            country: '',
            city: '',
            date: new Date(),
            creator: this.user.name,
            creatorID: auth.currentUser.uid,
            imageURL: '',
            type: '',

            //social specific data
            members: [],
            matches: [],
            results: [],
            clickedItem: false,

            //marketplace specifi data
            price: 0,
            duration: 0,
            language: '',
            difficulty: 1,

            //discover specific Data
            cost: '',
            studyDuration: '',
            school: '',
            visa: '',
            studyField: '',
            company: '',
            salary: '',
            deadline: Date,
            
        }
    },
    
    methods: {
        imageUploaded(val){ //assigns the image url to this.imageURL
            let url = val[0];
            this.imageURL = url;
        },

        currentPage(){ //returns the current url path of the page
            return this.$route.path
        },

        populate: function(type){
            filtersWithHeaders(type).then(res => {
                this.results = res
            })
        },

        createEvent(){ //creates a event i event database
        console.log('in event');
            db.collection("Events").add({
                Country: this.country,
                City: this.city,
                Title: this.title,
                Description: this.description,
                Type: "Event",
                ImageURL: this.imageURL,
                Author: this.creator,
                CreatorID: this.creatorID,
                Created: this.date,
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id)
                alert("Event added");
                location.reload();
            })
            .catch(function(error) {
                console.log("Error adding document: ", error);
            });
        },

        createECourse(){ //creates ecourse in ecourse database
            var docRef = db.collection('E-course');
            docRef.add({
                Country: this.country,
                City: this.city,
                Created: this.date,
                Creator: this.creator,
                CreatorID: this.creatorID,
                Content: this.title,
                Description: this.description,
                Duration: this.duration,
                Price: this.price,
                Language: this.Language,
                Type: "e-course",
                ImageURL: this.imageURL,
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert("E-Course added");
                location.reload();
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        },

        createSecondHand(){ //creates a second hand item in the databse
            var docRef = db.collection('SecondHand');
            docRef.add({
                City: this.city,
                Country: this.country,
                Creator: this.creator,
                CreatorID: this.creatorID,
                Description: this.description,
                Price: this.price,
                TimePosted: this.date,
                Title: this.title,
                Type: this.type
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert("Item added for sale")
                location.reload();
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                alert(error);
            });
        },

        createStudyProgramme(){ //creates a study programme
            db.collection('StudyProgramme').add({
                Description: this.description,
                Duration: this.studyDuration,
                School: this.school,
                StudyField: this.StudyField,
                Cost: this.cost,
                Title: this.title,
                Type: this.type,
                Visa: this.visa,
            })
            .then(function(docRef) {
                console.log("Document written with id: ", docRef.id);
                alert("Study programme added");
                location.reload();
            })
            .catch(function(error){
                console.error("Error adding document: ", error);
            })
        },

        createExchange(){ //creates work
            db.collection('Exchange').add({
                City: this.city,
                Cost: this.cost,
                Country: this.country,
                Description: this.description,
                School: this.school,
                Title: this.title,
                Type: 'Exchange'
            })
            .then(function(docRef){
                console.log("Document written with ID: ", docRef.id);
                alert("Exchange programme added");
                location.reload();
            })
            .catch(function(error){
                console.error("Error adding document: ", error);
            })
        },

        createWork(){ // creates work
            db.collection('Work').add({
                City: this.city,
                company: this.company,
                Country: this.country,
                Deadline: this.deadline,
                Duration: this.studyDuration,
                Salary: this.salary,
                Title: this.title,
                Type: this.type,
            })
            .then(function(docRef){
                console.log("Document written with ID: ", docRef.id);
                alert("Work added");
                location.reload();
            })
            .catch(function(error){
                console.error("Error adding document: ", error)
            })
        },
        
        findMatches: function(val){
            //pass true to objfilter if uid is needed
            let matches = this.$objFilter(this.results, true).filter(x => x.name.toLowerCase().indexOf(val) >= 0)
            return matches
        },
        addItem:function(val){
            this.members.push(val)
            this.matches = []
            this.searchTerm = "";

        },

        submit(){
            if(this.currentPage().includes('Social')){
                if(this.socialSelect == 'Choose Type'){ //prevents user from submitting without choosing a type
                    alert('Please Choose a type')
                } else{
                    if(this.socialSelect == 'group'){
                        const data = {name: this.title, desc: this.description, members: this.members.map(x => x.uid)}
                    
                        let scope = this
                
                        createGroup(data, this.user).then(function(){
                            scope.$emit('closeModal')
                        })
                    }else if(this.socialSelect == 'event'){
                        this.createEvent();
                    }
                }
            } else if(this.currentPage().includes('Marketplace')){
                if(this.marketSelect == 'Choose Type'){ // prevents user from submitting without choosing a type
                    alert('Please Choose a Type')
                } else{
                    if(this.marketSelect == 'eCourse'){
                        this.createEcourse();
                    } else if(this.marketSelect == 'secondHand'){
                        this.createSecondHand();
                    }
                }
            } else if(this.currentPage().includes('Discover')){
                if(this.discoverSelect == 'Choose Type'){ //prevents user from submitting without choosing a type
                    alert("Please choose a type")
                } else{    
                    if(this.discoverSelect == 'studyProgramme'){
                        this.createStudyProgramme();
                    } else if(this.discoverSelect == 'exchange'){
                        this.createExchange();
                    } else if(this.discoverSelect == 'work'){
                        this.createWork();
                    }
                }
            }
            
            
        },
    },
    
    created(){
        this.populate("Users")
    },

    watch:{
    searchTerm: function(value){
      if(value == ""){
        this.matches = false;

      } else {
        this.matches = this.findMatches(value)
      }
    
    }
  },
}
</script>

<style scoped>
.memberarea{
    
    border-bottom: 2px solid black;
}

input, select, textarea{
    border: 1px solid black;
    margin: 3px;
    width: 100%;
    height: 20px;
    padding: 20px;
    border: none;
    background-color: rgb(240, 240, 240);
    color: black;
}

</style>