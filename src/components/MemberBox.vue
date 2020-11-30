<template>
    <div class="memberArea">
        <ul class="members">
            <li 
                v-for="(member, idx) in members" 
                :key="member + idx"
                :class="'member ' + mapColor(member.id)" >
                {{member.name}}
                <span @click="removeUser(member.id)" v-if="isCreator && member.id != user.id">
                x
                </span>
            </li>
        </ul>
        <div v-if="isCreator" class="settings">
            <img v-if="modalShowing === false" @click="modalShowing = true"  src="@/assets/add.png" alt="settings"/>
            <img v-else @click="modalShowing = false"  src="@/assets/minus.png" alt="settings"/>
            <button v-if="didUpdate != 0" @click="submit()" class="w-20 h-8 rounded bg-blue-600 font-bold text-white ml-3 mr-3">update</button>
        </div >
       
            <div v-if="modalShowing" class="w-full">
            <h2 class="subHead">Add members</h2>
            <div class="w-full flex-column justify-start relative direction-column">
                <span class="w-1 mr-4"> </span>
                <div class="bg-white rounded flex items-center w-full shadow-sm border border-gray-200 mr-6">
                    <button class="outline-none focus:outline-none m-5"><svg class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                    <input v-model="searchTerm" name="" id="" @keydown.enter="PLACEHOLDER" placeholder="Search for people.." class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
                </div>
                <ul v-if="matches.length > 0 && !clickedItem" class=" mx-auto text-gray-600 px-8 py-4 pb-6 bg-opacity-75   w-full ">
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
    </div>
</template>
<script>

import {getPostByTerm} from "@/helpers/collections.js"
import {attatchToMembers, attatchToGroup} from "@/helpers/create.js"
export default {
    name:"memberArea",
    props:["members", "user", "creator", "groupId", "memberIds"],
    components:{
   
       
       
    },
    data() {
        return{
            modalShowing: false,
            searchTerm: "",
            removedIds: [],
            matches: [],
            results: [],
            clickedItem: false,
            
            didUpdate: 0

        }
    },
    
    computed:{
       userIsPartOfGroup(){
            return this.members.filter(x => x.id == this.user.id)[0].id == this.user.id ? this.user.id : false
        },
        isCreator(){
            return this.creator == this.user.id ? true : false
        }
        
    },
    methods: {
        mapColor(userId){

            // color for creator
            if(this.creator == userId){
                return "creatorColor"
               
                //if current user is part of the group
            } else if (userId == this.userIsPartOfGroup){
                return "isUser"
                //all the other members
            } else {
                return "regMember"
            }
        },
         populate: function(){
             
             getPostByTerm("Users", "false").then(data => {
                this.results = data
            })
            
        },
        findMatches: function(val){
            
            //pass true to objfilter if id is needed
            let matches = this.results.filter(x => x.name.toLowerCase().indexOf(val) >= 0)
            let filtered = matches.filter(m =>  !this.members.filter(x => x.id == m.id).map(x => x.id).includes(m.id))
            return filtered
        },
        addItem:function(val){
            
            // in case user is added back again after having been removed
            let addedBack = this.removedIds.filter(x => x == val.id)[0]
            
            if (addedBack){
                let abidx = this.removedIds.findIndex(x => x == addedBack)
                this.removedIds.splice(abidx, 1)
            }
                
            this.members.push(val)
            this.matches = []
            this.searchTerm = "";
            this.didUpdate += 1
        },
        removeUser(userId){
            let targetId = this.members.filter(x => x.id == userId)[0].id
            let targetIdx = this.members.findIndex(x => x.id == targetId)
            this.removedIds.push(targetId)
            this.members = this.members.splice(targetIdx, 1)
            this.populate()
            this.matches =[]
            this.didUpdate -= 1
        },

        addToGroup(groupId, membId){
            // guaranteed to only be one
            let member = this.members.filter(x => x.id == membId)[0]
            
            attatchToMembers(groupId, member).then(userId => {
               if(userId){
                   console.log(userId)
                   attatchToGroup(this.groupId,this.memberIds, userId).then(res => {
                       console.log(res)
                   })
               }
               
            })
        },
        // removeFromGroup(groupId, membId){
        //     // guaranteed to only be one
        //     let member = this.members.filter(x => x.id == membId)[0]
            
        //     attatchToMembers(groupId, member).then(userId => {
        //        if(userId){
        //            console.log(userId)
        //            attatchToGroup(this.groupId,this.memberIds, userId).then(res => {
        //                console.log(res)
        //            })
        //        }
               
        //     })
        // },

        submit(){
           
            // need to keep list of:
            //who originally was part of group on page load
           let orgMembs = this.memberIds
           // list of members after alteration has been made
           let currMembs = this.members.map(x => x.id)
           // list of removed members
           let removedMembs = this.removedIds
           
          //iterate over all the org members. They're either:
          orgMembs.forEach(memb => {
              //1: still part of the group
              if(currMembs.includes(memb)){
                  console.log("already member:",memb)
              //2: they were removed
              } else if (!currMembs.includes(memb) && removedMembs.includes(memb)){
                  console.log("removed member;", memb)
                  this.removeFromGroup(this.groupId, memb)
              }
          })
          // get all current members who are not part of the original crew but are not in removed list either
          currMembs.forEach(memb => {
              if(!orgMembs.includes(memb) && !removedMembs.includes(memb)){
                  console.log("added as memb:", memb)
                  this.addToGroup(this.groupId, memb)
              }
          })
        },
        

            
    },
    created(){
     
            this.populate()
        
        
       
    },

    watch:{
    searchTerm: function(value){
      
        this.matches = this.findMatches(value)
 
    
    },
    
  },
}

</script>

<style scoped>
.subHead{
font-size: 1.2em;
font-weight:600;
text-align: left;
margin-left:1.2em;
font-family: 'Avenir';

}
.memberArea {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-bottom: 1px solid #e2e2e2;
}

.members{
    display: flex;
    padding: 1em;
    flex-basis: 80%;
}
.settings{
    flex-basis:20%;
    display: flex;
    align-items: center;
    justify-content: center;

}
.settings > img{
    max-height: 40px;
    max-width:40px;
    opacity: 0.7;
    transition: all 0.5s ease-out;
    cursor: pointer;
}

.settings > img:hover{
    opacity: 1;
    transform: scale(1.1);
}

.member{
    padding: 3px 18px;
    margin: 10px 8px 0px 0px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    position: relative;
}

.member > span{

}
.creatorColor{
    background-color: yellow;
    
    
}
.isUser{
    background-color: #242461;
    color: white
}
.regMember{
    background-color: gray;
    color: white;
}
ddColor{
    background-color: #64a2ff
}
</style>