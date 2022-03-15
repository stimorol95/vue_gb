<template>
  <div id="app">
    <h2>My personal payments</h2>
    <button class="new-payment" @click="showForm = !showForm">
      add new payment <span v-if="!showForm">&#8595;</span
      ><span v-if="showForm">&#8593;</span>
    </button>
    <PaymentAdd v-if="showForm" @addPaymentItem="addNewPayment" />
    <PaymentList :items="paymentsList" />
  </div>
</template>

<script>
import PaymentList from "./components/PaymentList.vue";
import PaymentAdd from "./components/PaymentAdd.vue";

export default {
  name: "App",
  components: {
    PaymentList,
    PaymentAdd,
  },
  data() {
    return {
      paymentsList: [],
      showForm: false,
    };
  },
  methods: {
    fetchData() {
      return [
        {
          id: 1,
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          id: 2,
          date: "22.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          id: 3,
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
        {
          id: 4,
          date: "21.03.2020",
          category: "Transport",
          value: 273,
        },
        {
          id: 5,
          date: "26.03.2020",
          category: "Health",
          value: 545,
        },
        {
          id: 6,
          date: "16.03.2020",
          category: "Housing",
          value: 502,
        },
        {
          id: 7,
          date: "14.03.2020",
          category: "Health",
          value: 692,
        },
        {
          id: 8,
          date: "02.03.2020",
          category: "Food",
          value: 143,
        },
        {
          id: 9,
          date: "01.03.2020",
          category: "Housing",
          value: 339,
        },
        {
          id: 10,
          date: "06.03.2020",
          category: "Housing",
          value: 339,
        },
      ];
    },
    addNewPayment(payment) {
      console.log("addNewPayment", payment);
      this.paymentsList.push(payment);
    },
  },
  created() {
    this.paymentsList = this.fetchData();
  },
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
