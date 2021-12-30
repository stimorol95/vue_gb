<template>
  <div>
    <ul>
      <li class="title">
        <span class="number">#</span>
        <span class="date">Data</span>
        <span class="category">Category</span>
        <span class="value">Value</span>
      </li>
      <li v-for="(item, idx) in items" :key="idx">
        <span class="number">{{ item.id }}</span>
        <span class="date">{{ item.date }} </span>
        <span class="category">{{ item.category }}</span>
        <span class="value">{{ item.value }}</span>
        <span class="material-icons-outlined tools-open" @click="onClickContextItem($event,item)">more_vert</span>
      </li>
    </ul>
  </div>

</template>

<script>

export default {
  name: 'CostsList',
  props: {
    items: {
      type: Array
    },
    showItems: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showInput: false,
      newCategory: '',
      newValue: ''
    }
  },
  methods: {
    onClickContextItem (event, item) {
      const items = [
        {
          text: 'edit',
          action: () => {
            this.$context.EventBus.$emit('showInput', item)
          }
        },
        {
          text: 'delete',
          action: () => {
            this.actionDelete(item.id)
          }
        }
      ]
      this.$context.show({ event, items })
    },
    actionDelete (id) {
      this.$store.commit('delDataToPaymentsList', id)
      this.$context.close()
    }
  }
}

</script>

<style scoped lang="scss">

@import url("https://fonts.googleapis.com/css2?family=Material+Icons+Outlined");

ul {
  width: 420px;
  min-height: 253px;
  list-style-type: none;
  padding-left: 15px;
}

li {
  margin-bottom: 15px;
  display: flex;
  border-bottom: 1px solid black;
}

.number, .date, .category {
  display: block;
  margin-right: 25px;
}

.date {
  width: 100px;
}

.category {
  width: 140px;
}

.value {
  display: block;
  width: 45px;
}

.number {
  width: 20px;
}

.material-icons-outlined {
  cursor: pointer;
}

.tools-open {
  position: relative;
  padding-bottom: 15px;
  padding-left: 15px;

  &:hover .tools {
    display: flex;
  }
}

.tools {
  position: absolute;
  top: 22px;
  left: -58px;
  display: none;
  flex-direction: column;
  //align-items: center;
  //justify-content: center;
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
