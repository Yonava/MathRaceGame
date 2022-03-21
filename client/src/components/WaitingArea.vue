<template>
  <div>
    <b-button :variant="toggleButtonVariant" v-on:click="toggleReadiness()">Toggle Readiness</b-button>
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
      toggleButtonVariant: 'danger'
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
      this.$parent.isUserReady = !this.$parent.isUserReady;
      if (this.toggleButtonVariant === 'success')
        this.toggleButtonVariant = 'danger';
      else this.toggleButtonVariant = 'success';
    }
  },
  watch: {

  },
};
</script>

<style scoped>

</style>
