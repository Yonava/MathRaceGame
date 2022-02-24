<template>
  <div class="room">

    <div v-if="roomDisplay">
      <p>this is the room, your username is {{ username }}</p>

      <button @click="roomDisplay = !roomDisplay, gametype = 1">Practice Mode</button>
      <br><br><br> <!-- Whitespace -->
      <button @click="roomDisplay = !roomDisplay, gametype = 2">Multiplayer Mode</button>
    </div>

    <div v-else>
      <component :is="computedComponent(gametype)" :username="username" /> <!-- Enable chosen component -->
    </div>

  </div>
</template>

<script>

// import io from 'socket.io-client'
import Practice from '../components/Practice.vue'
import Multiplayer from '../components/Multiplayer.vue'

export default {
  name: 'app',
  data: () => {
    return {
      roomDisplay: true,
      gametype: 0
    }
  },
  props: [
    'username'
  ],
  components: {
    Practice,
    Multiplayer
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
        return Multiplayer;
      }
    }
  },
  watch: {

  }

}
</script>

<style scoped>

</style>