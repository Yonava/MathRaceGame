<template>
    <div>
        <b-badge pill variant="primary" id="Timer"> {{minutes + 1}}:00 </b-badge>
        <br><br>
        <!-- Display question -->
        <p v-if="render" class="task"><strong>{{ itemized.task }}</strong></p>
        <vue-mathjax v-if="render" :formula="itemized.equation"></vue-mathjax>
        <br>
        <!-- Display possible answers -->
        <b-form-group v-slot="{ ariaDescribedby }" v-for="i in itemized.options" :key="i.id">
        <b-form-radio
            v-if="render"
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            :name="itemized.equation" :value="i"
            :disabled="answered"
        >{{i}}</b-form-radio>
        </b-form-group>
        <!-- Display if your answer is correct -->
        <p v-if="answered && !raceEnd"> {{ isCorrect ? "Correct!":"Incorrect!" }} </p>
        <p v-if="raceEnd">
            {{ raceEnd && answered ? "Race Complete!":"Race Incomplete!" }}
            <br>
            Completed {{ numQuestions - output.length }} out of {{ numQuestions }} questions in {{ timeTaken() }} minutes!
            <br>
            Number of questions correct: {{ numCorrect }}
        </p>
        <br><br><br>
    </div>
</template>

<script>

import GenerateQuestions from '../functionality/QuestionAssembler'
import shuffle from '../functionality/shuffleArray'
import sumArray from '../functionality/sumArray'

export default {
    data: () => {
        return {
            // Whether or not to render the questions (for loading Mathjax)
            render: false,
            // Points given by completing questions in the race
            points: 0,
            // Selection of answers and if question is answered
            selected: '',
            answered: false,
            numQuestions: 0,
            numCorrect: 0,
            // Determine if race is over
            raceEnd: false,
            // For creating questions
            chosenDifficulty: [],
            // For changing questions
            currentPage: 1,
            // Whether or not chosen answer is correct
            isCorrect: false,
            // For the timer
            minutes: 0,
            seconds: 59,
            // For questions
            output: [],
            itemized: []
        };
    },
    props: [
        "qNum",
        "duration",
        "difficultyChoice"
    ],
    mounted() {
        let half = this.qNum / 2;
        let quarter = this.qNum / 4;
        let third = this.qNum / 3;
        let sixth = this.qNum / 6;
        let eigth = this.qNum / 8;
        // Adjust questions based on difficulty choice
        switch(this.difficultyChoice) {
          case "Easy":
            this.chosenDifficulty = [half, quarter, eigth, eigth];
            break;
          case "Normal":
            this.chosenDifficulty = [quarter, quarter, quarter, quarter];
            break;
          case "Hard":
            this.chosenDifficulty = [sixth / 2, sixth / 2, sixth, third, third / 2, third / 2];
            break;
          case "Extreme":
            this.chosenDifficulty = [eigth / 2, eigth / 2, eigth, 2 * eigth, 2 * eigth, 2 * eigth];
            break;
        }

        for (let i = 0; i < this.chosenDifficulty.length; i++) {
            if (this.chosenDifficulty[i] % 1 != 0) {
                this.chosenDifficulty[i] = Math.floor(this.chosenDifficulty[i]);
            }
        }

        // Ensure correct number of elements
        let sum = sumArray(this.chosenDifficulty);
        // Take excess from Algebra questions
        if (sum > this.qNum) {
            this.chosenDifficulty[3] -= (sum - this.qNum);
        }
        // Add extra to level 3 questions
        else if (sum < this.qNum) {
            this.chosenDifficulty[2] += (this.qNum - sum);
        }

        this.output = GenerateQuestions(this.chosenDifficulty);
        shuffle(this.output);
        this.itemized = this.output[0];
        this.numQuestions = this.output.length;
    },
    created() {
        setTimeout(() => {
            this.render = true;
        }, 100);

        this.minutes = this.duration - 1;
        this.timeTracker = setInterval(() => {
            let string = "";

            if (this.minutes < 10) string += `0${this.minutes}`;
            else string += `${this.minutes}`;

            string += ":";

            if (this.seconds < 10) string += `0${this.seconds}`;
            else string += `${this.seconds}`;

            document.getElementById('Timer').innerHTML = string;
            
            this.seconds--;
        }, 1000);
    },
    destroyed() {
        clearInterval(this.timeTracker);
    },
    methods: {
        timeTaken() {
            return (this.duration - (this.minutes + (this.seconds / 60))).toFixed(2);
        }
    },
    watch: {
        // When an answer is selected, check if it is correct or not, switch questions
        selected() {
            if (this.selected === this.itemized.answer) {
                this.isCorrect = true;
                this.numCorrect++;
                this.points += this.output[0].value;
            }
            else this.isCorrect = false;

            // Switch questions
            if (this.selected != '') {
                this.answered = true;
                this.currentPage++;

                setTimeout(() => {
                    this.output.splice(0, 1); // Remove used questions
                    if (this.output.length == 0) this.raceEnd = true;
                    else this.itemized = this.output[0];
                    this.selected = '';
                    this.answered = false;
                }, 1000);
            }
        },
        seconds() {
            if (this.seconds === 0) {
                if (this.minutes === 0) {
                    this.raceEnd = true;
                    clearInterval(this.timeTracker);
                    document.getElementById('Timer').innerHTML = "00:00";
                }
                else {
                    this.minutes--;
                    this.seconds = 59;
                }
            }
        },
        raceEnd() {
            this.answered = true;
            clearInterval(this.timeTracker);
        }
    }
}

</script>

<style scoped>
</style>