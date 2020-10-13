<template>
  <div>
      <p>ID: {{ id }}</p>
      <p>Title: {{ item.title }}</p>
      <p>Content: {{ item.content }}</p>
      <p>Creator: {{ item.creator }}</p>
      <p>Description: {{ item.description }}</p>
      <p>Difficulty: {{ item.difficulty }}</p>
      <p>Price: {{ item.price }}</p>
      <p>Rating: {{ item.rating}}</p>
      <button type="button" @click="$router.go(-1)">Go back</button>
  </div>
</template>

<script>
import {db} from '../components/firebaseInit.js'

export default {
    name: 'Ecourse',
    data() {
        return {
            item: {},
            id: this.$route.params.id
        }
    },

    created() {
            db.collection('E-course').doc(this.$route.params.id).get()
            .then(querySnapshot => {
                if(querySnapshot.exists) {
                    this.item = querySnapshot.data()
                    console.log(querySnapshot.data())
                } else {
                    console.log('Error msg')
                }
            })
            console.log(this.id)
        },

}
</script>

<style>

</style>