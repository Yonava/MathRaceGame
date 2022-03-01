<template>
  <div>
    <br><br><br><br>
    <center>

      <!-- Input Username -->
      <div v-if="displayUsernamePromp">
        <p>You have been invited to Room #{{ $route.params.roomid }}!</p>
        <h1>Enter A Username:</h1>
        <input v-model="username" type="text" placeholder="Enter Username" />
        <button @click="joinRoom()">Join Room</button>
        <h1 class="error">{{ errorMessage }}</h1>
      </div>

      <!-- Session Room -->
      <div v-else>
        <Room 
        :username="`${username[0].toUpperCase() + username.substring(1)} (Guest#${Math.round(Math.random() * 10000)})`" 
        :room="$route.params.roomid" 
        :host="false" />
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
      username: '',
      displayUsernamePromp: true,
      errorMessage: '',
    }
  },
  methods: {
    joinRoom() {

      this.errorMessage = validateUsername(this.username);

      if (this.errorMessage) return;

      this.host = false;
      this.displayUsernamePromp = !this.displayUsernamePromp;
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