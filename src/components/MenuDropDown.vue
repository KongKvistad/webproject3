<template>
 <nav id="catDrop" @mouseover="isExploring = true" @mouseleave="isExploring = false">
    <a>asd</a>
 </nav>
</template>

<script>
export default{
    name: 'MenuDropDown',
    data(){
        return{
            //isExploring: false
        }
    },
    // watch:{
    //     isExploring(oldVal, newVal){
    //         if(oldVal !== newVal){
    //             this.$emit('cursorChanged', oldVal)
    //         }
    //     }
    // }
}

</script>

<style scoped>
#catDrop{
    position: absolute;
    background-color: yellow;
    height: 30%;
    display: flex;
    top: 5.2vw;
    left: 0px;
    width:100vw;
}
</style>