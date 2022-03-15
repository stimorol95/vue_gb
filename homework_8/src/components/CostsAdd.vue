<template>
  <v-card class="text-left pa-8">
    <v-row class="flex-column">
      <v-select v-model="category" label="Category" :items="selectList" prepend-icon="mdi-select-place"/>
      <v-text-field v-model="value" label="Value" type="number" prepend-icon="mdi-currency-usd"/>
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on">
          </v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false">
        </v-date-picker>
      </v-menu>
    </v-row>
    <v-row justify="space-between">
      <v-btn @click="onSaveClick" color="orange darken-1" dark>add</v-btn>
      <v-btn @click="closeWindow" color="orange darken-1" dark>close</v-btn>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'CostsAdd',
  props: {
    selectList: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      id: 1,
      category: '',
      value: '',
      date: '',
      menu: false,
      modal: false,
      menu2: false
    }
  },
  computed: {
    getCurrentDate () {
      return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date())
    }
  },
  methods: {
    onSaveClick () {
      if (this.category && this.value) {
        const data = {
          id: this.id,
          category: this.category,
          value: Number(this.value),
          date: this.date || this.getCurrentDate
        }
        this.$emit('addCostsItem', data)
        this.category = ''
        this.value = ''
        this.date = ''
        this.closeWindow()
      }
    },
    closeWindow () {
      this.category = ''
      this.value = ''
      this.date = ''
      this.$emit('closeAdd')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
