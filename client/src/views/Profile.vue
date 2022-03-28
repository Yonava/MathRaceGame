<template>
  <div class="center">
      <h1>This is The Profile Page of {{ $route.params.username }}</h1>
      <button type="button" @click="copyToClipboard" class="btn btn-outline-primary btn-lg">Primary</button>
      <div>
        <b-card
        :title="$route.params.username"
        img-src="https://images.theconversation.com/files/273872/original/file-20190510-183089-1qzy2lb.jpg?ixlib=rb-1.1.0&rect=355%2C0%2C3290%2C1885&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2">

            <b-card-text>
            {{ $route.params.username }}s Profile and Stats
            </b-card-text>

            <b-button href="#" variant="danger">Go somewhere</b-button>
          </b-card>
          <b-button style="position: fixed; bottom: 10%" variant="outline-danger" @click="$router.push('/')">Return</b-button>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
      copyToClipboard() {
        navigator.clipboard.writeText(`hi, my name is ${this.$route.params.username}`).then(() => {
          // runs if successful
          console.log('yay')
        }, () => {
          // runs if unsuccessful
          console.log('not yay')
        });
      }
    }
}
</script>

<style scoped>

</style>


