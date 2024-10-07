<template>

  <navbar />
  <router-view />
</template>
<script setup>
import Navbar from './components/navbar.vue';


</script>
<style lang="scss">
$primary: rgba(249, 112, 104, 1);
$second: rgba(219, 228, 245, 1);
$black: rgba(34, 35, 38, 1);
$white: rgba(255, 236, 236, 1);

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: $white;
  box-sizing: content-box;
  padding: 10vh 0;
}



button {
  padding: 20px;
  margin: 20px;
  width: 50vw;
  background-color: $primary;
  border: 0;
  color: white;
  border-radius: 20px;

}


nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
