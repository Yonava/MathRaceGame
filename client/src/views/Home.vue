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
      <Room v-bind:username="`${username[0].toUpperCase() + username.substring(1)} (Guest#${Math.round(Math.random() * 10000000)})`" />
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

  },
  watch: {

  }

}
</script>
