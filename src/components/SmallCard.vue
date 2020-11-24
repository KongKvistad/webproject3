<template>
  <div class="smallCard">
      <!-- Display image if there is one uploaded in DB, else display default image -->
      <div v-if="!item.imgUrl">
      <img class="img" :src="image" />
      </div>
      <div v-else>
        <img class="img" :src="item.imgUrl" />
      </div>
      <div class="price">{{ item.price }}$</div>
      <div class="desc">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
  </div>
</template>

<script>

export default {

  props: {
    item: Object,
  },
  data() {
    return {
      // Default img used in smallcard component if nothing in db
      image: require("@/assets/smallCardImg.jpg"),
    };
  },
};
</script>

<style scoped>
.smallCard {
  position: relative;
  height: 400px;
  max-width: 390px;
  margin-bottom: 24px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 2px 3px 10px #00000073;
}

.smallCard > div {
  overflow: hidden;
}

.img {
  object-fit: cover;
}

.price {
  position: absolute;
  left: 0;
  bottom: 40%;
  height: 30px;
  width: 75px;
  background-color:  #78d3a6;
  color: black;
  padding: 5px;
  text-align: center;
}

.desc {
  position: absolute;
  bottom: 0;
  text-align: left;
  background-color: #FFFFFF;
  height: 40%;
  padding: 10px;
}
.desc > h2 {
  font-size: 20px;
}
.desc > p {
  font-size: 14px;
  color: #717171;
}

</style>>
