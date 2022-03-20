<template>
  <div>
    <button @click="questionAnswered()">Answer a question</button>
    <div v-for="player in playerData" :key="player.id">
      <h1>
        {{ player.user }} is on question {{ player.qnum }}
      </h1>
    </div>
  </div>
</template>

<script>

export default {
  data: () => {
    return {

    };
  },
  props: [
    'playerData'
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
    
  },
}
</script>

<style scoped>

</style>
