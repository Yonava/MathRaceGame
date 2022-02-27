<template>
  <div>
    <center v-if="menuDisplay">
      <br><br><br>
      <div>
        <h1>Join Group Session</h1>
        <input v-model="username" type="text" placeholder="Enter Username" />
        <input v-model="roomID" placeholder="Enter Room ID" type="number">
        <br>
        <button @click="joinRoom()">Join Room</button>
        <button @click="createRoom()">Create Room</button>
        <br><br>
        <h1>{{ errorMessage }}</h1>
      </div>
      <button v-google-signin-button="clientID" class="google-signin-button"> Continue with Google</button>
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
import bannedWords from '../assets/filteredWords.js'

export default {
  data: () => {
    return {
      clientID: '753802137960-ukun04t2m988p528mghffjqqfkqpare3.apps.googleusercontent.com',
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
    OnGoogleAuthSuccess (idToken) {
      console.log(idToken)
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    },
    createRoom() {

      this.validateUsername();

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

      this.validateUsername();

      if (this.errorMessage) return;

      this.host = false;
      this.menuDisplay = !this.menuDisplay;
    },
    validateUsername() {

      if (!this.username) 
        return this.errorMessage = 'Enter A Username';

      if (this.username.length < 4)
        return this.errorMessage = 'Username Is Too Short'

      for (let i in bannedWords) {
        console.log(bannedWords[i])
        if (this.username.toLowerCase().includes(bannedWords[i])) return this.errorMessage = 'Inappropriate Username';
      }

      let dreamStan = ['innit', 'dream', 'dream smp',
      'notfound', 'georgenotfound', 'badboyhalo']
      
      for (let i in dreamStan) {
        if (this.username.toLowerCase().includes(dreamStan[i])) return this.errorMessage = 'Get Out You Filthy Dream Stan';
      }
      

      return this.errorMessage = '';
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
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>