<template>
  <v-container>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Date</th>
              <th class="text-left">Category</th>
              <th class="text-left">Value</th>
              <th class="text-left"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in items" :key="idx">
              <td>{{ item.id }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.category}}</td>
              <td>{{ item.value }}</td>
              <td>
                <v-dialog v-model="dialog[item.id]" width="500" :retain-focus="false" persistent>
                  <template v-slot:activator="{ on }">
                    <v-icon small class="mr-2" v-on="on">mdi-pencil</v-icon>
                  </template>
                  <v-card class="text-left pa-8">
                    <v-row class="flex-column">
                      <v-select v-model="newCategory" label="Category" prepend-icon="mdi-select-place" :items="category"/>
                      <v-text-field v-model="newValue" label="Value" type="number" prepend-icon="mdi-currency-usd" />
                    </v-row>
                    <v-row justify="space-between">
                      <v-btn @click="editItem(item)" color="orange darken-1" dark>Save</v-btn>
                      <v-btn @click="dialog[item.id] = false" color="orange darken-1" dark>close</v-btn>
                    </v-row>
                  </v-card>
                </v-dialog>
                <v-icon small @click="removeItem(item.id)">mdi-delete</v-icon>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>

  </v-container>
</template>

<script>

export default {
  name: 'CostsList',
  props: {
    items: {
      type: Array
    },
    category: {
      type: Array
    }
  },
  data () {
    return {
      dialog: {},
      newCategory: '',
      newValue: ''
    }
  },
  methods: {
    editItem (item) {
      const data = {
        id: item.id,
        category: this.newCategory,
        value: Number(this.newValue)
      }
      this.$store.commit('editDataToPaymentsList', data)
      this.newCategory = ''
      this.newValue = ''
      this.dialog[item.id] = false
      this.$emit('render')
    },
    removeItem (id) {
      this.$store.commit('delDataToPaymentsList', id)
      this.$emit('render')
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 286px;
}

</style>
