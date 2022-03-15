<!-- Singleplayer Session Room -->
<template>
    <div>
      <p>Welcome to practice mode, where you can hone your skills!</p>
      <button @click="genQuestion()">Generate Question</button>
      <vue-mathjax :formula="formula"></vue-mathjax>
    </div>
</template>

<script>

import Arithmetic from '../classes/subClasses/Arithematic'

export default {
  name: 'app',
  data: () => {
    return {
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$"
    }
  },
  props: [
    "username"
  ],
  mounted() {
    console.log(this.username)
  },
  created() {

  },
  destroyed() {

  },
  methods: {
    // Create a new problem
    genQuestion() {
      let question = new Arithmetic();
      this. formula = "$$" + question.generateProblem() + "$$";
      console.log(this.formula);
    }
  },
  watch: {

  }

}
</script>

<style scoped>

</style>