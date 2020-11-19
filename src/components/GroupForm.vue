<template>
<div class="box w-full flex flex-col items-between" >
    <div class="box-wrapper grid grid-cols-2 grid-rows-1">
        <div class="w-full flex justify-start">
        <span class="w-1 bg-blue-500 mr-4"> </span>
        <div class="bg-white rounded flex items-center w-11/12 shadow-sm border border-gray-200">
            <input v-model="groupName" name="" id="" @keydown.enter="PLACEHOLDER" placeholder="group name.." class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
        </div>
        </div>
        <div class="w-full flex justify-start relative">
            <span class="w-1 bg-blue-500 mr-4"> </span>
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
        
        
        </div>
    <div class="box-wrapper grid grid-cols-2 grid-rows-1 mb-12">
        <div class="w-full flex justify-start mt-4">
            <span class="w-1 bg-blue-500 mr-4"> </span>
            <div class="bg-white rounded flex items-center h-32 w-11/12 shadow-sm border border-gray-200">
                <textarea v-model="groupDesc" name="" id="" @keydown.enter="PLACEHOLDER" placeholder="description.." class="w-full h-full p-2 pl-4 text-sm outline-none focus:outline-none bg-transparent"></textarea>
            </div>
        </div>
        <div class="w-full flex justify-start">
         <span class="w-1 bg-blue-500 mr-4"> </span>
        <ul class="memberarea px-4 pt-2 flex items-center w-11/12 mt-4  ">
            
            
            <ul class="box flex flex-wrap">
               <li class="rounded bg-blue-200 px-4 py-1 mr-2 mb-2" v-for="(item, idx) in members" :key="item+idx">{{item.name}}</li>
            </ul>
            

        </ul>
        
        </div>
    </div>
    <button @click="submit()" class="w-32 h-8 rounded bg-blue-600 font-bold text-white ml-auto mr-2">Make Group</button>
    
  </div>
</template>
<script>

import {filtersWithHeaders} from "../helpers/collections.js"
import {createGroup} from "../helpers/create.js"

export default{
    name: "GroupForm",
    props: ["user"],
    data(){
        return{
            searchTerm: "",
            groupName: "",
            groupDesc: "",
            members: [],
            matches: [],
            results: [],
            clickedItem: false
        }
    },
    methods: {
        
        populate: function(type){
            filtersWithHeaders(type).then(res => {
                this.results = res
            })
        },
        submit(){
            
            const data = {name: this.groupName, desc: this.groupDesc, members: this.members.map(x => x.uid)}
            
            //need to bind scope in order to access it inside async function call
            let scope = this
            
            createGroup(data, this.user).then(groupId => {
                scope.$emit('closeModal', groupId)
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

        }
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

<style>
.memberarea{
    
    border-bottom: 2px solid black;
}

</style>