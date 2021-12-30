<template>
  <v-card class="text-left pa-8">
    <v-row class="flex-column">
      <v-text-field v-model="newCategory" label="Category" prepend-icon="mdi-select-place"/>
      <v-text-field v-model="newValue" label="Value" type="number" prepend-icon="mdi-currency-usd"/>
    </v-row>
    <v-row justify="space-between">
      <v-btn @click="editItem(item)" color="orange darken-1" dark>Save</v-btn>
      <v-btn @click="closeWindow(item)" color="orange darken-1" dark>close</v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'CostsEdit',
  props: {
    item: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      dialog: false,
      newCategory: '',
      newValue: ''
    }
  },
  methods: {
    editItem (id) {
      console.log(id)
      this.$emit('closeAdd')
      // const data = {
      //   id: id,
      //   category: this.newCategory,
      //   value: Number(this.newValue)
      // }
      // this.$store.commit('editDataToPaymentsList', data)
      // this.newCategory = ''
      // this.newValue = ''
    },
    closeWindow (item) {
      this.category = ''
      this.value = ''
      this.date = ''
      this.$emit('closeAdd', item)
    }
  },
  mounted () {
    this.newCategory = this.item.category
    this.newValue = this.item.value
  }
}
</script>

<style scoped>

</style>
