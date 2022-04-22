<template>

  <div class="center">

    <div class="center" v-if="!userFound && finishedFetching">
      <p style="font-weight: bold; margin-top: 10vh; font-size: 18pt;">User Not Found 🙁</p>
      <br>
      <b-button variant="danger" v-on:click="$router.push('/')">Back</b-button>
    </div>

    <div v-else>

      <header style="display: flex; align-items: center; justify-content: center; width: 100vw; background-color: rgb(225, 225, 225); border-bottom: 2px solid black; position: fixed; height: 10vh;">
        <h2 style="font-weight: bold; font-size: 20pt; margin-top: 3vh;">{{ userData.username }}</h2>
      </header>
      <div style="margin-top: 12vh;">
    
        <p class="stats-txt">Account Created: <span style="color: green;"> {{ finishedFetching ? userData.accountCreationDate:'Loading...' }}</span></p>
        <p class="stats-txt">Last Login: <span style="color: green;">{{ finishedFetching ? userData.lastLogin:'Loading...' }}</span></p>
        <div class="large-buffer"></div>

        <center>
          <p style="font-weight: bold; font-size: 18pt;">Stats:</p>
        </center>

        <p class="stats-txt">Races Completed: <span>{{ finishedFetching ? gameData.racesCompleted:'Calculating...' }}</span></p>
        <p class="stats-txt">Races Won: <span>{{ finishedFetching ? gameData.racesWon:'Calculating...' }}</span></p>
        <p class="stats-txt">Correct Answers: <span>{{ finishedFetching ? gameData.correctAnswers:'Calculating...' }}</span></p>
        <p class="stats-txt">Answer Accuracy: <span>{{ finishedFetching ? gameData.accuracy:'Calculating...' }}</span></p>
        <p class="stats-txt">Avg. Time Per Correct Answer: <span>{{ finishedFetching ? `${gameData.timeTaken}${gameData.timeTaken != 'N/A' ? ' Seconds':''}`:'Calculating...' }}</span></p>
        <p class="stats-txt">Incorrect Answers: <span>{{ finishedFetching ? gameData.incorrectAnswers:'Calculating...' }}</span></p>
        <p class="stats-txt">Times Ready Pressed: <span>{{ finishedFetching ? gameData.readyPressed:'Calculating...' }}</span></p>

        <center>
          <p style="font-weight: bold; font-size: 18pt;">Previous Games:</p>
        </center>

        <div v-for="game in userData.gameData.slice().reverse()" :key="game.id">
          <p class="stats-txt">Difficulty: {{ game.difficulty }}, Correct: {{ game.correctAnswers.length }}, Incorrect: {{ game.incorrectAnswers }}</p>
        </div>

        <p v-show="userData.gameData.length === 0" class="stats-txt" style="color: red;">You Haven't Played Any Games Yet</p>

        <br><br><br><br><br>

      </div>

      <footer style="display: flex; align-items: center; justify-content: center; position: fixed; bottom: 0; background-color: white; width: 100vw; border-top: 1px solid black">
        <b-button pill style="margin: 2%; width: 33vw" variant="danger" v-on:click="$router.push('/')">Back</b-button>
        <b-button pill style="margin: 2%; width: 33vw;" v-show="clientUser === userData.username" variant="outline-danger" v-on:click="logout()">Logout</b-button>
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
      userData: {gameData: []},
      gameData: undefined,
      userFound: true,
      clientUser: null
    }
  },
  async mounted() {

      this.clientUser = localStorage?.username;

      // reroute to sign-in if no user is logged in
      if (this.$route.params.username === 'undefined') {
        this.$router.push('/sign-in');
      }

      this.userData = await DatabaseServices.findUser(this.$route.params.username);
      if (!this.userData) this.userFound = false;
      this.finishedFetching = true;

      document.title = `${this.$route.params.username} - Math Race`
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

.stats-txt {
  font-weight: bold;
  margin-left: 2%;
}

span {
  color: rgb(136, 24, 180);
}

</style>


