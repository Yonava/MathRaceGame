<!-- Singleplayer Session Room -->
<template>
    <div class="page">

      <div class="wrap-background"></div>
      <!-- Mode customization -->

      <div class="center" v-if="!freePractice && !timedPractice">
        <!-- Specify number of questions -->
        <div class="num-questions-slider">
          <label for="num-questions">Number of Questions: {{ qNum }}</label><br>
          <input type="range" id="num-questions" name="num-questions" min="4" max="40" value="20" step="1" v-model="qNum">
          <br><br>
        </div>
        <!-- Adjust timer for timed practice -->
        <div class="time-selector">
          <label for="question-timer">Timer Duration (min): {{ duration }}</label><br>
          <input type="range" id="question-timer" name="question-timer" min="1" max="30" value="5" v-model="duration">
          <br><br>
        </div>
        <!-- Adjust number of options for multiple choice -->
        <div class="num-options-slider">
          <label for="num-options">Number of Choices: {{ numChoices }} </label><br>
          <input type="range" id="num-options" name="num-options" min="2" max="10" value="4" step="1" v-model="numChoices">
          <br><br>
        </div>
        <!-- Difficulty Selection -->
        <div class="difficulty-selection">
          <center><label> Difficulty </label></center>
          <b-form-select v-model="difficultyChoice" :options="difficultyOptions"></b-form-select>
          <br><br><br><br><br><br>
        </div>
      </div>

      <div class="button-parent">
        <!-- Timed Practice -->
        <div class="inline-button" v-if="!freePractice">
          <b-button v-if="!timedPractice" pill @click="timedPractice = true">Timed Practice</b-button>
          <div v-if="timedPractice">
            <TimedPractice :qNum="qNum" :duration="duration" :difficultyChoice="difficultyChoice" :numChoices="numChoices" />
            <!-- Return to practice menu -->
            <b-button pill variant="outline-info" @click="timedPractice = false">End Practice</b-button>
          </div>
        </div>
        <!-- Free-Form Practice -->
        <div class="inline-button" v-if="!timedPractice">
          <b-button v-if="!freePractice" pill variant="outline-dark" @click="freePractice = true">Free-Form Practice</b-button>
        
          <div v-if="freePractice">
            <PracticeArea :chosenDifficulty="chosenDifficulty" :numChoices="numChoices" />
            <!-- Return to practice menu -->
            <b-button pill variant="outline-info" @click="freePractice = false">End Practice</b-button>
          </div>
        </div>
      </div>
      
    </div>
</template>

<script>

import PracticeArea from './PracticeArea.vue'
import TimedPractice from './TimedPractice.vue'

export default {
  name: 'app',
  data: () => {
    return {
      // Whether or not to enable various practice modes
      freePractice: false,
      timedPractice: false,
      numChoices: 4,
      //Number of questions to create (for timed practice)
      qNum: 20,
      // Length of timer in minutes (for timed practice)
      duration: 5,
      // Levels of difficulty and the types of questions to make for each
      difficulty: {
            easy: [500, 250, 250, 10],
            normal: [250, 250, 250, 250],
            hard: [50, 50, 50, 200, 200, 200],
            extreme: [5, 5, 5, 500, 300, 300]
      },
      difficultyOptions: ["Easy", "Normal", "Hard", "Extreme"],
      difficultyChoice: "Normal",
      chosenDifficulty: [250, 250, 250, 250]
    }
  },
  components: {
    PracticeArea,
    TimedPractice
  },
  props: [
    "username"
  ],
  mounted() {

  },
  created() {

  },
  destroyed() {

  },
  methods: {
    
  },
  watch: {
    difficultyChoice() {
      // Adjust questions based on difficulty choice
      switch(this.difficultyChoice) {
          case "Easy":
            this.chosenDifficulty = this.difficulty.easy;
            break;
          case "Normal":
            this.chosenDifficulty = this.difficulty.normal;
            break;
          case "Hard":
            this.chosenDifficulty = this.difficulty.hard;
            break;
          case "Extreme":
            this.chosenDifficulty = this.difficulty.extreme;
            break;
      }
    }
  }
}
</script>

<style scoped>

.page {
  margin: 0;
  position: absolute;
  top: 30%;
  left: 50%;
  -ms-transform: translate(-50%, -30%);
  transform: translate(-50%, -30%);
}

.wrap-background {
  width: 100vw;
  height: 100vh;
  z-index: -1;
  position: fixed;
}

.button-parent {
  text-align: center;
}

.inline-button {
  display: inline-block;
  padding-left: 10px;
  padding-bottom:5px;
}

/* Font for text */
label {
  font-family: Verdana, Arial, sans-serif;
}

/* A modified version of the code on https://codepen.io/shashank_coder/pen/jOqxOpK for customizing the sliders */
#num-questions, #question-timer, #num-options {
  width: 200px;
  height: 15px;
  -webkit-appearance: none;
  /* background: #111; */
  outline: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 1);
}

#num-questions::-webkit-slider-thumb, #question-timer::-webkit-slider-thumb, #num-options::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #333;
  cursor: pointer;
  border: 4px solid #333;
  box-shadow: -407px 0 0 400px rgba(41, 37, 37, 0.781);
}

</style>