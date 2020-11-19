<template>
    <div class="memberArea">
        <ul class="members">
            <li 
                v-for="(member, idx) in members" 
                :key="member + idx"
                :class="'member ' + mapColor(member.uid)" >
                {{member.name}}
            </li>
        </ul>
    </div>
</template>
<script>



export default {
    name:"memberArea",
    props:["members", "user", "creator"],
    components:{
       
       
       
    },
    
    computed:{
       userIsPartOfGroup(){
            return this.members.filter(x => x.uid == this.user.uid)[0].uid == this.user.uid ? this.user.uid : false
        },

        
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
        }
            
    },
    created(){
       

       
        
    }
}

</script>

<style scoped>

.memberArea {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e2e2e2;
}

.members{
    display: flex;
    padding: 1em;
}

.member{
    padding: 3px 18px;
    margin: 10px 8px 0px 0px;
    border-radius: 25px;
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
</style>