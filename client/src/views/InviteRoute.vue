<template>
  <div>
    <br><br><br><br>
    <center>

      <div v-if="loading">
        <h1>Loading Session...</h1>
      </div>

      <!-- Session Found Error -->
      <div v-else-if="!wasSessionFound">
        <h1>
          Session Not Found,
          Double Check You Got The Correct Invite Link
        </h1>
        <br>
        <p><b>[Session #{{ $route.params.roomid }}]</b></p>
      </div>

      <div v-else>

        <!-- Input Username -->
        <div v-if="displayUsernamePromp">
          <p>You have been invited to Room #{{ $route.params.roomid }}, Created on {{ sessionInfo.date }}!</p>
          <h1>Enter A Username:</h1>
          <input v-model="username" type="text" placeholder="Enter Username" />
          <button @click="joinRoom()">Join Room</button>
          <h1 class="error">{{ errorMessage }}</h1>
          <p style="font-size: 10pt; margin-top: 20vh;">
            {{ sessionInfo }}
          </p>
        </div>

        <!-- Session Room -->
        <div v-else>
          <Room 
          :username="`${username[0].toUpperCase() + username.substring(1)} (Guest#${Math.round(Math.random() * 10000)})`" 
          :room="$route.params.roomid" 
          :host="false" />
        </div>

      </div>

    </center>

  </div>
</template>

<script>

import validateUsername from '../functionality/usernameValidation.js'
import Room from '../components/Room.vue'

export default {
  components: {
    Room
  },
  data: () => {
    return {
      loading: true,
      username: '',
      displayUsernamePromp: true,
      errorMessage: '',
      sessionInfo: null,
      wasSessionFound: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
      if (this.sessionInfo !== null) this.wasSessionFound = true 
      console.log(this.sessionInfo)
    }, 1250)
  },
  created() {
    fetch(`https://math-race-game.herokuapp.com/api/sessions/${this.$route.params.roomid}`)
      .then(response => response.json())
      .then(data => {
        this.sessionInfo = data;
      });
  },
  methods: {
    joinRoom() {

      console.log(this.sessionInfo)
      this.errorMessage = validateUsername(this.username);

      if (this.errorMessage) return;

      this.host = false;
      this.displayUsernamePromp = false;
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