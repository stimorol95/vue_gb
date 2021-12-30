<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>My personal costs</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="6">
        <v-dialog v-model="dialog" width="500" persistent>
          <template v-slot:activator="{ on }">
            <v-btn color="orange darken-1" dark v-on="on">
              Add new cost <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <CostsAdd :selectList="categoryList" @closeAdd="closeWindow" @addCostsItem="addCostsItem"/>
          </v-card>
        </v-dialog>
        <CostsList :items="currentElements" :category="categoryList" @render="render"/>
        <v-pagination
          v-model="page"
          :length="paginationLength"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          color="orange darken-1"
          class="mt-5">
        </v-pagination>
      </v-col>
      <v-col :cols="6">
        <canvas ref="canvas"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import CostsAdd from '@/components/CostsAdd'
import CostsList from '@/components/CostsList'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'PersonalCosts',
  extends: Doughnut,
  components: {
    CostsList,
    CostsAdd
  },
  data () {
    return {
      page: 1,
      quantity: 5,
      category: '',
      value: '',
      dialog: false
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
      this.render()
    },
    closeWindow () {
      this.dialog = false
    },
    render () {
      this.renderChart({
        labels: this.getCategoryList,
        datasets: [{
          label: '# of Votes',
          data: this.chartValue,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(156, 39, 176, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(0, 150, 136, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(156, 39, 176, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 150, 136, 1)'
          ],
          borderWidth: 3
        }]
      })
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentsList',
      'getFullPaymentValue',
      'getCategoryList',
      'getChart'
    ]),
    paymentsList () {
      return this.getPaymentsList
    },
    length () {
      return this.getPaymentsList.length
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
    },
    chartValue () {
      return this.getChart
    },
    paginationLength () {
      return Math.ceil(this.length / this.quantity)
    }
  },
  created () {
    this.fetchData()
    this.loadCategories()
    // this.page = +this.$route.params.page || 1
    // this.category = this.$route.params.category
    // this.value = this.$route.query.value
    // this.showForm = this.$route.name === 'addLink'
  },
  mounted () {
    this.render()
  }
}
</script>

<style scoped>
</style>
