<template>
  <div>
    <button @click="toggleReadiness()">Ready?</button>
    <div v-for="player in playerData" :key="player.id">
      <h1>
        {{ player.user }} is {{ player.isUserReady ? "R":"Not r" }}eady.
      </h1>
    </div>
  </div>
</template>

<script>

export default {
  data: () => {
    return {
      isUserReady: false,
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
    toggleReadiness() {
      this.isUserReady = !this.isUserReady;
    }
  },
  watch: {
    
  },
};
</script>

<style scoped>

</style>
