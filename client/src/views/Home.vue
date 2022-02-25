<template>
  <div class="home">

    <div v-if="menuDisplay">
      <h1>Home page</h1>
      <h1>Join Group Session</h1>
      <input v-model="username" type="text" placeholder="Enter Username" @keyup.enter="menuDisplay = false" />
      <button @click="menuDisplay = !menuDisplay">Connect</button>
    </div>

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
  name: 'app',
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
        return Room;
      }
    }
  },
  watch: {

  }

}
</script>
