<!-- Singleplayer Session Room -->
<template>
    <div>
      <!-- Mode customization -->

      <div v-if="!freePractice && !timedPractice">
        <!-- Specify number of questions -->
        <div class="num-questions-slider">
          <label for="num-questions">Number of Questions</label><br>
          <input type="range" id="num-questions" name="num-questions" min="4" max="40" value="20" step="4" v-model="qNum">{{qNum}}
          <br><br><br><br>
        </div>
        <!-- Adjust timer for timed practice -->
        <div class="time-selector">
          <label for="question-timer">Timer Duration (minutes)</label><br>
          <input type="range" id="question-timer" name="question-timer" min="1" max="30" value="5" v-model="duration">{{duration}}
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
        <b-button v-if="!timedPractice" pill @click="timedPractice = true">Timed Practice</b-button>
        <div v-if="timedPractice">
          <TimedPractice :qNum="qNum" :duration="duration" :difficultyChoice="difficultyChoice" />
          <!-- Return to practice menu -->
          <b-button pill variant="outline-info" @click="timedPractice = false">End Practice</b-button>
        </div>
      </div>

      <!-- Free-Form Practice -->
      <div v-if="!timedPractice">
        <b-button v-if="!freePractice" pill variant="outline-dark" @click="freePractice = true">Free-Form Practice</b-button>
        <div v-if="freePractice">
          <PracticeArea :chosenDifficulty="chosenDifficulty" />
          <!-- Return to practice menu -->
          <b-button pill variant="outline-info" @click="freePractice = false">End Practice</b-button>
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

</style>