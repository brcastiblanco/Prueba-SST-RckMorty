<template>
  <div class="max-w-screen-2xl mx-auto p-4 pb-28 rounded-lg">
    <div class="flex flex-col">
      <div class="w-full flex justify-center">
        <img class="rounded-full border-8 max-h-60 mb-5 border-white" :src="list == null ? '' : list.image" alt="" style="box-shadow: 0px 0px 38px 5px rgb(255 255 255);">
      </div>
      <div>
        <div class="flex w-full mb-4 text-4xl text-center text-white justify-center font-bold">
          <h2>{{list == null ? '' : list.name}}</h2>
        </div>
        <div class="card-info">
          <p class="text-white"><span class="font-bold">Estado:</span> {{list.status}}</p>
          <p class="text-white"><span class="font-bold">Genero:</span> {{list.gender}}</p>
          <p class="text-white"><span class="font-bold">Especie:</span> {{list.species}}</p>
          <p class="text-white"><span class="font-bold">Ubicación:</span> {{list.location.name}}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-center rounded-lg">
      <div class="w-full">
        <h4 class="text-white text-3xl py-2 mb-3 font-extrabold">Episodios</h4>
      </div>
     <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        <Card v-for="item in episode" page="episodes" :status="list == null ? '' : list.status" :title="item.name" :species="item.air_date"  :key="item.index" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "../components/Card";

export  default {
  name : 'CharacterDetailVue',
  components: {Card},
  data(){
    return {
      id : null,
      list : null,
      episode: null,
    }
  },
  methods: {
    getData : function (event){
      axios.get('https://rickandmortyapi.com/api/character/'+event).then(
          response => this.list = response.data,
      );
    }
  },
  watch : {
    id: function (){
      this.getData(this.id);
    },
    list : function (){
      this.episode = [];
      this.list.episode.forEach(element =>
          axios.get(element).then(
              response => this.episode.push(response.data),
          )
      );
    }
  },
  created() {
    this.id = this.$route.params.id;
  }
}
</script>

<style>
  .card-info {
    justify-content: center;
    align-items: center;
    display: grid;
    background-color: #a78bfa63;
    padding: 16px 0;
    width: 530px;
    margin: auto;
  }
  @media screen and (max-width: 639px) {
    .card-info {
      width: 100%;
    }
  }
</style>