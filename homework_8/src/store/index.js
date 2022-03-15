import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: []
  },
  mutations: {
    setPaymentsListData (state, payload) {
      state.paymentsList = payload
    },
    addDataToPaymentsList (state, payload) {
      state.paymentsList.map(i => {
        i.id += 1
      })
      state.paymentsList.unshift(payload)
    },
    setCategoriesList (state, payload) {
      state.categoryList = payload
    },
    delDataToPaymentsList (state, payload) {
      // state.paymentsList.splice(payload - 1, 1)
      state.paymentsList = state.paymentsList.filter(item => item.id !== payload)
      let n = 1
      state.paymentsList.map(item => {
        item.id = n
        n++
      })
    },
    editDataToPaymentsList (state, payload) {
      Vue.set(state.paymentsList, payload.id - 1, {
        category: payload.category,
        value: payload.value,
        date: state.paymentsList[payload.id - 1].date,
        id: payload.id
      })
    }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getFullPaymentValue: state => {
      return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
    },
    getCategoryList: state => state.categoryList,
    getChart: (state) => {
      return state.categoryList.map(category => {
        return state.paymentsList.reduce((total, item) => {
          if (item.category === category) {
            total += +item.value
          }
          return total
        }, 0)
      })
    }
  },
  actions: {
    fetchData ({ commit }) {
      return commit('setPaymentsListData', [
        {
          id: 1,
          date: '28.03.2020',
          category: 'Food',
          value: 169
        },
        {
          id: 2,
          date: '24.03.2020',
          category: 'Transport',
          value: 360
        },
        {
          id: 3,
          date: '24.03.2020',
          category: 'Food',
          value: 532
        },
        {
          id: 4,
          date: '21.03.2020',
          category: 'Housing',
          value: 273
        },
        {
          id: 5,
          date: '21.03.2020',
          category: 'Healthcare',
          value: 545
        },
        {
          id: 6,
          date: '16.03.2020',
          category: 'Housing',
          value: 502
        },
        {
          id: 7,
          date: '14.03.2020',
          category: 'Clothing',
          value: 692
        },
        {
          id: 8,
          date: '02.03.2020',
          category: 'Food',
          value: 143
        },
        {
          id: 9,
          date: '01.03.2020',
          category: 'Entertainment',
          value: 339
        }
      ])
    },
    loadCategories ({ commit }) {
      return commit('setCategoriesList', ['Food', 'Transport', 'Housing', 'Clothing', 'Healthcare', 'Entertainment'])
    }
  }
})
