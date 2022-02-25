<template>
<div>
  <div class="list-container">
    <button @click="postScore(qNumber)">Answer a question</button>
    <button @click="consolelog(scoreCard)">Console Log!</button>
    <div v-for="player in uniqueScoreCard" :key="player.id">
      <h1>{{ player.user }} is on question number {{ player.score }}</h1>
    </div>
  </div>
</div>
</template>

<script>

import io from "socket.io-client"

export default {
  data: () => {
    return {
      qNumber: 1,
      score: 0,
      scoreCard: [],
      uniqueScoreCard: []
    };
  },
  props: [
    'username'
  ],
  mounted() {
    this.socketInstance = io("http://localhost:1010");
      this.socketInstance.on(
        "scoreRecieved", (data) => {
          this.scoreCard = this.scoreCard.concat(data);
        }
      )
      this.postScore(this.qNumber);
  },
  methods: {
    postScore(qnum) {
      this.updateScore(qnum);
      this.score = 0;
      this.qNumber++;
    },
    updateScore(qnum) {
      const newScore = {
        score: qnum,
        user: this.username,
      };
      this.scoreCard = this.scoreCard.concat(newScore);
      this.socketInstance.emit('score', newScore);
    },
    consolelog(x) {
      console.log(x)
    }
  },
  watch: {
    scoreCard() {
      let playerArray = [];
      this.uniqueScoreCard = [];
      for (let i = this.scoreCard.length - 1; i >= 0; i--) {
        if (!playerArray.includes(this.scoreCard[i].user)) {
          playerArray.push(this.scoreCard[i].user);
          this.uniqueScoreCard.push(this.scoreCard[i]);
        }
      }
      this.uniqueScoreCard.sort((a, b) => b.score - a.score);
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