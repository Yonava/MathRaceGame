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
        <!-- Singleplayer -->
        <button @click="modeDisplay = !modeDisplay, gametype = 1">Practice Mode</button>
        <br><br><br>
        <!-- Multiplayer -->
        <button @click="modeDisplay = !modeDisplay, gametype = 2">Multiplayer Mode</button>
      </div>

      <div v-else>
        <!-- Enable chosen component -->
        <div v-if="gametype == 1">
          <Practice :username="username" />
        </div>
        <div v-else>
          <Room :username="username" />
        </div>
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

  },
  watch: {

  }

}
</script>
