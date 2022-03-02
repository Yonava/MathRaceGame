<!-- Singleplayer Session Room -->
<template>
    <div>
      <p>Hello {{ username }}! Welcome to practice mode, where you can hone your skills!</p>
      <button @click="genQuestion()">Generate Question</button>
      <p v-for="i in output" :key="i.id">{{ i }}</p>
    </div>
</template>

<script>

// import io from 'socket.io-client'
import Arithmetic from '../classes/subClasses/Arithematic'

export default {
  name: 'app',
  data: () => {
    return {
      output: [],
      outstr: ""
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
      for (let i = 0; i < 100; i++) {
        this.output.push(question.generateProblem());
      }
      console.log(this.output)
    }
  },
  watch: {

  }

}
</script>

<style scoped>

</style>