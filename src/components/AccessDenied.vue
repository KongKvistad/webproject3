<template>
    <div>
        <h3 class="warning">Please <a  @click="$router.replace({ path: '/login'})">log in</a> to continiue </h3>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.warning{
    text-align: center;
    font-size: 1.2em;
    margin-top: 1em;
    
}

a{
    color:blue;
    text-decoration: underline;
    cursor: pointer;
}

</style>