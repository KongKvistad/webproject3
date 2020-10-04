<template>

  <div id="card">
      <div id="left-column">
       <img :src=imageLink :alt=altText>
      </div>

      <div id="right-column">
          <h1>{{ title }}</h1>
          <h2>{{ owner }}</h2>
          <p id = "deadline">Deadline: {{ deadline }}</p>
          <p>{{ description }}</p>
          <div id="liste">
                <p>{{ price }}k</p>
                <p>{{ reviews }} testemonies</p>
                <p>{{ duration }} weeks</p>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    title: String,
    owner: String,
    deadline: Date,
    description: String,
    price: Number,
    reviews: Number,
    duration: Number,
    imageLink: String,
    altText: String
  }
}
</script>

<style>
#card {
    display: flex;
    flex-direction: column;
    flex-flow: row;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  /*border: 1px solid rgb(162, 162, 162);*/
}
#left-column {
    max-width: 30%;
}
#right-column {
  padding: 0 2%;
    width: 70%;
}
#left-column img {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
}
#deadline, #liste {
  font-weight: bold;
}
#liste {
  
    display: flex;
    justify-content: space-between;
}

h1 {
  font-size: 1.7em;
}
h2 {
  font-size: 1.5em;
}

p {
  font-size: 1em;
}


</style>