<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="wolf" />
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped lang="scss">
.logo {
  width: 400px;
  height: 400px;
  background-image: url("../assets/logo.png");
  background-size: 400px 400px;
}
img {
  width: 400px;
  height: 400px;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0;
  }
}
</style>
