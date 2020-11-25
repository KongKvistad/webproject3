<template>
    <MainLayout :padding="false">
        <template 
        v-slot:leftBar>
       

        </template>
        <template v-slot:discoverheading>
            <div class="bgCanvas">
                <img class="backGround" :src="groupData.imgUrl"/>
                <h1>{{groupData.Title}}</h1>
            </div>
        </template>
        <template v-slot:cards >
               <h2 class="subHead">Members</h2>
               <MemberBox
               v-if="members"
               :user="userProfile"
               :members="members"
               :creator="groupData.Creator"
               :groupId="groupData.id"
               />
                <h2 class="posts">Posts</h2>
                
                <GroupPost 
                v-for="post in posts"
                :key="post.Title"
                :data ="post"
                :creator="getCreator(post.Creator)"/>
                
               
        </template>
       
        <template v-slot:rightBar>
         
        </template>
        
    </MainLayout>
</template>
<script>
import MainLayout from "./MainLayout.vue"
import MemberBox from "@/components/MemberBox.vue"
import GroupPost from "@/components/GroupPost.vue"
import {getDocByReference, multipleDocs, getPostByTerm} from "@/helpers/collections.js"
import {mapState} from "vuex"

export default {
    name:"group",
    components:{
       MainLayout,
       MemberBox,
       GroupPost
       
       
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
    
}

.bgCanvas > h1{
    position: absolute;
    background-color: #575cef;
   
    top: 62%;
    left: 4%;
    padding: 7px 1em;
    font-family: 'Avenir';
    font-size: 2em;
    font-weight: 800;
    text-transform: uppercase;
    color: white;
}

.backGround{
    object-fit: cover;
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

margin-top: 2em;
font-family: 'Avenir';
}

</style>