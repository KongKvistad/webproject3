<template>

  <div id="card">
      <div id="left-column">
       <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*" alt="">
      </div>

      <div id="right-column">
          <h1>{{ title }}</h1>
          <h2>{{ owner }}</h2>
          <h3>{{ deadline }}</h3>
          <p>{{ description }}</p>
          <div id="liste">
                <p>{{ price }}</p>
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
    duration: Number
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
  border: 1px solid black;
}
#left-column {
    max-width: 30%;
}
#right-column {
    width: 70%;
    border: 5px solid black;
}
#left-column img {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
}
#liste {
    display: flex;
    justify-content: space-between;
}


</style>