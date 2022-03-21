<template>
  <div>
    <b-button :variant="toggleButtonVariant" v-on:click="toggleReadiness()">Toggle Readiness</b-button>
    <div v-for="player in playerData" :key="player.id">
      <h1>
        {{ player.user }} is {{ player.isUserReady ? "r":"not r" }}eady.
      </h1>
    </div>
    <b-button variant="outline-danger" v-on:click="$router.push('/')">Leave Session</b-button>
  </div>
</template>

<script>

export default {
  data: () => {
    return {
      toggleButtonVariant: 'danger'
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
    toggleReadiness() {
      this.$parent.isUserReady = !this.$parent.isUserReady;
      if (this.toggleButtonVariant === 'danger')
        this.toggleButtonVariant = 'success';
      else this.toggleButtonVariant = 'danger';
    }
  },
  watch: {

  },
};
</script>

<style scoped>

</style>
