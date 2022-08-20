<template>
  <div class="text-black w-full">
    <div v-on:click="gotoCharsertD(id)" v-show="page=='characters'" class="m-5 md:m-3 relative cursor-pointer card">
      <div class="px-2">
        <img class="w-full rounded-full bg-red" :src="[images]" alt="">
      </div>
      <div class="w-full pt-4 flex-col flex">
        <p class="class-name">
          <span>{{title}}</span>
        </p>
        <table class="text-left">
         <tr>
            <td class="w-1/2 font-bold">Estado: </td>
            <td class="w-1/2">{{status}}</td>
         </tr>
         <tr>
            <td class="w-1/2 font-bold">Genero: </td>
            <td class="w-1/2">{{gender}}</td>
         </tr>
         <tr>
            <td class="w-1/2 font-bold align-sub">Especie: </td>
            <td class="w-1/2">{{species}}</td>
         </tr>
         <tr>
            <td class="w-1/2 font-bold align-sub">Ubicación: </td>
            <td class="w-1/2">{{location}}</td>
         </tr>
      </table>
      </div>
    </div>

    <div v-show="page=='locations'">
      <div v-on:click="gotoLocationD(id, title)" class="relative rounded-xl cursor-pointer mx-4 my-4">
        <div class="w-full bg-blue-100 rounded-xl flex-col flex" style="box-shadow: 0px 0px 16px 4px rgb(217 217 217);">
          <span class="leading-loose text-xl bg-blue-400 text-white font-bold rounded-t-lg">Estado: {{status}}</span>
          <span class="title-location py-2 px-3 h-24 flex justify-center items-center border-b border-blue-400 w-full font-extrabold">{{title}}</span>
          <span class="py-3 leading-5">
            <strong>Dimensión:</strong><br>
            {{species}}
          </span>
        </div>
      </div>
    </div>

    <div v-show="page=='episodes'">
      <div :class="[getStatus]" class="relative rounded-xl mx-4 my-4">
        <div class="w-full bg-violet-100 rounded-xl flex-col flex" style="box-shadow: 0px 0px 16px 4px rgb(217 217 217);">
          <span class="leading-loose text-xl bg-violet-400 text-white font-bold rounded-t-lg">Estado: {{status}}</span>
          <span class="title-location py-2 px-3 h-24 flex justify-center items-center border-b border-violet-400 w-full font-extrabold">{{title}}</span>
          <span class="py-3 leading-5">
            <strong>Fecha:</strong><br>
            {{species}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name : 'Card',
    computed : {
      getStatus: function (){
        if(this.status=='Alive'){
          return 'bg-[#5DFF18] text-black';
        }
       else if (this.status=='unknown') {
          return 'bg-amber-300 text-black capitalize ';
        }
        else {
          return 'bg-red-500 ';
        }
      },
    },
    methods : {
      gotoLocationD(event, name){
        this.$router.push({ name: 'Location Detail', params:{id:event, name:name} })
      },
      gotoCharsertD(event){
        this.$router.push({ name: 'Character Detail', params:{id:event} })
      }
    },
    props : ['images', 'title', 'status' , 'species', 'gender', 'location', 'page', 'id' ]
  }
</script>

<style>
  .card {
    height: 95%;
    background-color: #cbcbdbf2;
    border-radius: 10px;
    padding: 28px 20px;
    box-shadow: 0px 0px 13px 0px rgb(255, 255, 255);
  }
  .card:hover {
    box-shadow: 0px 0px 20px 0px rgb(255, 255, 255);
  }
  .class-name {
    font-size: 17px;
    line-height: 1.1;
    font-weight: bold;
    margin: -33px auto 16px;
    background-color: #ffffff;
    border-radius: 5px;
    width: 90%;
    height: 4.5vh;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .title-location {
    font-size: 1.4rem;
    line-height: 1.5rem;
  }
</style>