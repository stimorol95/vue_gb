<template>
  <v-container>
    <div class="input">
      <v-text-field v-model="op1" label="Enter a number" type="number"/>
      <v-text-field v-model="op2" label="Enter a number" type="number"/>
      <v-text-field v-model="result" label="Result" value=""/>
      <!--      <input v-model="op1" placeholder="введите число" @focus="picked = 1" autofocus name="op1">-->
      <!--      <input v-model="op2" placeholder="введите число" @focus="picked = 2" name="op2">-->
<!--      = <span class="error" v-if="(isNaN(op1) || isNaN(op2))">Введите число</span>-->
<!--      <span v-else>{{ result }}</span>-->
    </div>
    <div class="key">
      <v-btn
        v-for="operation in operations"
        :key="operation"
        @click="calculate(operation)"
        :name="operation"
        :disabled="check(operation)">
        {{ operation }}
      </v-btn>
        <v-checkbox v-model="toggle" label="On-screen keyboard" color="orange darken-1"/>
        <div class="keyboard" v-if="toggle">
          <v-btn v-for="number in numbers" :key="number" @click="add(number)" color="orange darken-1" dark>
            {{ number }}
          </v-btn>
          <v-btn @click="remove" name="remove" color="orange darken-1" dark>
            &larr;
          </v-btn>
            <v-radio-group v-model="picked" >
              <v-radio :value="1" color="orange darken-1" label="Operand 1"></v-radio>
              <v-radio :value="2" color="orange darken-1" label="Operand 2"></v-radio>
            </v-radio-group>
<!--            <label><input type="radio" v-model="picked" :value="1" name="radio1" id="op1">Операнд 1</label>-->
<!--            <label><input type="radio" v-model="picked" :value="2" name="radio2" id="op2">Операнд 2</label>-->
        </div>
    </div>
  </v-container>
  <!--  <div class="calc">-->

  <!--  </div>-->
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
      }
      if (this.picked === 2) {
        this.op2 += number
      }
    },
    remove () {
      if (this.picked === 1) {
        this.op1 = this.op1.slice(0, -1)
      }
      if (this.picked === 2) {
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
