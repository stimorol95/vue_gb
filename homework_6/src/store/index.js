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
      state.paymentsList.splice(payload - 1, 1)
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
    //   state.paymentsList[payload.id - 1] = {
    //     category: payload.category,
    //     value: payload.value,
    //     date: state.paymentsList[payload.id - 1].date,
    //     id: payload.id
    //   }
    //   state.paymentsList = [...state.paymentsList]
    // }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getFullPaymentValue: state => {
      return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
    },
    getCategoryList: state => state.categoryList
  },
  actions: {
    fetchData ({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
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
              category: 'Housing',
              value: 339
            }
          ])
        }, 1)
      })
        .then(res => {
          commit('setPaymentsListData', res)
        })
    },
    loadCategories ({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(['Food', 'Transport', 'Housing', 'Clothing', 'Healthcare', 'Entertainment', 'Other'])
        }, 1)
      }).then(res => {
        commit('setCategoriesList', res)
      })
    }
  }
})
