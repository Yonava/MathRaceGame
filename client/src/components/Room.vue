<template>
<div>
  <div class="list-container">
    <button @click="questionAnswered()">Answer a question</button>
    <button @click="consolelog(scoreCard)">Console Log!</button>
    <button @click="isReady = !isReady">Ready?</button>
    <p>{{ players.length }} player(s) are in room #{{ room }}.</p>
    <div v-for="player in uniqueScoreCard" :key="player.id">
      <h1>{{ player.user }} is on question {{ player.score }}. Are they ready? {{ player.ready ? "Yes":"No" }}</h1>
    </div>
  </div>
</div>
</template>

<script>

import io from "socket.io-client"

export default {
  data: () => {
    return {
      isReady: false,
      players: [],
      qNumber: 1,
      scoreCard: [],
      uniqueScoreCard: []
    };
  },
  props: [
    'username',
    'room'
  ],
  mounted() {
    this.socketInstance = io("http://localhost:1010");
    this.socketInstance.on(
      "scoreRecieved", (data) => {
        this.scoreCard.push(data);
      }
    )
    this.socketInstance.emit(
      "join-room", (this.room)
    )

    this.updateScore();
  },
  methods: {
    questionAnswered() {
      this.qNumber++;
      this.updateScore();
    },
    updateScore() {
      const newScore = {
        score: this.qNumber,
        user: this.username,
        ready: this.isReady
      };
      this.scoreCard.push(newScore);
      this.socketInstance.emit('score', newScore, this.room);
    },
    consolelog(x) {
      console.log(x)
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
      this.uniqueScoreCard.sort((a, b) => b.score - a.score);
    },
    isReady() {
      this.updateScore(this.qNumber);
    }
  }
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