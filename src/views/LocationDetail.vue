<template>
  <div class="max-w-screen-xl px-4 m-auto pb-28">
    <h2 class="w-full m-0 text-white text-white font-extrabold text-4xl text-center underline pt-2 pb-8">{{location}}</h2>
    <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      <Card v-for="item in data" :id="item.id" :key="item.index" page="characters" :images="item.image" :title="item.name" :status="item.status" :species="item.species" :gender="item.gender" :location="item.location.name" />
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Card from "../components/Card";
  export default {
    name:"LocationDetail",
    data(){
      return {
        id:null,
        list: null,
        data: null,
        location: null,
      }
    },
    methods: {
      getData : function (event){
        axios.get('https://rickandmortyapi.com/api/location/'+event).then(
          response => this.list = response.data.residents,
        );
      }
    },
    watch: {
      id: function (){
        this.getData(this.id);
      },
      list : function (){
        this.data = [];
        this.list.forEach(element =>
          axios.get(element).then(
            response => this.data.push(response.data),
          )
        );
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.location = this.$route.params.name;
    },components: {
      Card
    }
  }
</script>