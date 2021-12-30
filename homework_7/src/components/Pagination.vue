<template>
  <div>
    <span class="pagination" @click="onClick(current - 1)">&lt;</span>
    <span class="pagination" v-for="page in pageCount" :key="page" @click="onClick(page)" :class="{ active: current === page }">
    {{ page }}
  </span>
    <span class="pagination" @click="onClick(current + 1)">&gt;</span>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    quantity: Number,
    current: Number,
    length: Number
  },
  computed: {
    pageCount () {
      return Math.ceil(this.length / this.quantity)
    }
  },
  methods: {
    onClick (page) {
      if (page < 1 || page > this.pageCount) {
        return
      }
      this.$emit('paginate', page)
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: #0D98BA;
  }
}

.active {
  color: #0D98BA;
}
</style>
