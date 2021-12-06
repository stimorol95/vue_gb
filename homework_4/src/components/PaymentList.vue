<template>
  <div>
    <ul>
      <li class="title">
        <span class="number">#</span>
        <span class="date">Data</span>
        <span class="category">Category</span>
        <span class="value">Value</span>
      </li>
      <li v-for="(item, index) in items" :key="index">
        <span class="number">{{ index + 1 }}</span>
        <span class="date">{{ item.date }} </span>
        <span class="category">{{ item.category }}</span>
        <span class="value">{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PaymentList",
  props: {
    items: {
      // type: Array
      // default: () => []
    },
    showItems: {
      type: Boolean,
      default: false,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped>
ul {
  width: 420px;
  min-height: 186px;
  list-style-type: none;
  padding-left: 15px;
}

li {
  margin-bottom: 15px;
  padding-bottom: 15px;
  display: flex;
  border-bottom: 1px solid black;
}

.number,
.date,
.category {
  display: block;
  margin-right: 25px;
}

.date {
  width: 100px;
}

.category {
  width: 140px;
}

.value {
  display: block;
  width: 75px;
}

.number {
  width: 20px;
}
</style>