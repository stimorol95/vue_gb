<template>
  <div id="app">
    <header>
      <router-link to="/costs">Personal costs</router-link>
      <router-link to="/calc">Calculator</router-link>
      <router-link to="/about">About</router-link>
    </header>
    <main>
      <router-view/>
    </main>
    <transition name="fade">
      <modal-window-edit-menu/>
    </transition>
  </div>
</template>

<script>
import ModalWindowEditMenu from '@/components/ModalWindowEditMenu'
export default {
  name: 'App',
  components: {
    ModalWindowEditMenu
  },
  props: {
  },
  methods: {

  },
  computed: {
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
}

header {
  background-color: #ccc;
  padding: 15px 20px;
}

main {
  margin-left: 25px;
}

a {
  margin-right: 25px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  transition: color .2s;
  &:hover {
    color: #0D98BA;
  }
}

.router-link-active {
  color: #0D98BA;
}

</style>
