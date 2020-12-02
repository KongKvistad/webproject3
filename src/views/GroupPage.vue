<template>
    <MainLayout :padding="false">
        <template 
        v-slot:leftBar>
       

        </template>
        <template v-slot:discoverheading>
            <div class="bgCanvas">
                <img class="backGround" :src="groupData.imgUrl"/>
                <h1>{{groupData.Title}}</h1>
                <div class="desc">
                    <em>Description:</em>
                    <p>{{groupData.Description}}</p>
                </div>
            </div>
        </template>
        <template v-slot:cards >
                
            <h2
            v-if="userProfile.id"
            class="subHead">Members
            </h2>
               
            <MemberBox
            v-if="members && userProfile.id"
            :user="userProfile"
            :members="members"
            :creator="groupData.Creator"
            :groupId="groupData.id"
            :memberIds="groupData.Members"
            />
            
            <NewGroupPost
            v-if="userProfile.id"
            :userId="userProfile.id"
            :groupId="groupData.id"
            />
            
            <h2 class="posts">Posts</h2>
                
            <GroupPost 
            v-for="post in posts"
            :key="post.Title"
            :data ="post"
            :creator="getCreator(post.Creator)"
            />
                
               
        </template>
       
        <template v-slot:rightBar>
         
        </template>
        
    </MainLayout>
</template>
<script>
import MainLayout from "./MainLayout.vue"
import MemberBox from "@/components/MemberBox.vue"
import GroupPost from "@/components/GroupPost.vue"
import NewGroupPost from "@/components/NewGroupPost.vue"
import {getDocByReference, multipleDocs, getPostByTerm} from "@/helpers/collections.js"
import {mapState} from "vuex"

export default {
    name:"group",
    components:{
       MainLayout,
       MemberBox,
       GroupPost,
       NewGroupPost
       
       
    },
    data(){
        return {
            groupData: false,
            members: false,
            posts: false
        }
    },
    computed:{
        ...mapState(['userProfile']),

        
    },
    methods: {
        getCreator(id){
            if(this.members){
            return this.members.filter(x => x.id == id)[0].name
            }
        }
            
    },
    created(){
        let id = this.$route.params.id
        getDocByReference("Groups", id).then(res => {
            console.log(res)
            this.groupData = res
            
            // get data on members
            multipleDocs(res.Members, "Users").then(data => {
                this.members = data
            })
        })
        //get postdata
         getPostByTerm("GroupPosts", id, "Group").then(posts=>
            this.posts = posts
         )

       
        
    }
}

</script>

<style scoped>
.bgCanvas{
    position: relative;
    display: flex;
    height: 24em;
    width:100%;
    margin-bottom:5em;
    
}

.bgCanvas > h1{
    position: absolute;
    background-color: #f4e58c;
   
    top: 65%;
    left: 2%;
    padding: 7px 2em 0px 20px;
    font-family: 'Avenir';
    font-size: 2em;
    font-weight: 800;
    text-transform: uppercase;
    color: black;
}

.backGround{
    object-fit: cover;
    width:inherit;
}
.desc{
    padding: 1em 0px 1em 20px;
    background-color: #f4e58c;
    position: absolute;
    top:84%;
    left: 2%;
    color: black;
    font-family: 'Avenir';
    max-width: 30em;
}
.desc > p{
    font-size: 1em;
    max-width: 90%;
    
    
    

}
.desc >em{
    font-size: 1.2em;   
    font-weight: bold;
    font-style: normal;
    
    
}
.subHead{
font-size: 1.2em;
font-weight:600;
text-align: left;
margin-left:1.2em;
margin-top: 10px;
font-family: 'Avenir';

}
.posts{
    font-size: 1.6em;
font-weight:600;
text-align: center;

margin-top: 1em;
font-family: 'Avenir';
}

</style>