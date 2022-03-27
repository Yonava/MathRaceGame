<template>
  <div class="create-room-container">

    <b-button pill style="width: 35vw;" variant="outline-danger" v-on:click="$parent.switchView('', false)">
      <div>
        <span>Back</span>
        <b-icon-chevron-left style="position: absolute; right: 90%; margin-top: 0.2vh;"></b-icon-chevron-left>
      </div>
    </b-button>

    <!-- Create Rxoom -->
    <div>

        <div class="mt-3">
          <b-button-group size="lg">
            <b-button v-on:click="difficulty = 'Easy'" variant="success">Easy</b-button>
            <b-button v-on:click="difficulty = 'Intermediate'" style="color:white;" variant="warning">Intermediate</b-button>
            <b-button v-on:click="difficulty = 'Hard'" variant="danger">Hard</b-button>
          </b-button-group>
        </div>

      <div class="small-buffer"></div>

      <span class="difficulty-display">{{ difficulty ? 'Difficulty Selected: ': 'Select Difficulty'}}</span>
      <span :style="difficultyStyle" class="difficulty-display">{{ difficulty }}</span>

      <div class="large-buffer"></div>
      
      <center>
        <b-button size="lg" variant="info" @click="createRoom()">Create Room</b-button>
        <br>
        <h1 class="error-message">{{ errorMessage }}</h1>
        <div v-show="creatingRoom">
          <b-icon-arrow-clockwise style="width: 10%; height: 10%;" animation="spin"></b-icon-arrow-clockwise>
        </div>
      </center>

    </div>
  
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

        /* difficulty captures user input, difficultyStyle updates css style of display */
        difficulty: null,
        difficultyStyle: '',

        creatingRoom: false
      }
    },
    props: [
      'username',
    ],
    methods: {
      canRoomBeCreated() {
        if (!this.difficulty) {
          return "Select A Difficulty"
        }

        return ""
      },
      async createRoom() {

        this.creatingRoom = true;
        
        this.errorMessage = this.canRoomBeCreated();
        if (this.errorMessage) return;

        while (this.roomID < 1000) {
          this.roomID = Math.round(Math.random() * 10000);
        }

        const doesRoomIDAlreadyExist = await DatabaseServices.findSessionByRoomID(String(this.roomID));
    
        if (doesRoomIDAlreadyExist !== null) 
          return this.errorMessage = "Problem Encountered While Creating Room, Try One More Time.";
        
        try {
          await DatabaseServices.createNewSession({
            questions: GenerateQuestions(),
            date: new Date,
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
    },
  watch: {
    difficulty() {
      switch (this.difficulty) {
        case 'Easy':
          this.difficultyStyle = 'color: green';
          break;
        case 'Intermediate':
          this.difficultyStyle = 'color: rgb(246,190,0)';
          break;
        case 'Hard':
          this.difficultyStyle = 'color: red';
          break;
        default:
          this.difficulty = '';
          break;
      }
    },
    errorMessage() {
      if (this.errorMessage) {
        this.creatingRoom = false;
      }
    }
  }
}
</script>

<style scoped>
.create-room-container {
  background-color: rgb(255, 255, 255); 
  height: 100vh;
  width: 100vw;
  padding: 2.5%;
  display: flex;
  flex-direction: column;
}

.difficulty-display {
  font-size: 15pt;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
  font-size: 10pt;
}
</style>