<template>
  <div>
    <h1 style="font-weight: bold;">Oh No!</h1>
    <br>
    <center>
      <p>We have detected that another device has just logged on with your account 😳😳😳😳</p>
    </center>
    <br>
    <b-button :disabled="goingBack" variant="danger" v-on:click="logout()">Log Out 🥺</b-button>
    <br>
    <p><b>- OR -</b></p>

    <b-button :disabled="goingBack" variant="dark" v-on:click="goBack()">Kick Off The Other Device 😈</b-button>
    <br>
    <center>
      <p v-show="goingBack" style="color: red; font-size: 12pt;"><b>Hang Tight As We Kick Off Your Doppelganger!</b></p>
    </center>
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

      this.goingBack = true;

      await DatabaseServices.updateLastLogin(localStorage.username, Date.now());
      
      setTimeout (() => {
        this.$parent.accountLoggedIn = false;
        this.$router.push('/');
      }, 2000)
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
