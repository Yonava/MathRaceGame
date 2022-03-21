<template>
  <div>
    <button v-on:click="gameStarted = !gameStarted">toggle game</button>
    <p>Invite Link: <a :href="inviteLink" target="_blank">{{ inviteLink }}</a></p>
    <p>
      <b>Session Details: <br> Host Name</b> = {{ sessionData.host }} <br>
      <b>My Name</b> = {{ sessionData.clientName }} <br>
      <b>Time Created</b> = {{ sessionData.date }} <br>
      <b>Room ID</b> = {{ sessionData.roomid }} <br>
      <b>Difficulty</b> = {{ sessionData.difficulty }} <br>
      <b>Questions</b> = {{ sessionData.questions }} <br>
    </p>

    <!-- Waiting Area -->
    <div v-if="!gameStarted">
      <WaitingArea
      :playerData="uniqueScoreCard"
      />
    </div>

    <!-- Race Area -->
    <div v-else>
      <RaceArea
      :playerData="uniqueScoreCard"
      />
    </div>

  </div>
</template>

<script>

import io from "socket.io-client"
import WaitingArea from "../components/WaitingArea.vue"
import RaceArea from "../components/RaceArea.vue"

export default {
  data: () => {
    return {
      sessionData: undefined,
      inviteLink: '',
      gameStarted: false,
      players: [],
      qNumber: 1,
      scoreCard: [],
      uniqueScoreCard: []
    };
  },
  components: {
    WaitingArea,
    RaceArea
  },
  mounted() {

    /* --parsing database object-- */

    this.sessionData = this.$route.params.sessionObject;


    /* --parsing database object-- */

    this.connect();
    this.inviteLink = `https://math-race-game.herokuapp.com/go/${this.sessionData.roomid}`
  },
  created() {
    // forces a socket reconnect every 2.5 seconds
    this.refreshConnection = setInterval(() => {
      this.socketInstance.disconnect();
      this.connect();
    }, 2500)
  },
  destroyed() {
    clearInterval(this.refreshConnection);
  },
  methods: {
    connect() {
      
      this.socketInstance = io('/');
      this.socketInstance.on(
        "scoreRecieved", (data) => {
          this.scoreCard.push(data);
        }
      );
      this.socketInstance.emit(
        "joinRoom", this.sessionData.roomid
      );
      this.updateStandings();
    },
    questionAnswered() {
      this.qNumber++;
      this.updateStandings();
    },
    updateStandings() {
      const newScore = {
        qnum: this.qNumber,
        user: this.sessionData.clientName,
        isUserReady: this.isUserReady
      };
      this.scoreCard.push(newScore);
      this.socketInstance.emit('score', newScore, this.sessionData.roomid);
    },
    disconnect() {
      this.socketInstance.emit('disconnectMsg', this.username)
      this.socketInstance.disconnect();
      this.$parent.menuDisplay = true;
    }
  },
  watch: {
    isUserReady() {
      this.updateStandings();
    },
    scoreCard() {

      this.players = [];
      this.uniqueScoreCard = [];
      for (let i = this.scoreCard.length - 1; i >= 0; i--) {
        if (!this.players.includes(this.scoreCard[i].user)) {
          this.players.push(this.scoreCard[i].user);
          this.uniqueScoreCard.push(this.scoreCard[i]);
        }
      }

      this.gameStarted = this.hasGameStarted();
      
      // this.uniqueScoreCard.sort((a, b) => b.qnum - a.qnum);
    },
  },
};
</script>

<style scoped>
.parent-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  padding-top: 150px;
}
.name-container {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.user-name {
  height: 30px;
  font-size: 20px;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
}
.join-button {
  height: 30px;
  font-size: 20px;
}
.text-input-container {
  height: 100vh;
}
.text-message {
  width: 100%;
  position: absolute;
  bottom: 0px;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
}
</style>