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
      <div v-if="modeDisplay">
        <button @click="modeDisplay = !modeDisplay, gametype = 1">Practice Mode</button> <!-- Singleplayer -->
        <br><br><br>
        <button @click="modeDisplay = !modeDisplay, gametype = 2">Multiplayer Mode</button> <!-- Multiplayer -->
      </div>
      <div v-else>
        <Room 
        :username="`${username[0].toUpperCase() + username.substring(1)} (Guest#${Math.round(Math.random() * 10000)})`" 
        :room="roomID" 
        :host="host" /> <!-- Enable chosen component -->
      </div>
    </div>

  </div>
</template>

<script>

import Practice from '../components/Practice'
import Room from '../components/Room.vue'
import validateUsername from '../functionality/usernameValidation.js'

export default {
  data: () => {
    return {
      menuDisplay: true,
      modeDisplay: true,
      username: '',
      roomID: '',
      host: false,
      errorMessage: '',
      gametype: 0
    }
  },
  components: {
    Practice,
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
    // Choose whether to enable practice mode or multiplayer mode
    computedComponent(gametype) {
      if(gametype == 1) {
        return Practice;
      }
      else if(gametype == 2) {
        username="`${username[0].toUpperCase() + username.substring(1)} (Guest#${Math.round(Math.random() * 10000000)})`
        return Room;
      }
    }
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
