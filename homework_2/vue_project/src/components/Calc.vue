<template>
  <div class="calc">
    <div class="main">
      <input v-model.number="op1" type="number" @focus="picked = 1" />
      <input v-model.number="op2" type="number" @focus="picked = 2" />
      = {{ result }}
    </div>
    <div class="error" v-if="error">Ошибка: {{ error }}</div>
    <div class="keyboard">
      <button
        v-for="operation in operations"
        :key="operation"
        :title="operation"
        :disabled="op1 === '' || op2 === ''"
        @click="calculate(operation)"
      >
        {{ operation }}
      </button>
      <div class="checkbox">
        <label>
          <input type="checkbox" v-model="toggle" /> Экранная клавиатура
        </label>
      </div>
      <div class="keyboard" v-if="toggle">
        <button v-for="number in numbers" :key="number" @click="add(number)">
          {{ number }}
        </button>
        <button @click="remove">del</button>
        <div class="radio-button">
          <label
            ><input
              type="radio"
              v-model="picked"
              :value="1"
              name="radio"
              id="op1"
            />Операнд 1</label
          >
          <label
            ><input
              type="radio"
              v-model="picked"
              :value="2"
              name="radio"
              id="op2"
            />Операнд 2</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      op1: "",
      op2: "",
      error: "",
      operations: ["+", "-", "/", "*", "^", "%"],
      result: 0,
      toggle: false,
      picked: 1,
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    };
  },
  methods: {
    calculate(operation = "+") {
      this.error = "";
      switch (operation) {
        default:
          this.plus();
          break;
        case "-":
          this.sub();
          break;
        case "/":
          this.div();
          break;
        case "*":
          this.multi();
          break;
        case "^":
          this.pow();
          break;
        case "%":
          this.proc();
          break;
        case "del":
          this.remove();
          break;
      }
    },
    plus() {
      const { op1, op2 } = this;
      this.result = op1 + op2;
    },
    sub() {
      const { op1, op2 } = this;
      this.result = op1 - op2;
    },
    div() {
      const { op1, op2 } = this;
      if (op2 === 0) {
        this.error = "Делить на 0 нельзя";
        return;
      }
      this.result = op1 / op2;
    },
    multi() {
      const { op1, op2 } = this;
      this.result = op1 * op2;
    },
    pow() {
      const { op1, op2 } = this;
      this.result = op1 ** op2;
    },
    proc() {
      const { op1, op2 } = this;
      this.result = Math.floor(op1 / op2);
    },
    add(number) {
      if (this.picked === 1) {
        this.op1 += number;
      } else if (this.picked === 2) {
        this.op2 += number;
      }
    },
    remove() {
      if (this.picked === 1) {
        this.op1 = this.op1.slice(0, -1);
      } else if (this.picked === 2) {
        this.op2 = this.op2.slice(0, -1);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.myClass {
  width: 100px;
}
</style>
