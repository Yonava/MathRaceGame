<!-- Singleplayer Session Room -->
<template>
    <div>
      <p>Hello {{ username }}! Welcome to practice mode, where you can hone your skills!</p>

      <!-- Mode customization -->

      <div v-if="!freePractice && !timedPractice">
        <!-- Specify number of questions -->
        <div class="num-questions-slider">
          <label for="num-questions">Number of Questions</label><br>
          <input type="range" id="num-questions" name="num-questions" min="5" max="30" value="20" v-model="qNum">{{qNum}}
          <br><br><br><br>
        </div>
        <!-- Adjust timer for timed practice -->
        <div class="time-selector">
          <label for="question-timer">Timer Duration (minutes)</label><br>
          <input type="range" id="question-timer" name="question-timer" min="0" max="5" value="2" v-model="duration">{{duration}}
          <br><br><br><br>
        </div>
        <!-- Difficulty Selection -->
        <div class="difficulty-selection">
          <b-form-select v-model="difficultyChoice" :options="difficultyOptions"></b-form-select>
          <br><br><br><br>
        </div>
      </div>

      <!-- Timed Practice -->
      <div v-if="!freePractice">
        <b-button pill @click="timedPractice = true, timedQuestions()">Timed Practice</b-button>
        <div v-if="timedPractice">
          <b-badge pill variant="primary" id="Timer"> {{duration}}:00 </b-badge>
          <!-- Display question -->
          <vue-mathjax :formula="itemized.equation"></vue-mathjax>
          <!-- Display possible answers -->
          <p class="task"><strong>{{ itemized.task }}</strong></p>
          <b-form-group v-slot="{ ariaDescribedby }" v-for="i in itemized.options" :key="i.id">
            <b-form-radio
              v-model="selected"
              :aria-describedby="ariaDescribedby"
              :name="itemized.equation" :value="i"
              :disabled="answered"
            >{{i}}</b-form-radio>
          </b-form-group>
          <!-- Display if your answer is correct -->
          <p v-if="answered"> {{ isCorrect ? "Correct!":"Incorrect!" }} </p>
          <br><br><br>
          <!-- Display if race is over or not -->
          <p class="practice-over" v-if="raceEnd"> {{ raceComplete ? "RACE COMPLETE!" : " RACE INCOMPLETE!" }} </p>
          <!-- Return to practice menu -->
          <b-button pill variant="outline-info" @click="timedPractice = false">End Practice</b-button>
        </div>
      </div>

      <!-- Free-Form Practice -->
      <div v-if="!timedPractice">
        <b-button pill variant="outline-dark" @click="freePractice = true">Free-Form Practice</b-button>
        <div v-if="freePractice">
          <!-- Display question -->
          <vue-mathjax :formula="itemized.equation"></vue-mathjax>
          <!-- Display possible answers -->
          <p class="task"><strong>{{ itemized.task }}</strong></p>
          <b-form-group v-slot="{ ariaDescribedby }" v-for="i in itemized.options" :key="i.id">
            <b-form-radio
              v-model="selected"
              :aria-describedby="ariaDescribedby"
              :name="itemized.equation" :value="i"
              :disabled="answered || raceEnd"
            >{{i}}</b-form-radio>
          </b-form-group>
          <!-- Display if your answer is correct -->
          <p v-if="answered"> {{ isCorrect ? "Correct!":"Incorrect!" }} </p>
          <br><br><br>
          <!-- Return to practice menu -->
          <b-button pill variant="outline-info" @click="freePractice = false">End Practice</b-button>
        </div>
      </div>
    </div>
</template>

<script>

import GenerateQuestions from '../assets/QuestionAssembler'
import shuffle from "../functionality/shuffleArray"

export default {
  name: 'app',
  data: () => {
    return {
      // Whether or not to enable various practice modes
      freePractice: false,
      timedPractice: false,
      //Number of questions to create (for timed practice)
      qNum: 20,
      // Length of timer in minutes (for timed practice)
      duration: 2,
      //Whether or not the race is over
      raceEnd: false,
      //Whether or not every question was answered
      raceComplete: false,
      // Levels of difficulty and the types of questions to make for each
      difficultyOptions: ["Easy", "Normal", "Hard", "Impossible"],
      difficulty: {
        easy: [500, 250, 250, 10],
        normal: [250, 250, 250, 250],
        hard: [50, 50, 50, 500],
        impossible: [5, 5, 5, 1000]
      },
      difficultyChoice: "Normal",
      chosenDifficulty: [],
      // Whether or not an answer has been selected and question has been answered
      selected: '',
      answered: false,
      // For changing questions
      currentPage: 1,
      //Whether or not the answer is correct
      isCorrect: false,
      // The list of questions
      output: [],
      //The current question
      itemized: [],
    }
  },
  props: [
    "username"
  ],
  mounted() {
    // Create the set of problems, shuffle randomly
    this.output = GenerateQuestions(this.difficulty.normal);
    shuffle(this.output);
    this.itemized = this.output[0];
    // Ensure their are no timers running
    clearInterval(this.timedQuestions());
  },
  created() {

  },
  destroyed() {

  },
  methods: {
    timedQuestions() {
      this.output = GenerateQuestions([5, 5, 5, 5]);
      shuffle(this.output);
      if (this.duration === 0) return; // Exit if no timer needed
      let minutes = this.duration - 1; // Start at (m - 1):59
      let seconds = 60; // Convert into seconds

      // Initial time before countdown
      // document.getElementById('Timer').innerHTML = `${this.duration}:00`;

      setInterval(() => {
        seconds--;
        if (seconds >= 10) document.getElementById('Timer').innerHTML = `${minutes}:${seconds}`;
        else document.getElementById('Timer').innerHTML = `${minutes}:0${seconds}`;
        
        // Exit when timer done
        if (seconds === 0 && minutes === 0) {
          this.raceEnd = true;
          clearInterval(this.timedQuestions());
        }
        // Reset seconds, count down minutes
        if (seconds === 0) {
          seconds = 60;
          minutes--;
        }
      }, 1000);
    },
    // For printing time
    // formatTime(minutes, seconds) {
    //   let final = "";

    //   if (minutes >= 10) final += String(minutes);
    //   else final += `0${minutes}`;

    //   final += ":";

    //   if (seconds >= 10) final += String(seconds);
    //   else final += `0${seconds}`;

    //   return final;
    // }
  },
  watch: {
    // When an answer is selected, check if it is correct or not, switch questions
    selected() {
      if (this.selected === this.itemized.answer) this.isCorrect = true;
      else this.isCorrect = false;

      // Switch questions
      if (this.selected != '') {
        this.answered = true;
        this.currentPage++;
        setTimeout(() => {
          this.output.splice(0, 1); // Remove used questions
          this.itemized = this.output[0];
          this.selected = '';
          this.answered = false;
        }, 1000);
      }
    },
    output() {
      // Replenish and shuffle questions
      if (this.output.length < 2) {
        let temp = GenerateQuestions(this.chosenDifficulty);
        this.output.concat(temp);
        shuffle(this.output);
      }
    },
    difficultyChoice() {
      // Adjust questions based on difficulty choice
      switch(this.difficultyChoice) {
        case "Easy":
          this.chosenDifficulty = this.difficulty.easy
          this.output = GenerateQuestions(this.chosenDifficulty);
          shuffle(this.output);
          break;
        case "Normal":
          this.chosenDifficulty = this.difficulty.normal
          this.output = GenerateQuestions(this.chosenDifficulty);
          shuffle(this.output);
          break;
        case "Hard":
          this.chosenDifficulty = this.difficulty.hard
          this.output = GenerateQuestions(this.chosenDifficulty);
          shuffle(this.output);
          break;
        case "Impossible":
          this.chosenDifficulty = this.difficulty.impossible
          this.output = GenerateQuestions(this.chosenDifficulty);
          shuffle(this.output);
          break;
      }
    },
    // Ensure state variables are properly reset upon entering/exiting practice modes
    freePractice() {
      this.selected =  '';
      this.answered = false;
      this.currentPage = 1;
      this.isCorrect = false;
    },
    timedPractice() {
      this.selected =  '';
      this.answered = false;
      this.currentPage = 1;
      this.isCorrect = false;
    }
  }
}
</script>

<style scoped>

</style>