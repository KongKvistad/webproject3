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
            v-if="memberStatus == 'isMember'"
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
            v-if="memberStatus == 'isMember'"
            :userId="userProfile.id"
            :groupId="groupData.id"
            />
            <JoinGroup
            v-else-if="memberStatus == 'notMember'"
            :userId="userProfile.id"
            :groupId="groupData.id"
            />
            <p v-else @click="modalShowing = true" class="w-24 h-8 rounded flex justify-center items-center bg-blue-600 font-bold text-white ml-auto mr-16 mt-12 ">Join</p>
            <Modal v-if="modalShowing" @close="modalShowing = false">
                <h2 slot="header">Access Denied</h2>
                <div slot="modal-body" class="box w-full flex flex-col items-between" >
                    <h3 class="warning">You have to <em @click="$router.replace({ path: '/login'})">sign in</em> to join!</h3>
                </div>
            </Modal>
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
import Modal from "@/components/Modal.vue"
import JoinGroup from "@/components/JoinGroup.vue"
import {getDocByReference, multipleDocs, getPostByTerm} from "@/helpers/collections.js"
import {mapState} from "vuex"

export default {
    name:"group",
    components:{
       MainLayout,
       MemberBox,
       GroupPost,
       NewGroupPost,
       JoinGroup,
       Modal
       
       
    },
    data(){
        return {
            groupData: false,
            members: false,
            posts: false,
            modalShowing: false
        }
    },
    computed:{
        ...mapState(['userProfile']),

        memberStatus(){
            let id = this.userProfile.id
            if(id && this.members){
                let chk = this.members.filter(x => x.id == id)
                return chk.length > 0 ? "isMember" : "notMember"
            }else {
                return false
            }

            
        }
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
.warning{
    text-align: center;
    font-size: 1.2em;
    margin-top: 1em;
    
}

.warning > em{
    text-decoration: underline;
    color: blue;
}
</style>