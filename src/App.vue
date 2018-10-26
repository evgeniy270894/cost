<template>
  <div id="app">
    <main-header/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    'main-header': Header
  }
}
</script>

<style>
  #app, body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }

  #app {
    padding-bottom: 40px;
  }

  .fade-enter, .fade-leave-to {
    transition: opacity 0.3s;
    opacity: 0;
  }

  .fade-leave, .fade-enter-to {
    transition: opacity 0.3s;
  }
</style>
