<template>
  <div>
    <h1 style="font-weight: bold;">Oh No!</h1>
    <br>
    <center>
      <p>We have detected that another device has just logged on with your account 😳😳😳😳</p>
    </center>
    <br>
    <b-button variant="danger" v-on:click="logout()">Log Out 🥺</b-button>
    <br>
    <p><b>- OR -</b></p>

    <b-button variant="dark" v-on:click="goBack()">Kick Off The Other Device 😈</b-button>
    <br>
    <p v-show="goingBack" style="color: red; font-size: 12pt;"><b>Hang Tight As We Kick Off Your Doppelganger!</b></p>
  </div>
</template>

<script>

import DatabaseServices from '../DatabaseServices'

export default {
  data: () => {
    return {
      goingBack: false
    }
  },
  mounted() {
    document.title = 'Conflict Detected - Math Race';
  },
  methods: {
    async goBack() {

      await DatabaseServices.updateLastLogin(localStorage.username, Date.now());
      this.goingBack = true;
      setTimeout (() => {
        this.$parent.accountLoggedIn = false;
        this.$router.push('/');
      }, 3500)
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
  padding: 3%;
}
</style>
