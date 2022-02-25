<!-- Singleplayer Session Room -->
<template>
    <div>
      <p>Hello {{ username }}! Welcome to practice mode, where you can hone your skills!</p>
      <button @click="genQuestion()">Generate Question</button>
      <p>Output: {{ output }}</p>
    </div>
</template>

<script>

// import io from 'socket.io-client'
import Arithmetic from '../classes/subClasses/Arithematic'

export default {
  name: 'app',
  data: () => {
    return {
      output: ""
    }
  },
  props: [
    'username'
  ],
  mounted() {

  },
  created() {

  },
  destroyed() {

  },
  methods: {
    genQuestion() {
      let question = new Arithmetic();
      this.output = question.generateProblem();
    }
  },
  watch: {

  }

}
</script>

<style scoped>

</style>