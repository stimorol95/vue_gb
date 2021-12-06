<template>
  <div id="app">
    <h2>My personal payments</h2>
    <p>Total price of all categories: {{ totalPrice }}</p>
    <button class="new-payment" @click="showForm = !showForm">
      add new payment <span v-if="!showForm">&#8595;</span
      ><span v-if="showForm">&#8593;</span>
    </button>
    <PaymentAdd
      v-if="showForm"
      @addPaymentItem="addPaymentItem"
      :selectList="categoryList"
    />
    <PaymentList :items="paymentsList" :pageNumber="currentElements" />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
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
      showForm: false,
      page: 1,
      quantity: 3,
      count: 1,
    };
  },
  methods: {
    ...mapMutations([
      "setPaymentsListData",
      "addDataToPaymentsList",
      "setCurrentList",
    ]),
    ...mapActions(["fetchData", "loadCategories"]),
    addPaymentItem(data) {
      this.addDataToPaymentsList(data);
    },
    changePage(p) {
      this.page = p;
    },
  },
  computed: {
    ...mapGetters([
      "getPaymentsList",
      "getFullPaymentValue",
      "getCategoryList",
      "getPage",
      "getPaymentsListLength",
    ]),
    paymentsList() {
      return this.getPage(this.page);
    },
    PaymentsListLength() {
      return this.getPaymentsListLength;
    },
    totalPrice() {
      return this.getFullPaymentValue;
    },
    categoryList() {
      return this.getCategoryList;
    },
    currentElements() {
      return this.page;
    },
  },
  created() {
    this.fetchData();
    this.loadCategories();
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
