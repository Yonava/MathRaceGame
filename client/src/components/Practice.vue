<!-- Singleplayer Session Room -->
<template>
    <div>
      <p>Hello {{ username }}! Welcome to practice mode, where you can hone your skills!</p>
      <button @click="genQuestions()">Generate Questions</button>
      <input type="range" min="2" max="15" v-model="max">{{max}}
      <h1 v-for="i in output" :key="i.id">{{i}}</h1>
    </div>
</template>

<script>

//import GenerateQuestions from '../assets/QuestionAssembler'
import Arithmetic from '../classes/subClasses/Arithematic'

export default {
  name: 'app',
  data: () => {
    return {
      max: 0,
      output: []
    }
  },
  props: [

  ],
  mounted() {

  },
  created() {

  },
  destroyed() {

  },
  methods: {
    // Create a new problem
    genQuestions() {
      this.output = Arithmetic.BaseEq("+");
    }
  },
  watch: {

  }

}
</script>

<style scoped>

</style>