<template>
  <div>

    <h1>Create Group Session</h1>

    <!-- Create Rxoom -->
    <div>
      <input type="text" v-model="difficulty" placeholder="enter difficulty">
      <br>
      <button @click="createRoom()">Create Room</button>
      <br>
      <h1 class="error">{{ errorMessage }}</h1>
    </div>

    <center>
      <b-button variant="outline-danger" v-on:click="$parent.switchView('', false)">Back</b-button>
    </center>

      <!-- Allows Transition To Render Properly -->
      <p style="opacity:0">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, iste, fugit tempora aliquam nisi inventore vero officia voluptate consequatur earum nesciunt rerum blanditiis perferendis molestiae, 
        reprehenderit fugiat delectus quod tempore soluta quo? Modi officiis architecto harum aut enim eaque doloremque ipsum tenetur quidem et corporis quos quas ex error dolor quisquam esse, officia maiores asperiores earum! Rem perferendis, dolore iste qui architecto cum facilis tempora vitae minima, numquam quisquam ullam dignissimos mollitia a culpa ipsum cupiditate maxime, unde quis reprehenderit molestias fugit ad magnam. Molestias quod accusantium consequuntur enim! Veritatis ducimus in vel cumque eligendi officiis aspernatur doloremque voluptatem molestias.
      </p>

  </div>
</template>

<script>

import GenerateQuestions from '../assets/QuestionAssembler'
import DatabaseServices from '../DatabaseServices.js'

export default {
    data: () => {
      return {
        
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