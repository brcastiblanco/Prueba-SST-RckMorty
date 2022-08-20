<template>
  <div class="max-w-screen-2xl grid grid-cols-4 px-2 m-auto pb-28">
    <div class="col-span-4 sm:col-span-2 md:col-span-1 lg:col-span-1">
      <div class="menu-filter">
        <div class="mb-3">
          <span class="title-filter text-xl font-bold text-white">Filtros</span>
        </div>
        <input class="search-color rounded-lg px-3 py-2.5 w-4/5 m-2" placeholder="Buscar por nombre..." type="text" v-model="searchName" v-on:keyup="paginationReset()">
        <div>
          <div class="text-center sm:text-left px-9">
            <span class="text-lg font-bold text-white">Especie</span>
          </div>
          <select v-model="searchSpecie" @change="paginationReset()" class="search-color rounded-lg p-3 w-4/5 m-2">
            <option v-for="option in optionsSpecies" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div>
           <div class="text-center sm:text-left px-9">
            <span class="text-lg font-bold text-white">Estado</span>
          </div>
          <select v-model="searchStatu" @change="paginationReset()" class="search-color rounded-lg p-3 w-4/5 m-2">
            <option v-for="option in optionsStatus" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div>
           <div class="text-center sm:text-left px-9">
            <span class="text-lg font-bold text-white">Genero</span>
          </div>
          <select v-model="searchGender" @change="paginationReset()" class="search-color rounded-lg p-3 w-4/5 m-2">
            <option v-for="option in optionsGenders" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div>
          <div class="mt-6 mb-3">
            <span class="title-filter text-xl font-bold text-white">Ordenar por..</span>
          </div>
          <select v-model="orderOptions" class="search-color rounded-lg p-3 w-4/5 m-2">
            <option v-for="option in optionsOrder" :value="option.id" :key="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div :class="error == 404 ? 'block' : 'hidden'" class="w-7/12 rounded m-auto text-center mt-6 col-span-4 sm:col-span-2" style="background-color: #cbcbdbf2">
      <p class="text-2xl font-bold text-white py-4">
        No se encontraron resultados para la busqueda
      </p>
    </div>
    <div :class="error == 1 ? 'block' : 'hidden'" class="col-span-4 justify-center sm:col-span-2 md:col-span-3 mx-auto flex flex-wrap">
      <div class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        <Card page="characters" v-for="item in filterSearch" :key="item.id" :id="item.id" :images="item.image" :title="item.name" :status="item.status" :species="item.species" :gender="item.gender" :location="item.location.name" />
      </div>
      <Pagination @item="item=$event" :key="pagination" :pages="pagination" :item="item" :firstpage="pagination < 5 ? pagination : [1,2,3,4,5]"></Pagination>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Card from "../components/Card";
  import Pagination from  "../components/Pagination";

  export default {
    name: 'Characters',
    data(){
      return {
        item: 1,
        list : null,
        pagination : null,
        searchName: "",
        searchSpecie: "",
        searchStatu: "",
        searchGender: "",
        orderOptions: "",
        error: 1,
        optionsSpecies: [
          { name: 'Todos', id: '' },
          { name: 'Animal', id: 'Animal' },
          { name: 'Alien', id: 'Alien' },
          { name: 'Cronenberg', id: 'Cronenberg' },
          { name: 'Disease', id: 'Disease' },
          { name: 'Humano', id: 'Human' },
          { name: 'Humanoide', id: 'Humanoid' },
          { name: 'Criatura mitológica', id: 'Mythological Creature' },
          { name: 'Poopybutthole', id: 'Poopybutthole' },
          { name: 'Robot', id: 'Robot' },
          { name: 'Desconocido', id: 'unknown' }
        ],
        optionsStatus: [
          { name: 'Todos', id: '' },
          { name: 'Vivo', id: 'alive' },
          { name: 'Muerto', id: 'dead' },
          { name: 'Desconocido', id: 'unknown' }
        ],
        optionsGenders: [
          { name: 'Todos', id: '' },
          { name: 'Mujer', id: 'female' },
          { name: 'Hombre', id: 'male' },
          { name: 'Sin género', id: 'genderless' },
          { name: 'Desconocido', id: 'unknown' }
        ],
        optionsOrder: [
          { name: 'Determinado', id: '' },
          { name: 'Nombre (A - Z)', id: 'nameAZ' },
          { name: 'Nombre (Z - A)', id: 'nameZA' },
          { name: 'Especie', id: 'species' },
          { name: 'Estado', id: 'status' },
          { name: 'Genero', id: 'gender' }
        ]
      }
    },
    methods: {
      getData : function (event){
        axios.get('https://rickandmortyapi.com/api/character?page='+event).then(response => { 
          this.list = response.data.results;
          this.error = 1
        })
        .catch(error => {
            this.error = error.response.status
        });
      },
      listPage : function () {
        axios.get('https://rickandmortyapi.com/api/character').then(response => { 
          this.pagination = response.data.info.pages
          this.error = 1
        })
        .catch(error => {
            this.error = error.response.status
        });
      },
      listFilterPage : function (event) {
        axios.get('https://rickandmortyapi.com/api/character?'+event).then(response => { 
          this.pagination = response.data.info.pages
          this.error = 1
        })
        .catch(error => {
            this.error = error.response.status
        });
      },
      paginationReset() {
        this.item = 1
      },
      orderNameAZ() {
        return this.list.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
      },
      orderNameZA() {
        return this.list.sort((a, b) => {
            return b.name.localeCompare(a.name);
        });
      },
      orderSpecies() {
        return this.list.sort((a, b) => {
            return a.species.localeCompare(b.species);
        });
      },
      orderStatus() {
        return this.list.sort((a, b) => {
            return a.status.localeCompare(b.status);
        });
      },
      orderGender() {
        return this.list.sort((a, b) => {
            return a.gender.localeCompare(b.gender);
        });
      }
    },
    computed : {
      filterSearch : function (){
        if (this.searchName || this.searchSpecie || this.searchStatu || this.searchGender){
          this.getData(this.item + '&name=' + this.searchName + '&species=' + this.searchSpecie + '&status=' + this.searchStatu + '&gender=' + this.searchGender)
          this.listFilterPage('name=' + this.searchName + '&species=' + this.searchSpecie + '&status=' + this.searchStatu + '&gender=' + this.searchGender);
        } else {
          this.getData(this.item);
          this.listPage();
        }
        if (this.orderOptions){
          switch (this.orderOptions) {
            case 'nameAZ':
              this.orderNameAZ()
              break;
            case 'nameZA':
              this.orderNameZA()
              break;
            case 'species':
              this.orderSpecies()
              break;
            case 'status':
              this.orderStatus()
              break;
            case 'gender':
              this.orderGender()
              break;
            default:
              break;
          }
        } 
        return this.list;
      }
    },
    watch : {
      item : function (){
        this.getData(this.item);
      }
    },
    components : {
      Pagination,
      Card
    },created() {
      this.getData(this.item);
      this.listPage();
    }
  }
</script>

<style>
  .search-color {
    outline-color: rgb(142 250 107);
  }

  .menu-filter {
    position: fixed;
    top: 214px;
    z-index: 1;
    width: 100%;
    max-width: 380px;
  }

  .title-filter {
    box-shadow: 0px 0px 20px 5px rgb(166 192 68 / 69%);
    background-color: rgb(166 192 68 / 43%);
  }

  @media screen and (max-width: 1540px) {
     .menu-filter {
      width: 24.5%;
    }
  }
  @media screen and (max-width: 767px) {
     .menu-filter {
      width: 48vw;
    }
  }
  @media screen and (max-width: 639px) {
     .menu-filter {
      position: revert;
      max-width: 100%;
      width: 100%;
    }
  }
</style>