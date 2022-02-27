<template>
  <div>
    <h1>Redirecting</h1>
  </div>
</template>

<script>

export default {
  mounted() {
    this.$parent.throughApp = true;
    this.$router.push('/');
  },
}
</script>

<style scoped>

</style>