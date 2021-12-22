<template>
  <div id="app">
    <header>
      <router-link to="/costs">Personal costs</router-link>
      <router-link to="/calc">Calculator</router-link>
      <router-link to="/about">About</router-link>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  props: {
    category: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showForm: false,
      page: 1,
      quantity: 3,
    };
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
  margin-left: 15px;
}
.new-payment {
  width: 136px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  padding: 5px 10px;
  color: #fff;
  background-color: #0d98ba;
  border: none;
}
</style>
