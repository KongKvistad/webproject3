<template>
  <div class="smallCard">
    <img class="img" :src="image"/>
      <div class="price">
         {{ item.price }}$
      </div>
      <div class="desc">
          <p> {{ item.content }}</p>
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
            image: require("@/assets/smallCardImg.jpg")
    }
}
}
</script>

<style scoped>

.smallCard {
    position: relative;
    height: 400px;
    width: 300px;
    margin: 0 auto;
    margin-bottom: 24px;
    cursor: pointer;
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
    background-color: #36A90F;
    color: white;
    padding: 5px;
    text-align: center;
}

.desc {
   position: absolute;
   bottom: 0;
    text-align: left;
    background-color: #C4C4C4;
    height: 40%;
    font-size: 22px;
    padding: 10px;;
}

</style>>
