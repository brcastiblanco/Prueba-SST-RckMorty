<template>
  <div class="max-w-screen-2xl m-auto px-8 pb-28">
    <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      <Card v-for="item in list" page="episodes" :status="item.episode" :title="item.name" :species="item.air_date"  :key="item.index" />
    </div>
    <Pagination @item="item=$event" :item="item" :pages="pagination" :firstpage="[1,2,3]"/>
  </div>
</template>

<script>
import axios from "axios";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
export default {
  name:"Episode",
  data(){
    return {
      item : 1,
      list:null,
      pagination : null
    }
  },
  methods : {
    getData : function (event){
      axios.get('https://rickandmortyapi.com/api/episode?page='+event).then(response => this.list = response.data.results);
    },
    listPage : function () {
      axios.get('https://rickandmortyapi.com/api/episode').then(response => this.pagination = response.data.info.pages);
    },
  },watch: {
    item : function () {
      this.getData(this.item);
    }
  },
  components : {
    Pagination,
    Card
  },
  mounted() {
    this.getData(this.item);
    this.listPage();
  }
}
</script>