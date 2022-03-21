<template>
  <div class="center-container">
    <b-button variant="info" v-on:click="gameStarted = !gameStarted">toggle game</b-button>
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
      :playerData="playerInfo"
      />
    </div>

    <!-- Race Area -->
    <div v-else>
      <RaceArea
      :playerData="playerInfo"
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

      playerList: [],
      playerInfo: [],
      refreshTimer: 5000,

      /* false if user is on another tab or minimizes window */
      visibilityState: true,

      sessionData: undefined,
      inviteLink: '',
      gameStarted: false,
      /* Waiting Area Data */
      isUserReady: false,
      /* Race Area Data */
      qNumber: 1,
    };
  },
  components: {
    WaitingArea,
    RaceArea
  },
  mounted() {
    this.connect();
    this.inviteLink = `https://math-race-game.herokuapp.com/go/${this.sessionData.roomid}`
  },
  created() {

    this.sessionData = this.$route.params.sessionObject;

    // listens to see if user tabs out or minimizes our game
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.visibilityState = true
      } else {
        this.visibilityState = false
      }});

    // forces a socket reconnect every 2.5 seconds
    this.refreshConnection = setInterval(() => {
      if (this.visibilityState) {
        this.socketInstance.disconnect();
        this.connect();
      }
    }, 2500);
    this.timeKeeper = setInterval(() => {
      for (let i = 0; i < this.playerInfo.length; i++) {
        this.playerInfo[i].refreshTimer -= 1000;
        if (this.playerInfo[i].refreshTimer < 0) {
          this.playerInfo.splice(i, 1);
          this.playerList.splice(i, 1);
        }
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.refreshConnection);
    clearInterval(this.timeKeeper);
  },
  methods: {
    updatePlayerInfo(data) {
      if (!this.playerList.includes(data.user)) {
        this.playerInfo.push(data);
        this.playerList.push(data.user);
      } else {
        for (let i = 0; i < this.playerInfo.length; i++) {
          if (this.playerInfo[i].user === data.user) {
            this.playerInfo[i] = data;
            this.playerInfo[i].refreshTimer = 5000;
          }
        }
      }
    },
    connect() {
      this.socketInstance = io('/');
      this.socketInstance.on(
        "scoreRecieved", (data) => {
          this.updatePlayerInfo(data)
        });
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
      const data = {
        qnum: this.qNumber,
        user: this.sessionData.clientName,
        isUserReady: this.isUserReady,
        refreshTimer: this.refreshTimer
      };
      this.updatePlayerInfo(data)
      this.socketInstance.emit('score', data, this.sessionData.roomid);
    }
  },
  watch: {
    isUserReady() {
      this.updateStandings();
    }
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>