<template>
    <p>Hello {{ username }}! Welcome to multiplayer mode, where you can compete against other players!</p>
</template>

<script>

// import io from 'socket.io-client'

export default {
  name: 'app',
  data: () => {
    return {
      
    }
  },
  props: [
    'username'
  ],
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

<style scoped>

</style>