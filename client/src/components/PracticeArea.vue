<template>
    <div class="practice-area">
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
        <p v-if="answered"> {{ isCorrect ? "Correct!":"Incorrect!" }} </p>
        <br><br><br>
    </div>
</template>

<script>

import GenerateQuestions from '../functionality/QuestionAssembler'
import shuffle from '../functionality/shuffleArray'

export default {
    data: () => {
      return {
        // Whether to render the questions (for loading Mathjax)
        render: false,
        // Selection of answers and if question is answered
        selected: '',
        answered: false,
        // For changing questions
        currentPage: 1,
        // Whether or not chosen answer is correct
        isCorrect: false,
        // For questions
        output: [],
        itemized: []
      };
    },
    props: [
        "chosenDifficulty",
        "numChoices"
    ],
    mounted() {
        // Create questions
        this.output = GenerateQuestions(this.chosenDifficulty, this.numChoices);
        shuffle(this.output);
        this.itemized = this.output[0];
    },
    created() {
        setTimeout(() => {
            this.render = true;
        }, 100);
    },
    methods: {

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
                let temp = GenerateQuestions(this.chosenDifficulty, this.numChoices);
                this.output.concat(temp);
                shuffle(this.output);
            }
        }
    }
};

</script>

<style scoped>

</style>