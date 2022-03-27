<template>
  <div>
    <div v-show="!hideall" class="center-container">
      <br>
      <b-button variant="info" v-on:click="gameStarted = !gameStarted">toggle game</b-button>
      <br>
      <b-button variant="outline-info" v-on:click="debug = !debug">toggle debug mode</b-button>

      <p>Invite Link: <a :href="inviteLink" target="_blank">{{ inviteLink }}</a></p>

      <p v-show="debug">
        <b>Session Details: <br> Host Name</b> = {{ sessionData.host }} <br>
        <b>My Name</b> = {{ sessionData.clientName }} <br>
        <b>Time Created</b> = {{ sessionData.date }} <br>
        <b>Room ID</b> = {{ sessionData.roomid }} <br>
        <b>Difficulty</b> = {{ sessionData.difficulty }} <br>
        <b>Questions</b> = {{ sessionData.questions }} <br>
        <button @click="hideall = true">Hide All</button>
      </p>
    </div>

    <!-- Waiting Area -->
    <div v-if="!gameStarted">
      <WaitingArea
      :playerData="playerInfo"
      />
    </div>

    <!-- Race Area -->
    <div v-else>

      <div>

        <!-- <b-icon-award></b-icon-award> -->
        <div :style="`height: ${(playerInfo[playerList.indexOf(sessionData.clientName)].qnum - 1) * 4}vh;`" class="display-pole"></div>
        <div class="progress-pole"></div>
        <div v-for="player in opponentInfo" :key="player.id">
          <div :style="`bottom: ${((player.qnum - 1) * 4) + 8.15}vh`" class="arrow-right"></div>
        </div>
        
      </div>

      <div class="display-questions">
        <b-button variant="primary" @click="questionAnswered()">Answer a question</b-button>
        <br><br>
        <div v-for="player in playerInfo" :key="player.id">
          <p>
            <b>{{ player.user }} is on question {{ player.qnum }}</b>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import io from "socket.io-client"
import WaitingArea from "../components/WaitingArea.vue"

export default {
  data: () => {
    return {

      debug: false,
      hideall: false,

      /* used for displaying on side bar */
      opponentInfo: [],

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
    WaitingArea
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
    },
    playerInfo() {

      // sets number of opponent arrows to display, -1 accounts for client in playlist
      const numOfOpponentsDisplayed = (this.playerList.length - 1) > 3 ? 3:(this.playerList.length - 1);

      const players = [...this.playerInfo];
      // gets rid of client in opponents
      players.splice(this.playerList.indexOf(this.sessionData.clientName), 1);
      // sorts opponents by highest score
      players.sort((a, b) => b.qnum - a.qnum);
      // resets opponent info array to repopulate with latest data
      this.opponentInfo = [];
      // repopulates
      for (let i = 0; i < numOfOpponentsDisplayed; i++) {
        this.opponentInfo.push(players[i]);
      }
      this.$forceUpdate();
    }
  },
}
</script>

<style scoped>

.display-pole {
  bottom: 10%;
  right: 0%;
  position: fixed;
  width: 3.5vw;
  background-color: rgb(55, 236, 85);
  transition: 500ms ease-in-out;
}

.progress-pole {
  bottom: 10%;
  right: 0%;
  position: fixed;
  height: 80vh;
  width: 3.5vw;
  border: 0.5px solid black;
  border-right: none;
}

.arrow-right {
  position: fixed;
  right: 4%;
  width: 0; 
  height: 0; 
  border-top: 2vh solid transparent;
  border-bottom: 2vh solid transparent;
  border-left: 2vh solid rgb(230, 41, 41);
  transition: 500ms ease-in-out;
}

.display-questions {
  position: fixed;
  padding: 2.5%;
  max-width: 85vw;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>