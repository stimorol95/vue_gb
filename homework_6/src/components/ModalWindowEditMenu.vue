<template>
  <div class="context" v-if="shown" :style="styles">
    <div
      class="context__item"
      v-for="item in items"
      :key="item.text"
      @click="onCLick(item)">
      <span class="material-icons-outlined">{{ item.text }}</span>
      {{ item.text }}
    </div>
    <input class="newCategory" type="text" v-if="showInput" v-model="newCategory">
    <input class="newValue" type="number" v-if="showInput" v-model="newValue">
    <button @click="editItem(id)" v-if="showInput">save</button>
  </div>
</template>

<script>
export default {
  name: 'ModalWindowEditMenu',
  data () {
    return {
      showInput: false,
      newCategory: '',
      newValue: '',
      id: 0,
      items: [],
      shown: false,
      xPos: 0,
      yPos: 0
    }
  },
  methods: {
    editItem (id) {
      const data = {
        id: id,
        category: this.newCategory,
        value: Number(this.newValue)
      }
      this.$store.commit('editDataToPaymentsList', data)
      this.showInput = false
      this.shown = false
    },
    onCLick (item) {
      item.action()
    },
    onShown ({
      items,
      caller
    }) {
      this.items = items
      this.shown = true
      this.setPosition(caller)
    },
    onClose () {
      this.items = []
      this.shown = false
    },
    setPosition (caller) {
      const pos = caller.getBoundingClientRect()
      this.xPos = pos.left
      this.yPos = pos.top
    }
  },
  computed: {
    styles () {
      return {
        top: `${this.yPos + 20}px`,
        left: `${this.xPos + 20}px`
      }
    }
  },
  mounted () {
    this.$context.EventBus.$on('shown', this.onShown)
    this.$context.EventBus.$on('close', this.onClose)
    this.$context.EventBus.$on('showInput', (data) => {
      this.newValue = data.value
      this.newCategory = data.category
      this.date = data.date
      this.id = data.id
      this.showInput = true
    })
  },
  beforeDestroy () {
    this.$context.EventBus.$off('shown', this.onShown)
    this.$context.EventBus.$off('close', this.onClose)
    this.$context.EventBus.$off('showInput')
  }
}

</script>

<style scoped lang="scss">
.context {
  position: absolute;
  background: #eee;
  cursor: pointer;
}

.material-icons-outlined {
  cursor: pointer;
}

.tools {
  position: absolute;
  top: 22px;
  left: -58px;
  display: none;
  flex-direction: column;
  z-index: 2;
  background: white;
  -webkit-box-shadow: 0 0 15px 4px #A3A3A3;
  box-shadow: 0 0 15px 4px #A3A3A3;

  &:before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: -5px;
    left: 75px;
  }
}

.tool {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  padding: 5px 20px 5px 10px;

  &:hover {
    color: #0D98BA;
  }
}

.material-icons-outlined {
  font-size: 16px;
  margin-right: 7px;
}

</style>
