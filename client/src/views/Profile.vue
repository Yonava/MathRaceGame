<template>

  <div class="center">

    <b-button pill style="width: 35vw; position: fixed; top: 0; margin-top: 1.5vh; left: 0; margin-left: 5vw;" variant="outline-danger" v-on:click="$router.push('/')">
      Back 
    </b-button>

    <div class="large-buffer"></div>
    <div class="large-buffer"></div>

    <div>

      <b-card
      :title="finishedFetching ? `${userData.username}s Profile and Stats`:'Loading Latest Profile Data...'"
      img-src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_470493341_20001333200092800_398689.jpg"
      img-alt="Profile Image"
      img-top
      tag="article"
      style="margin: 5%"
      class="mb-2">

          <b-card-text>
            Account Created: {{ finishedFetching ? userData.accountCreationDate:'Loading...' }}
          </b-card-text>

          <b-card-text>
            Last Login: {{ finishedFetching ? userData.lastLogin:'Loading...' }}
          </b-card-text>

          <b-card-text>
            Game Data: {{ finishedFetching ? userData.gameData:'Loading...' }}
          </b-card-text>

          <b-card-text>
            Access Level: {{ finishedFetching ? userData.accessLevel:'Loading...' }}
          </b-card-text>

          <b-button @click="logout()" variant="danger">Log Out</b-button>
          <b-button @click="logParsedGameData()" variant="danger">Log Data</b-button>
        </b-card>

    </div>

  </div>

</template>

<script>

import DatabaseServices from '../DatabaseServices'
import gameDataParser from '../functionality/gameDataParser'

export default {

  data: () => {
    return {

      finishedFetching: false,
      userData: undefined
    }
  },
  async mounted() {

    // reroute to sign-in if no user is logged in
    if (this.$route.params.username === 'undefined') {
      this.$router.push('/sign-in');
    }

    this.userData = await DatabaseServices.findUser(this.$route.params.username);

    this.finishedFetching = true;
  },
  methods: {
    logParsedGameData() {
      console.log(gameDataParser(this.userData.gameData));
    },
    logout() {

      localStorage.clear();
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>


