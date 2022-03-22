<template>
  <div>

    <!-- Join Room -->
    <div v-if="joiningRoom">
      <input v-model="roomidInput" placeholder="Enter Room ID" type="number">
      <div v-show="roomidInput.length === 4">
        <b-button v-on:click="$router.push(`/go/${roomidInput}`)" variant="success">Go!</b-button>
        <b-button variant="danger" v-on:click="$parent.deleteSession()">Delete Session</b-button>
      </div>
    </div>

    <!-- Create Rxoom -->
    <div v-show="!joiningRoom">
      <h1>Create Group Session</h1>
      <input type="text" v-model="difficulty" placeholder="enter difficulty">
      <br>
      <button @click="createRoom()">Create Room</button>
      <br>
      <h1 class="error">{{ errorMessage }}</h1>
      <br>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officia voluptatum neque adipisci perspiciatis dolorem ipsum totam labore, delectus accusantium aliquam necessitatibus voluptate sed iusto facere dolores! Saepe beatae, sequi, asperiores odit eos eaque, obcaecati modi fugit officia labore molestiae? Ullam cumque architecto minus fugit dolor non, fugiat necessitatibus, accusamus porro recusandae unde? Placeat ab, porro hic beatae enim quos at pariatur tempore reiciendis nihil. Aperiam perferendis voluptate ducimus tempore? Error omnis non rerum doloremque expedita animi exercitationem impedit officia nesciunt architecto ipsa recusandae in, quod culpa velit inventore, nulla, laboriosam sequi consectetur repellendus. Tempore eos dolorem repudiandae quasi velit!</p>
    </div>

    <b-button variant="outline-danger" v-on:click="$parent.switchView('', false)">Back</b-button>

  </div>
</template>

<script>

import GenerateQuestions from '../assets/QuestionAssembler'
import DatabaseServices from '../DatabaseServices.js'

export default {
    data: () => {
      return {
        sessionDeletedMsg: false,
        roomidInput: '',
        roomID: 0,
        errorMessage: '',
        difficulty: 'Impossible'
      }
    },
    props: [
      'joiningRoom',
      'username',
    ],
    methods: {
        async createRoom() {
          
          while (this.roomID < 1000) {
            this.roomID = Math.round(Math.random() * 10000);
          }

          const doesRoomIDAlreadyExist = await DatabaseServices.findSessionByRoomID(String(this.roomID));
      
          if (doesRoomIDAlreadyExist !== null) 
            return this.errorMessage = "Problem Encountered While Creating Room, Try One More Time.";  

          try {
              console.log(this.username)
              await DatabaseServices.createNewSession({
                questions: GenerateQuestions(),
                date: Date.now(),
                roomid: String(this.roomID),
                host: this.username,
                difficulty: this.difficulty
              });
          } catch (error) {
              this.errorMessage = error;
              return;
          }
          
          const confirmedSessionObject = await DatabaseServices.findSessionByRoomID(String(this.roomID));
          if (confirmedSessionObject === null) 
            return this.errorMessage = "An Issue Was Encountered Whilst Connecting to Our Servers.";

          // Execute Redirect to Room Once Everything Has Been Validated
          this.$router.push({ name: 'Room', params: { sessionObject: {
            questions: confirmedSessionObject.questions,
            date: confirmedSessionObject.date,
            roomid: confirmedSessionObject.roomid,
            host: confirmedSessionObject.host,
            difficulty: confirmedSessionObject.difficulty,
            clientName: this.username
          }}});
      }
    }
}
</script>

<style scoped>
/* gets rid of up and down arrows in input */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
h1.error {
    font-size: x-small;
    font-weight: bolder;
    color: red;
}
</style>