<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer.vue";

export default {
  name:"App",
  components : {
    Header,
    Footer
}
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 24px 13px 46px;
  }

  #nav a {
    font-weight: bold;
    color: #42b5cb;
    box-shadow: 0px 0px 20px 5px rgb(166 192 68 / 69%);
    background-color: rgb(166 192 68 / 43%);
  }

  #nav a.router-link-exact-active {
    color: #fff;
  }
</style>