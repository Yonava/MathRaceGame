<template>
  <div>

    <div v-if="sessionInfo === undefined" class="center">
      <p style="font-size: 20pt; font-weight: bold; margin-top: 5vh;">Loading Session...</p>
      <b-icon-arrow-clockwise style="width: 10%; height: 10%;" animation="spin"></b-icon-arrow-clockwise>
    </div>

    <!-- Session Found Error -->
    <div v-else-if="sessionInfo === null" class="center">
      <p style="font-size: 20pt; font-weight: bold; margin-top: 5vh;">Session Not Found 🙁</p>
      <p><b>[Unable To Retrieve Session {{ $route.params.roomid }}]</b></p>
    </div>

    <!-- Input Username -->
    <div v-else class="center" style="padding: 5%;">

      <center>
        <p>Joining Room <b style="color: #008b8b">{{ sessionInfo.roomid }}</b>
        Created <b style="color: #008b8b">{{ sessionInfo.date }}</b>
        By <b style="color: #008b8b">{{ sessionInfo.host }}</b></p>
      </center>

      <b-input-group prepend="Username" class="mt-3">
        <b-form-input v-model="username"></b-form-input>
        <b-input-group-append>
          <b-button :variant="errorMessage ? 'danger':'success'"></b-button>
        </b-input-group-append>
      </b-input-group>

      <center>
        <p class="error-msg-transition" :style="errorMessage ? 'color:red;transform:translateY(0%)':'color:rgba(0,0,0,0);transform:translateY(50%)'">
          {{  errorMessage ? errorMessage:'Resolved'}}
        </p>
      </center>

      <div class="large-buffer"></div>

      <b-button v-on:click="joinRoom(true)" variant="success" :disabled="errorMessage ? true:false">Jump To Room</b-button>

    </div>

    <div class="center">
      <b-button class="back-btn" variant="outline-danger" @click="$router.push('/')">Back to Main Menu</b-button>
    </div>

  </div>
</template>

<script>

import DatabaseServices from '../DatabaseServices.js';
import validateUsername from '../functionality/usernameValidation.js'

export default {
  data: () => {
    return {
      username: '',
      errorMessage: 'Enter A Username To Continue',
      sessionInfo: undefined
    }
  },
  created() {
    fetch(`https://math-race-game.herokuapp.com/api/sessions/${this.$route.params.roomid}`)
      .then(response => response.json())
      .then(data => {
        this.sessionInfo = data;
        // attempts to automatically join room with cached username
        if (localStorage?.username !== undefined) {
          this.username = localStorage.username;
          this.joinRoom();
        }
      });
  },
  methods: {
    async joinRoom(isGuest = false) {

      if (isGuest) {

        const doesUserExist = await DatabaseServices.findUser(this.username);
        if (doesUserExist) return this.errorMessage = 'This Username Has Been Taken By Another Account';
      }

      this.$router.push({ name: 'Room', params: { sessionObject: {
        questions: this.sessionInfo.questions,
        date: this.sessionInfo.date,
        roomid: this.sessionInfo.roomid,
        host: this.sessionInfo.host,
        difficulty: this.sessionInfo.difficulty,
        clientName: this.username
      }}});
    }
  },
  watch: {
    username() {

      this.username = this.username.trim();
      this.errorMessage = validateUsername(this.username);
    }
  }
}
</script>


<style scoped>

.error-msg-transition {
  transition: 300ms;
  font-size: 11pt;
  font-weight: bold;
  padding: 0%;
  margin: 0%;
} 

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

.back-btn {
  position: fixed;
  bottom: 0;
  margin-bottom: 2vh;
}


</style>