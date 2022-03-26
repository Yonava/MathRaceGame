<template>
  <div>

    <div v-if="sessionInfo === undefined">
      <p style="font-size: 14pt; font-weight: bold;">Loading Session...</p>
      <b-icon-arrow-clockwise style="width: 10%; height: 10%;" animation="spin"></b-icon-arrow-clockwise>
    </div>

    <!-- Session Found Error -->
    <div v-else-if="sessionInfo === null">
      <h3>Session Not Found 🙁</h3>
      <br>
      <p><b>[Unable To Retrieve Session {{ $route.params.roomid }}]</b></p>
    </div>

    <!-- Input Username -->
    <div v-else>
      <p>Join Room <b>{{ sessionInfo.roomid }}</b>, Created on <b>{{ sessionInfo.date }}</b></p>
      <h1>Enter A Username:</h1>
      <b-input-group style="padding: 2.5%" prepend="Username" class="mt-3">
        <b-form-input v-model="username"></b-form-input>
      </b-input-group>
      <button @click="joinRoom()">Join Room</button>
      <h1 class="error">{{ errorMessage }}</h1>
    </div>

    <b-button variant="outline-danger" @click="$router.push('/')">Return to Main Menu</b-button>


  </div>
</template>

<script>

import validateUsername from '../functionality/usernameValidation.js'

export default {
  data: () => {
    return {
      username: '',
      errorMessage: '',
      sessionInfo: undefined,
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

        this.sessionInfo.date = this.sessionInfo.date.getMonth()

      });
  },
  methods: {
    joinRoom() {
      
      this.errorMessage = validateUsername(this.username.trim());

      // checks if the session specifies a host, and if so, is player username the same as the hosts username
      if (this.sessionInfo?.host !== undefined) {
        if (this.username.trim().toLowerCase() === this.sessionInfo.host.toLowerCase()) {
          this.errorMessage =  'Oop, We Notice That Your Username Is The Same As The Host of This Session. Please Enter A New Username.';
        }
      }

      if (this.errorMessage) return;

      this.$router.push({ name: 'Room', params: { sessionObject: {
        questions: this.sessionInfo.questions,
        date: this.sessionInfo.date,
        roomid: this.sessionInfo.roomid,
        host: this.sessionInfo.host,
        difficulty: this.sessionInfo.difficulty,
        clientName: this.username
      }}});
    }
  }
}
</script>


<style scoped>
 * {
   margin: 5px;
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
</style>