<template>
  <div>
    <center v-if="menuDisplay">
      <br><br><br>
      <div>
        <h2>Sessions Accessed Through {{ $parent.throughApp ? "App":"Browser"}}</h2>
        <h1>Join Group Session</h1>
        <input v-model="username" type="text" placeholder="Enter Username" />
        <input v-model="roomID" placeholder="Enter Room ID" type="number">
        <br>
        <button @click="joinRoom()">Join Room</button>
        <button @click="createRoom()">Create Room</button>
        <br><br>
        <h1>{{ errorMessage }}</h1>
      </div>
    </center>

    <!-- Session Room -->
    <div v-else>
      <Room 
      v-bind:username="`${username[0].toUpperCase() + username.substring(1)} (Guest#${Math.round(Math.random() * 10000)})`" 
      v-bind:room="roomID" 
      v-bind:host="host" />
    </div>

  </div>
</template>

<script>

import Room from '../components/Room.vue'
import validateUsername from '../functionality/usernameValidation.js'

export default {
  data: () => {
    return {
      menuDisplay: true,
      username: '',
      roomID: '',
      host: false,
      errorMessage: ''
    }
  },
  components: {
    Room,
  },
  mounted() {

  },
  created() {

  },
  destroyed() {

  },
  methods: {
    createRoom() {

      this.errorMessage = validateUsername(this.username);
   
      if (this.errorMessage) return;

      this.roomID = 0;

      while (this.roomID < 1000) {
        this.roomID = Math.round(Math.random() * 10000);
      }

      this.host = true;
      this.menuDisplay = !this.menuDisplay;
      this.roomID = String(this.roomID);

    },
    joinRoom() {

      this.errorMessage = validateUsername(this.username);

      if (this.errorMessage) return;

      this.host = false;
      this.menuDisplay = !this.menuDisplay;
    },
  },
  watch: {

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
</style>
