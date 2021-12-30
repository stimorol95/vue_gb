<template>
  <div class="calc">
    <div class="input">
      <input v-model="op1" placeholder="введите число" @focus="picked = 1" autofocus>
      <input v-model="op2" placeholder="введите число" @focus="picked = 2">
      = <span class="error" v-if="(isNaN(op1) || isNaN(op2))">Введите число</span>
      <span v-else>{{ result }}</span>
    </div>
    <div class="key">
      <button
        v-for="operation in operations"
        :key="operation"
        @click="calculate(operation)"
        :disabled="check(operation)">
        {{ operation }}
      </button>
      <div class="checkbox">
        <label>
          <input type="checkbox" v-model="toggle"> Экранная клавиатура
        </label>
      </div>
      <div class="keyboard" v-if="toggle">
        <button v-for="number in numbers" :key="number" @click="add(number)">
          {{ number }}
        </button>
        <button @click="remove">
          &larr;
        </button>
        <div class="radio-button">
          <label><input type="radio" v-model="picked" :value="1" name="radio" id="op1">Операнд 1</label>
          <label><input type="radio" v-model="picked" :value="2" name="radio" id="op2">Операнд 2</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calc',
  data () {
    return {
      op1: '',
      op2: '',
      result: '',
      operations: ['+', '-', '*', '/', '^', '÷'],
      numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      toggle: false,
      picked: 1,
      links: 'op'
    }
  },
  methods: {
    calculate (operation = '+') {
      switch (operation) {
        case '+':
          this.sum()
          break
        case '-':
          this.sub()
          break
        case '*':
          this.mul()
          break
        case '/':
          this.div()
          break
        case '^':
          this.exp()
          break
        case '÷':
          this.intDiv()
          break
      }
    },
    sum () {
      const {
        op1,
        op2
      } = this
      this.result = +op1 + +op2
    },
    sub () {
      const {
        op1,
        op2
      } = this
      this.result = op1 - op2
    },
    mul () {
      const {
        op1,
        op2
      } = this
      this.result = op1 * op2
    },
    div () {
      const {
        op1,
        op2
      } = this
      this.result = op1 / op2
    },
    exp () {
      const {
        op1,
        op2
      } = this
      this.result = op1 ** op2
    },
    intDiv () {
      const {
        op1,
        op2
      } = this
      this.result = (op1 - op1 % op2) / op2
    },
    add (number) {
      if (this.picked === 1) {
        this.op1 += number
      } else if (this.picked === 2) {
        this.op2 += number
      }
    },
    remove () {
      if (this.picked === 1) {
        this.op1 = this.op1.slice(0, -1)
      } else if (this.picked === 2) {
        this.op2 = this.op2.slice(0, -1)
      }
    },
    check (operation) {
      if (this.op1 === '' || this.op2 === '') { // проверяет на пустую строку
        return true
      }
      if (isNaN(this.op1) || isNaN(this.op2)) { // проверяет на число
        return true
      }
      switch (operation) {
        case '/':
        case '÷':
          return +this.op2 === 0 // проверяет деление на 0
        case '^':
          return +this.op1 === 0 && this.op2 <= 0 // проверяет возведение 0 в степень 0 или отрицательную степень
      }
      return false
    }
  }
}
</script>

<style scoped lang="scss">
.calc {
  margin-top: 20px;
}

.input {
  margin-bottom: 15px;
}

input {
  padding: 5px;
  margin-right: 10px;

  &:focus {
    outline: none;
  }

  &[type="number"] {
    min-width: 200px;
  }
  &[type="radio"] {
    margin-right: 5px;
  }
}

button {
  font-size: 20px;
  display: inline-block;
  width: 35px;
  height: 35px;
  padding: 5px;
  margin-right: 5px;
}

.checkbox, .keyboard, .radio-button {
  margin-top: 20px;
}

.radio-button {
  & label {
    margin-right: 20px;
  }
}

.error {
  color: red;
  text-transform: uppercase;
}
</style>
