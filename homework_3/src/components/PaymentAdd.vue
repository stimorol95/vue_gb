<template>
  <div class="form">
    <input placeholder="Category" v-model="category" />
    <input placeholder="Value" v-model="value" />
    <input placeholder="Date" v-model="date" />
    <button @click="addPayment">add +</button>
  </div>
</template>

<script>
export default {
  name: "PaymentAdd",
  data() {
    return {
      id: 1,
      category: "",
      value: "",
      date: "",
    };
  },
  computed: {
    paymentDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
  methods: {
    addPayment() {
      const data = {
        id: this.id,
        category: this.category,
        value: this.value,
        date: this.date || this.getCurrentDate,
      };
      this.$emit("addPaymentItem", data);
      this.category = "";
      this.value = "";
      this.date = "";
    },
  },
};
</script>

<style scoped>
input {
  display: block;
  width: 150px;
  margin-top: 10px;
  padding: 5px 10px;
}

button {
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 10px;
  padding: 5px 10px;
  color: #fff;
  background-color: #0d98ba;
  border: none;
}
</style>
