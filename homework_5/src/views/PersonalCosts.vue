<template>
  <div>
    <h2>My personal costs</h2>
    <p>Total price of all categories: {{ totalPrice }}</p>
    <button class="new-cost" @click="showForm = !showForm">
      add new cost <span v-if="!showForm">&#8595;</span
      ><span v-if="showForm">&#8593;</span>
    </button>
    <PaymentAdd
      v-if="showForm"
      @addCostsItem="addCostsItem"
      :selectList="categoryList"
      :props-category="category"
      :props-value="value"
    />
    <PaymentList show-items :items="currentElements" />
    <Pagination
      :current="page"
      :quantity="quantity"
      :length="getPaymentsList.length"
      @paginate="changePage"
    />
    <br />
    <a href="/costs/add/payment/Food?value=200"
      >добавить платёж категории Food с ценой 200</a
    >
    <a href="/costs/add/payment/Transport?value=50"
      >добавить платёж категории Transport с ценой 50</a
    >
    <a href="/costs/add/payment/Entertainment?value=2000"
      >добавить платёж категории Entertainment с ценой 2000</a
    >
  </div>
</template>

<script>
import PaymentAdd from "@/components/PaymentAdd";
import PaymentList from "@/components/PaymentList";
import Pagination from "@/components/Pagination";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "PersonalCosts",
  components: {
    Pagination,
    PaymentList,
    PaymentAdd,
  },
  data() {
    return {
      showForm: false,
      page: 1,
      quantity: 3,
      category: "",
      value: "",
    };
  },
  methods: {
    ...mapMutations(["setPaymentsListData", "addDataToPaymentsList"]),
    ...mapActions(["fetchData", "loadCategories"]),
    addCostsItem(data) {
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
    ]),
    paymentsList() {
      return this.getPaymentsList;
    },
    length() {
      return this.getPaymentsList;
    },
    totalPrice() {
      return this.getFullPaymentValue;
    },
    categoryList() {
      return this.getCategoryList;
    },
    currentElements() {
      const { quantity, page } = this;
      return this.paymentsList.slice(
        quantity * (page - 1),
        quantity * (page - 1) + quantity
      );
    },
  },
  created() {
    this.fetchData();
    this.loadCategories();
    this.page = +this.$route.params.page || 1;
    this.category = this.$route.params.category;
    this.value = this.$route.query.value;
    this.showForm = this.$route.name === "addLink";
  },
};
</script>

<style scoped>
.new-cost {
  width: 136px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  padding: 5px 10px;
  color: #fff;
  background-color: #0d98ba;
  border: none;
}

a {
  display: block;
}
</style>
