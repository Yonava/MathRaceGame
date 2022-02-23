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
      <Room v-bind:username="username" />
      <Room v-bind:username="username" />
      <Room v-bind:username="username" />
      <Room v-bind:username="username" />
      <Room v-bind:username="username" />
    </div>

  </div>
</template>

<script>

import Room from '../components/Room.vue'

export default {
  name: 'app',
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
