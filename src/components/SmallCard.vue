<template>
  <div class="smallCard">

    <router-link :to="{ name: routePath, params: { id: item.id } }">
      <img class="img" :src="image" />
      <div class="price">{{ item.price }}$</div>
      <div class="desc">
        <p>{{ item.title }}</p>
      </div>
    </router-link>

  </div>
</template>

<script>

export default {

  props: {
    item: Object,
    routePath: String,
  },
  data() {
    return {
      // Midlertidig statisk bilde i e-course card
      image: require("@/assets/smallCardImg.jpg"),
    };
  },
};
</script>

<style scoped>
.smallCard {
  position: relative;
  height: 400px;
  width: 300px;
  margin: 0 auto;
  margin-bottom: 24px;
  cursor: pointer;
  border-radius: 10px;
}

.smallCard > div {
  overflow: hidden;
}

.img {
  height: 250px;
  object-fit: cover;
}

.price {
  position: absolute;
  left: 0;
  bottom: 40%;
  height: 30px;
  width: 75px;
  background-color: #36a90f;
  color: white;
  padding: 5px;
  text-align: center;
}

.desc {
  position: absolute;
  bottom: 0;
  text-align: left;
  background-color: #c4c4c4;
  height: 40%;
  font-size: 22px;
  padding: 10px;
}

</style>>
