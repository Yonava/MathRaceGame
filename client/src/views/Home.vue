<template>
  <div class="home">
    <center v-if="menuDisplay">
      <br><br><br>
      <div>
        <h1>Join Group Session</h1>
        <input v-model="username" type="text" placeholder="Enter Username" />
        <input v-model="roomID" placeholder="Enter Room ID" type="number">
        <br>
        <button @click="menuDisplay = !menuDisplay">Join Room</button>
        <button @click="createRoom()">Create Room</button>
      </div>
    </center>

    <!-- Session Room -->
    <div v-else>
      <Room 
      v-bind:username="`${username[0].toUpperCase() + username.substring(1)} (Guest#${Math.round(Math.random() * 10000)})`" 
      v-bind:room="roomID" />
    </div>

  </div>
</template>

<script>

import Room from '../components/Room.vue'

export default {
  data: () => {
    return {
      menuDisplay: true,
      username: '',
      roomID: '',
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
      this.roomID = 0;
      while (this.roomID < 1000) {
        this.roomID = Math.round(Math.random() * 10000);
      }
      this.menuDisplay = !this.menuDisplay;
      this.roomID = String(this.roomID);
    },
  },
  watch: {

  }

}
</script>
