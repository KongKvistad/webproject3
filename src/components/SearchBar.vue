<template>
    <fieldset id="searchComp">
    <div v-if="clickedItem" class="searchField">
          <div>{{clickedItem}}</div>
          <div v-on:click="removeItem()" class="cross"></div>
          <button type="submit" class="goBtn" v-on:click="search()">
          <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
          
    </div>
    <div v-else class="pt-2 relative mx-auto text-gray-600">
        <input v-model="searchTerm" v-on:keyup="emitToParent(searchTerm)" class=" searchField border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search" autocomplete="off">
        <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
          <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
        <ul v-if="matches.length > 0" class="pt-2 relative mx-auto text-gray-600 dropdown">
          <li v-on:click="setItem(item.name)"
            v-for="(item, idx) in matches"
            :key="item.name+idx">
            {{item.name}} {{item.num ? "(" + item.num + ")" : ""}}
          </li>
        </ul>
    </div>
    </fieldset>
  
</template>


<script>

export default {
  name:"SearchBar",
  props: ["matches"],
  data(){
    return {
      searchTerm:'',
      clickedItem: false,
    }
  },
  methods: {
     emitToParent (term) {
      this.$emit('childToParent', term)
    },
    setItem(entity){
      this.clickedItem = entity
      this.searchTerm = entity
      this.emitToParent(entity)
    },

    removeItem(){
      this.clickedItem = false
      this.searchTerm = ''
      this.emitToParent(false)

    },
    search(){
      this.$emit('searchClicked');
    }
  }
}
</script>

<style>

#searchComp{
  width: 50%;
}

.searchField{
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
  justify-content: space-between;
}

.searchField>div:first-of-type{
  width:80%;
}
.pr-16{
  height:3em;
}
.cross{
  width: 10%;
  height: 100%;
  background-color: red;
}

.dropdown{
  background-color:white;
}
.dropdown > li{
  background-color: white;
  border-bottom: 1px solid black;
  color: black;
}

.goBtn{

}

</style>