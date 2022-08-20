<template>
   <div class="max-w-screen-2xl m-auto px-8 pb-28">
      <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        <Card page="locations" v-for="item in list" :title="item.name" :key="item.id" :id="item.id" :species="item.dimension" :status="item.type"/>
      </div>
      <Pagination @item="item=$event" :item="item" :pages="pagination" :firstpage="[1,2,3,4,5]"/>
   </div>
</template>

<script>
import axios from "axios";
import Pagination from "../components/Pagination";
import Card from "../components/Card";
export default {
  name:"Location",
  data(){
    return {
      item : 1,
      list:null,
      pagination:null
    }
  },
  methods: {
    getData: function (event){
      axios.get('https://rickandmortyapi.com/api/location?page='+event).then(
          response => this.list = response.data.results
      );
    },
    pageData: function () {
      axios.get('https://rickandmortyapi.com/api/location?page='+event).then(
          response => this.pagination = response.data.info.pages
      );
    }
  },
  watch: {
    item: function (){
      this.getData(this.item)
    }
  },
  components: {
    Pagination,
    Card
  },
  mounted() {
    this.getData(this.item);
    this.pageData();
  }
}
</script>