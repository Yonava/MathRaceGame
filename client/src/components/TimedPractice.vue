<template>
    <div>
        <b-badge pill variant="primary" id="Timer"> {{minutes + 1}}:00 </b-badge>
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

import GenerateQuestions from '../assets/QuestionAssembler'
import shuffle from '../functionality/shuffleArray'

export default {
    data: () => {
        return {
            // Selection of answers and if question is answered
            selected: '',
            answered: false,
            numQuestions: 0,
            numCorrect: 0,
            // Determine if race is over
            raceEnd: false,
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
        "duration"
    ],
    mounted() {
        this.output = GenerateQuestions();
        shuffle(this.output);
        this.itemized = this.output[0];
        this.numQuestions = this.output.length;
    },
    created() {
        this.minutes = this.duration - 1;
        this.timeTracker = setInterval(() => {
            let minStr = "";
            let secStr = "";

            if (this.minutes < 10) minStr = `0${this.minutes}`;
            else minStr = `${this.minutes}`;

            if (this.seconds < 10) secStr = `0${this.seconds}`;
            else secStr = `${this.seconds}`;

            document.getElementById('Timer').innerHTML = `${minStr}:${secStr}`;
            
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