<template>
  <div>
    <h1>Oh No!</h1>
    <p>We have detected that another device has just logged on with your account 😳😳😳😳</p>
    <b-button variant="danger" v-on:click="logout()">Log Out 🥺</b-button>
    <br>
    <p><b>- OR -</b></p>

    <b-button variant="dark" v-on:click="goBack()">Kick Off The Other Device 😈</b-button>
  </div>
</template>

<script>

import DatabaseServices from '../DatabaseServices'

export default {
  methods: {
    async goBack() {

      await DatabaseServices.updateLastLogin(localStorage.username, Date.now());
      this.$parent.accountLoggedIn = false;
      this.$router.push('/');
    },
    logout() {

      localStorage.clear();
      this.$router.push('/sign-in');
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
