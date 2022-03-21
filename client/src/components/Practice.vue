<!-- Singleplayer Session Room -->
<template>
    <div>
      <p>Hello {{ username }}! Welcome to practice mode, where you can hone your skills!</p>
      <button @click="start=true">Start Practice</button>
   
      <div v-if="start">

        <!-- Display question -->
        <vue-mathjax :formula="itemized.equation"></vue-mathjax>
        <!-- Display possible answers -->
        <p class="task"><strong>{{ itemized.task }}</strong></p>
        <b-form-group v-slot="{ ariaDescribedby }" v-for="i in itemized.options" :key="i.id">
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" :name="itemized.equation" :value="i" :disabled="answered">{{i}}</b-form-radio>
        </b-form-group>

        <p v-if="answered"> {{ isCorrect ? "Correct!":"Incorrect!" }} </p>
      </div>
    </div>
</template>

<script>

import GenerateQuestions from '../assets/QuestionAssembler'

export default {
  name: 'app',
  data: () => {
    return {
      start: false,
      selected: '',
      currentPage: 1,
      answered: false,
      isCorrect: false,
      output: [],
      itemized: [],
    }
  },
  props: [
    "username"
  ],
  mounted() {
    // Create the set of problems
    this.output = GenerateQuestions();
    this.itemized = this.output[0];
  },
  created() {

  },
  destroyed() {

  },
  methods: {

  },
  watch: {
    selected() {
      if (this.selected === this.itemized.answer) this.isCorrect = true;
      else this.isCorrect = false;

      if (this.selected != '') {
        this.answered = true;
        this.currentPage++;
        setTimeout(() => {
          this.itemized = this.output[this.currentPage- 1];
          this.selected = '';
          this.answered = false;
        }, 2000);
      }
    }
  }
}
</script>

<style scoped>

</style>