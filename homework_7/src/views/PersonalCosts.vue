<template>
  <div>
    <h2>My personal costs</h2>
    <p>Total price of all categories: {{ totalPrice }}</p>
    <button class="new-cost" @click="showForm=!showForm">add new cost <span v-if="!showForm">&#8595;</span><span
      v-if="showForm">&#8593;</span></button>
    <CostsAdd v-if="showForm" @addCostsItem="addCostsItem" :selectList="categoryList" :props-category="category"
              :props-value="value"/>
    <CostsList show-items :items="currentElements"/>
    <Pagination :current="page" :quantity="quantity" :length="getPaymentsList.length" @paginate="changePage"/>
  </div>
</template>

<script>

import CostsAdd from '@/components/CostsAdd'
import CostsList from '@/components/CostsList'
import Pagination from '@/components/Pagination'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PersonalCosts',
  components: {
    Pagination,
    CostsList,
    CostsAdd
  },
  data () {
    return {
      showForm: false,
      page: 1,
      quantity: 5,
      category: '',
      value: ''
    }
  },
  methods: {
    ...mapMutations([
      'setPaymentsListData',
      'addDataToPaymentsList'
    ]),
    ...mapActions([
      'fetchData',
      'loadCategories'
    ]),
    addCostsItem (data) {
      this.addDataToPaymentsList(data)
    },
    changePage (p) {
      this.page = p
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentsList',
      'getFullPaymentValue',
      'getCategoryList'
    ]),
    paymentsList () {
      return this.getPaymentsList
    },
    length () {
      return this.getPaymentsList
    },
    totalPrice () {
      return this.getFullPaymentValue
    },
    categoryList () {
      return this.getCategoryList
    },
    currentElements () {
      const {
        quantity,
        page
      } = this
      return this.paymentsList.slice(quantity * (page - 1), quantity * (page - 1) + quantity)
    }
  },
  created () {
    this.fetchData()
    this.loadCategories()
    this.page = +this.$route.params.page || 1
    this.category = this.$route.params.category
    this.value = this.$route.query.value
    this.showForm = this.$route.name === 'addLink'
  }
}
</script>

<style scoped>
.new-cost {
  width: 136px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  padding: 5px 10px;
  color: #fff;
  background-color: #0D98BA;
  border: none;
}

a {
  display: block;
}
</style>
