<template>
  <div class="center">
    <div>
      <b-card
      :title="$route.params.username"
      img-src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_470493341_20001333200092800_398689.jpg"
      img-alt="Profile Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2">

          <b-card-text>
          {{ $route.params.username }}s Profile and Stats
          </b-card-text>

          <b-button @click="$router.push('/')" variant="danger">Return</b-button>
        </b-card>
    </div>
    <b-button @click="logout()" variant="outline-danger">Log Out</b-button>
  </div>
</template>

<script>
export default {

  mounted() {
    if (this.$route.params.username === 'undefined') {
      this.$router.push('/sign-in');
    }
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(`hi, my name is ${this.$route.params.username}`).then(() => {
        // runs if successful
        console.log('yay')
      }, () => {
        // runs if unsuccessful
        console.log('not yay')
      });
    },
    logout() {
      localStorage.username = undefined;
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>


