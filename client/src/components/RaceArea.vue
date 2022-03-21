<template>
  <div>
    <b-button variant="primary" @click="$parent.questionAnswered()">Answer a question</b-button>
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
    this.refresh = setInterval(() => {
      this.$forceUpdate();
    }, 100)
  },
  destroyed() {
    clearInterval(this.refresh);
  },
  methods: {
   
  },
  watch: {
    
  },
}
</script>

<style scoped>

</style>
