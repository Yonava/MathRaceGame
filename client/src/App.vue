<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<script>

import DatabaseServices from './DatabaseServices'

export default {
  data: () => {
    return {
      throughApp: false,

      clientUser: undefined,
      clientLoginTime: undefined,
      accountLoggedIn: false
    }
  },
  async created() {

    if (localStorage.username) {
      await DatabaseServices.updateLastLogin(localStorage.username, Date.now());
    }

    setInterval(async() => {

      if (localStorage.username) {
        this.clientUser = await DatabaseServices.findUser(localStorage.username);
        if (this.clientUser.lastLogin !== this.clientLoginTime && this.accountLoggedIn) { 
          this.$router.push('/account-conflict');
        }
        this.clientLoginTime = this.clientUser.lastLogin;
        this.accountLoggedIn = true;
      } else {
        this.accountLoggedIn = false;
      }
    }, 4500)
  },
  methods: {
    
  }
}
</script>


<style>
/* GLOBAL DISPLAY */
body {
    -webkit-overflow-scrolling: touch; /* enables “momentum” (smooth) scrolling */
    user-select: none; /* disabled ability to highlight text & iconography */
    font-family: Arial, Helvetica, sans-serif;
    margin: 0px;
}
</style>
