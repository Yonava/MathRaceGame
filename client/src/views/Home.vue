<template>
  <div class="home">
    <center v-if="menuDisplay">
      <br><br><br>
      <div>
        <h1>Join Group Session</h1>
        <input v-model="username" type="text" placeholder="Enter Username" @keyup.enter="menuDisplay = false" />
        <button @click="menuDisplay = !menuDisplay">Connect</button>
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
        <component :is="computedComponent(gametype)" :username="username" /> <!-- Enable chosen component -->
      </div>
    </div>

  </div>
</template>

<script>

import Practice from '../components/Practice'
import Room from '../components/Room.vue'

export default {
  data: () => {
    return {
      menuDisplay: true,
      modeDisplay: true,
      username: '',
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
