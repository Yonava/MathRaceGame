<template>
  <div>
    <div v-show="!hideall">
      <br>
      <b-button variant="info" v-on:click="gameStarted = !gameStarted">toggle game</b-button>
      <br>
      <b-button variant="outline-info" v-on:click="debug = !debug">toggle debug mode</b-button>

      
      <div style="position: fixed; top: 0; font-size: 9pt; font-weight: bold;">
        <span style="margin-right: 20vw;">Room {{ sessionData.roomid }}</span>
        <span style="">{{ inviteLink.substring(8) }}</span>
      </div>

      <p v-show="debug">
        <b>Session Details: <br> Host Name</b> = {{ sessionData.host }} <br>
        <b>My Name</b> = {{ sessionData.clientName }} <br>
        <b>Time Created</b> = {{ sessionData.date }} <br>
        <b>Room ID</b> = {{ sessionData.roomid }} <br>
        <b>Difficulty</b> = {{ sessionData.difficulty }} <br>
        <b>Questions</b> = {{ sessionData.questions }} <br>
        <b>Player Data</b> = {{ playerInfo }} <br>
        <button @click="hideall = true">Hide All</button>
      </p>
    </div>

    <!-- Waiting Area -->
    <div v-if="!gameStarted">
      <WaitingArea
      :playerData="playerInfo" />
    </div>

    <!-- Race Area -->
    <div v-else>

      <!-- Progress Side Bar -->
      <div>
        <p>{{ Math.floor(secondsPassed / 60) }}:{{ secondsPassed - Math.floor(secondsPassed / 60) * 60 }}</p>
        <!-- <b-icon-award></b-icon-award> -->
        <div :style="`height: ${(playerInfo[playerList.indexOf(sessionData.clientName)].qnum - 1) * 4}vh;`" class="display-pole"></div>
        <div class="progress-pole"></div>
        <div v-for="player in playerInfo" :key="player.id">
          <!--  -->
          <div v-if="player.user !== sessionData.clientName" :style="`bottom: ${((player.qnum - 1) * 4) + 8.15}vh;`" class="opponent-positioning">
            <span style="margin-right: 8%;">{{ player.user }}</span><div class="arrow-right"></div>
          </div>
        </div>  
      </div>

      <!-- Question Panel -->

      <div class="cooldown-bar" :style="`${cooldownActive ? `width: 0vw; transition: ${cooldownDuration}ms;`:'width: 55vw;'}`"></div>

      <div class="display-questions">
        <p style="text-decoration: underline; margin-bottom: 0%"><b>{{ sessionData.questions[qNumber - 1].task }}</b></p>
        <vue-mathjax style="font-size: 16pt" :formula="sessionData.questions[qNumber - 1].equation"></vue-mathjax>
        <div class="answer-button-container" v-for="option in sessionData.questions[qNumber - 1].options" :key="option.id">
          <b-button pill :disabled="cooldownActive" variant="primary" @click="checkAnswer(option)" class="answer-button">{{ option }}</b-button>
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

      playerList: [],
      playerInfo: [],

      /* included in each player object to detect if they are still in game */
      refreshTimer: 5000,
      /* reset on socket callback to detect if client socket has disconnected */
      detectInboundConnection: 5000,

      /* false if user is on another tab or minimizes window */
      visibilityState: true,

      /* counts how many seconds have passed since game has begun */
      secondsPassed: 0,

      sessionData: null,
      inviteLink: '',

      cooldownActive: false,
      cooldownDuration: 2000,

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
    if (this.sessionData.roomid === undefined) {
      this.$router.push('/');
    }
    this.connect();
    this.inviteLink = `https://math-race-game.herokuapp.com/go/${this.sessionData.roomid}`;
  },
  created() {

    this.sessionData = this.$route.params.sessionObject;

    // listens to see if user tabs out or minimizes our game
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.visibilityState = true;
        document.title = `Race ${this.sessionData.roomid}`;
      } else {
        this.visibilityState = false;
        document.title = 'Click Back!';
      }});
    
    this.gameClock = setInterval(() => {
      this.secondsPassed++;
    }, 1000)

    // ensures client pings the server every 250 milliseconds
    this.refreshConnection = setInterval(() => {
      if (this.visibilityState) {
        this.updateStandings();
      }
    }, 250);


    this.checkRefreshTimers = setInterval(() => {

      // check timers on players
      for (let i = 0; i < this.playerInfo.length; i++) {
        this.playerInfo[i].refreshTimer -= 250;
        if (this.playerInfo[i].refreshTimer < 0) {
          this.playerInfo.splice(i, 1);
          this.reArrangePlayerList();
        }
      }

      // check timer on last inbound connection
      this.detectInboundConnection -= 250;
      if (this.detectInboundConnection < 0) {
        this.detectInboundConnection = 2500;
        this.socketInstance.disconnect();
        this.$nextTick(this.connect());
      }
    }, 250);

  },
  destroyed() {
    clearInterval(this.refreshConnection);
    clearInterval(this.checkRefreshTimers);
  },
  methods: {
    updatePlayerInfo(data) {
      if (!this.playerList.includes(data.user)) {
        this.playerInfo.push(data);
      } else {
        for (let i = 0; i < this.playerInfo.length; i++) {
          if (this.playerInfo[i].user === data.user) {
            this.playerInfo[i] = data;
            this.playerInfo[i].refreshTimer = 1000;
          }
        }
      }

      this.playerInfo.sort((a, b) => b.qnum - a.qnum);
      this.reArrangePlayerList();
      this.$forceUpdate();
    },
    connect() {
      this.socketInstance = io('/');
      this.socketInstance.on(
        "scoreRecieved", (data) => {
          this.updatePlayerInfo(data);
          this.detectInboundConnection = 2500;
        });
      this.socketInstance.emit(
        "joinRoom", this.sessionData.roomid
      );
      this.updateStandings();
    },
    checkAnswer(answer) {
      if (answer === this.sessionData.questions[this.qNumber - 1].answer) {
        this.qNumber++;
        this.updateStandings();
        this.cooldownDuration += 250;
      } else {
        this.cooldownActive = true;
        setTimeout(() => {
          this.cooldownActive = false;
        }, this.cooldownDuration)
      }
    },
    updateStandings() {
      const data = {
        qnum: this.qNumber,
        user: this.sessionData.clientName,
        isUserReady: this.isUserReady,
        refreshTimer: this.refreshTimer
      };
      this.updatePlayerInfo(data);
      this.socketInstance.emit('score', data, this.sessionData.roomid);
    },
    reArrangePlayerList() {
      this.playerList = [];
      for (let i = 0; i < this.playerInfo.length; i++) {
        this.playerList.push(this.playerInfo[i].user);
      }
    }
  },
  watch: {
    isUserReady() {
      this.updateStandings();
    },
  },
}
</script>

<style scoped>
p {
  user-select: default;
}
.cooldown-bar {
  position: fixed;
  border-radius: 15px;
  height: 2vh;
  background-color: rgb(0, 132, 255);
  margin-left: 4%;
}

.answer-button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vw;
}

.answer-button {
  transition: 500ms ease-in-out;
  width: 50vw;
}

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

.opponent-positioning {
  display: flex;
  transition: 500ms ease-in-out;
  position: fixed;
  right: 5%;
}

.arrow-right {
  width: 0; 
  height: 0; 
  border-top: 2vh solid transparent;
  border-bottom: 2vh solid transparent;
  border-left: 2vh solid rgb(230, 41, 41);
  
}

.display-questions {
  margin-top: 7.5vh;
  margin-left: 5vw;
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