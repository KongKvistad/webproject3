<template>

  <div id="card">
      <div id="left-column">
        <img src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg?resize=750px:*" alt="">
      </div>

      <div id="right-column">
          <h1>{{ title }}</h1>
          <h2>{{ company}}</h2>
          <h3>Deadline: 24.09.2020</h3>
          <p>Lorem impsum lalalalalalalalaala
              fgdfgdfgdgdfg
              dgfd
              gridgdf
              gffgd
              f
              ffffffff
          </p>
          <ul>
              <li>30-50k</li>
              <li>2 testimonies</li>
              <li>2-4weeks</li>
          </ul>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    title: String,
    company: String
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
ul {
    display: inline-block;
}
ul li {
    display: inline;
    padding: 20px;
}


</style>