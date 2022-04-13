<template>

  <div class="center">

    

    <div style="margin: 6%; font-size: 18pt;" v-if="!userFound">
      <p style="font-size: 20pt; font-weight: bold; margin-top: 5vh;">User Not Found 🙁</p>
    </div>
    <div v-else>

      <header style="display: flex; align-items: center; justify-content: center; width: 100vw; background-color: rgb(225, 225, 225); border-bottom: 2px solid black; position: fixed; height: 10vh;">
        <h2 style="font-weight: bold; font-size: 20pt; margin-top: 3vh;">{{ userData.username }}</h2>
      </header>
      <div>
    
        <p>Account Created: {{ finishedFetching ? userData.accountCreationDate:'Loading...' }}</p>
        <p>Last Login: {{ finishedFetching ? userData.lastLogin:'Loading...' }}</p>
        <p>Races Completed: {{ finishedFetching ? gameData.racesCompleted:'Loading...' }}</p>
        <p>Races Won: {{ finishedFetching ? gameData.racesWon:'Loading...' }}</p>
        <p>Correct Answers: {{ finishedFetching ? gameData.correctAnswers:'Loading...' }}</p>
        <p>Answer Accuracy: {{ finishedFetching ? `${gameData.accuracy}`:'Loading...' }}</p>
        <p>Average Time Taken Per Correct Answer: {{ finishedFetching ? gameData.timeTaken:'Loading...' }}</p>
        <p>Incorrect Answers: {{ finishedFetching ? gameData.incorrectAnswers:'Loading...' }}</p>
        <p>Times Ready Pressed: {{ finishedFetching ? gameData.readyPressed:'Loading...' }}</p>

        <p style="font-size: 20pt; opacity: 0;">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, provident.</p>
        <br><br><br><br>
      </div>

      <footer style="display: flex; align-items: center; justify-content: center; position: fixed; bottom: 0; background-color: white; width: 100vw; border-top: 1px solid black">
        <b-button pill style="margin: 2%; width: 33vw" variant="outline-danger" v-on:click="$router.push('/')">Back</b-button>
        <b-button pill style="margin: 2%; width: 33vw;" v-show="clientUser === userData.username" variant="danger" v-on:click="logout()">Logout</b-button>
      </footer>
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
      userData: undefined,
      gameData: undefined,
      userFound: true,
      clientUser: null
    }
  },
  created() {
    this.clientUser = localStorage?.username;
  },
  async mounted() {

    // reroute to sign-in if no user is logged in
    if (this.$route.params.username === 'undefined') {
      this.$router.push('/sign-in');
    }

    this.userData = await DatabaseServices.findUser(this.$route.params.username);
    if (!this.userData) this.userFound = false;
    this.finishedFetching = true;

    this.gameData = gameDataParser(this.userData.gameData);

  },
  methods: {
    logout() {

      localStorage.clear();
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>


