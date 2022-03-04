<!-- Multiplayer Session Room -->
<template>
<div>
  <div class="list-container">
    <button @click="disconnect()">Return to Menu</button>
    <button @click="reconnect()">Reconnect</button>
    <button @click="questionAnswered()">Answer a question</button>
    <button @click="isUserReady = !isUserReady">Ready?</button>
    <button @click="consolelog($parent.username)">Console Log!</button>
    <button v-show="host && gameStarted">Start Game</button>
    <p>Invite Link: <a target="_blank">math-race-game.herokuapp.com/go/{{ room }}</a></p>
    <p>{{ players.length }} player(s) are in room #{{ room }}. This game can {{ gameStarted ? "":"not " }}begin.</p>
    <div v-for="player in uniqueScoreCard" :key="player.id">
      <h1><b>{{ player.isHost ? "[HOST]":"" }}</b>
        {{ player.user }} is on question 
        {{ player.qnum }}. {{ player.isUserReady ? "R":"Not r" }}eady.
      </h1>
    </div>
    <br><br><br><br><br><br>
  </div>
</div>
</template>

<script>

import io from "socket.io-client"

export default {
  data: () => {
    return {
      gameStarted: false,
      isUserReady: false,
      isClientReady: false,
      players: [],
      qNumber: 1,
      scoreCard: [],
      uniqueScoreCard: []
    };
  },
  props: [
    'username',
    'room',
    'host'
  ],
  mounted() {
    this.connect();
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
        "joinRoom", this.room
      );

      this.updateStandings();

    },
    reconnect() {

      this.socketInstance.disconnect();
      this.connect();

    },
    hasGameStarted() {
      for (let i in this.uniqueScoreCard) {
        if (!this.uniqueScoreCard[i].isUserReady) {
          return false;
        }
      }
      return true;
    },
    questionAnswered() {
      this.qNumber++;
      this.updateStandings();
    },
    updateStandings() {
      const newScore = {
        qnum: this.qNumber,
        user: this.username,
        isUserReady: this.isUserReady,
        isClientReady: this.isClientReady,
        isHost: this.host
      };
      this.scoreCard.push(newScore);
      this.socketInstance.emit('score', newScore, this.room);
    },
    consolelog(x) {
      console.log(x);
    },
    disconnect() {
      this.socketInstance.emit('disconnectMsg', this.username)
      this.socketInstance.disconnect();
      this.$parent.menuDisplay = true;
    }
  },
  watch: {
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
      
      this.uniqueScoreCard.sort((a, b) => b.qnum - a.qnum);
    },
    isUserReady() {
      this.updateStandings();
    }
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