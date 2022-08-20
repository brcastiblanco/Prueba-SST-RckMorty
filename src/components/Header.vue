<template>
  <header class="mx-auto pt-3 flex flex-col">
    <div class="justify-center items-center flex w-full">
      <img class="w-11 md:w-16 h-fit justify-center pr-3" src="../../public/images/rick.png" alt="">
      <img class="w-48 md:w-64 justify-center" src="../../public/images/logo.png" alt="">
      <img class="w-11 md:w-16 h-fit justify-center pl-3" src="../../public/images/morty.png" alt="">
    </div>
    <Nav/>
  </header>
</template>

<script>
import Nav from "./Nav";
export default {
  name:'Header',
  components : {
    Nav
  },
}
</script>

<style>
  header {
    background-image: url(../../public/images/background.jpg);
    text-align: center;
    position: sticky;
    top: 0px;
    z-index: 1;
    width: 100%;
  }
</style>