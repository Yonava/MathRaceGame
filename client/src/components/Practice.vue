<!-- Singleplayer Session Room -->
<template>
    <div>
      <p>Hello {{ username }}! Welcome to practice mode, where you can hone your skills!</p>
      <button @click="genQuestions()">Generate Questions</button>
      <input type="range" min="2" max="15" v-model="max">{{max}}
      <h1 v-for="i in output" :key="i.id"> 
        <vue-mathjax :formula="i.equation"></vue-mathjax>
        
        <input type="radio" id="choiceOne" :name="i.equation" :value="i.answer" @click="choice[output.indexOf(i)]=i.answer">
        <label for="choiceOne">{{i.answer}}</label><br>

        <input type="radio" id="choiceTwo" :name="i.equation" :value="i.options[1]" @click="choice[output.indexOf(i)]=i.options[1]">
        <label for="choiceOne">{{i.options[1]}}</label><br>

        <input type="radio" id="choiceThree" :name="i.equation" :value="i.options[2]">
        <label for="choiceTwo" @click="choice[output.indexOf(i)]=i.options[2]">{{i.options[2]}}</label><br>

        <input type="radio" id="choiceFour" :name="i.equation" :value="i.options[3]">
        <label for="choiceThree" @click="choice[output.indexOf(i)]=i.options[3]">{{i.options[3]}}</label><br><br>

        <button @click="checkAnswer(output.indexOf(i), i.answer), qAnswered[output.indexOf(i)]=true">Submit</button>

        <p v-show="qAnswered[output.indexOf(i)]">{{correct[output.indexOf(i)] ? "Correct!":"Incorrect!"}}</p>
      </h1>
    </div>
</template>

<script>

import GenerateQuestions from '../assets/QuestionAssembler'

export default {
  name: 'app',
  data: () => {
    return {
      max: 0,
      choice: [],
      correct: [],
      qAnswered: [],
      output: []
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
    // Create the set of problems
    genQuestions() {
      this.output = GenerateQuestions();
      for (let i = 0; i < this.output.length; i++) {
        this.qAnswered.push(false);
        this.correct.push(false);
        this.choice.push("null");
      }
    },
    // Check submission
    checkAnswer(index, answer) {
      if (this.choice[index] == answer) this.correct[index] = true;
      else this.correct[index] = false;
    }
  },
  watch: {

  }
}
</script>

<style scoped>

</style>
