<template>
  <div>
    <p>this is the room, your username is {{ username }}</p>
    <input type="number" v-model="number1">
    <input type="number" v-model="number2">
    <p>Output = {{ output }}</p>
  </div>
</template>

<script>

// import io from 'socket.io-client'

export default {
  name: 'app',
  data: () => {
    return {
      number1: 0,
      number2: 0,
      output: 0
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
    addthenums() {
      this.output = parseInt(this.number1) + parseInt(this.number2);
    }
  },
  watch: {
    number1() {
      this.addthenums();
    },
    number2() {
      this.addthenums();
    }
  }

}
</script>

<style scoped>

</style>