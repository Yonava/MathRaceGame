<!-- Singleplayer Session Room -->
<template>
    <div>
      <p>Hello {{ username }}! Welcome to practice mode, where you can hone your skills!</p>
      <button @click="genQuestions()">Generate Questions</button>
      <input type="range" min="2" max="15" v-model="max">{{max}}
      <h1 v-for="i in output" :key="i.id">{{i}} : <vue-mathjax :formula="i.equation"></vue-mathjax></h1>
    </div>
</template>

<script>

import GenerateQuestions from '../assets/QuestionAssembler'

export default {
  name: 'app',
  data: () => {
    return {
    username: "",
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
    // Create the set of problems
    genQuestions() {
      this.output = GenerateQuestions();
    }
  },
  watch: {

  }

}
</script>

<style scoped>

</style>