<template>
  <div>
    
    <!-- Waiting Area -->
    <div v-if="!gameStarted">
      <WaitingArea
      ref="waitingArea"
      :host="sessionData.host"
      :playerData="playerInfo" />
    </div>

    <!-- Race Area -->
    <div v-else-if="gameStarted && qNumber < (sessionData.questions.length + 1)">

      <!-- <button v-on:click="qNumber++">answer</button> -->
      <!-- <p>{{ Math.floor(secondsPassed / 60) }}:{{ secondsPassed - Math.floor(secondsPassed / 60) * 60 }}</p> -->

      <!-- Progress Side Bar -->
      <div class="progress-container" style="display: flex; flex-direction: column; right: 0; top: 0; margin-top: 15vh; position: fixed; justify-content: center; align-items: center">

        <b-icon-award style="margin-bottom: 1vh; width: 9vw; height: 9vw;"></b-icon-award>

        <div style="border: 1px solid black; border-right: none; height: 60vh; width: 10vw;">

          <div :style="`position: absolute; height: ${(qNumber - 1) * 3}vh; width: 10vw; bottom: 0; background-color: rgb(0, ${255 - (qNumber * 7)}, 0); transition: 500ms; border-bottom: 1px solid black;`"></div>

          <div :style="`display: flex; flex-direction: row; align-items: center; position: absolute; bottom: ${((qNumber - 1) * 3) - 1.25}vh; transition: 500ms; left: -13vw;`" v-for="player in playerInfo" :key="player.id">
            <div v-show="player.user !== sessionData.clientName">
              <span style="font-size: 10pt; font-weight: bold;">{{ player.user }}</span>
              <div style="margin-left: 1vw;" class="arrow-right"></div>
            </div>
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

    <div v-else>
      <Congrats />
    </div>

  </div>
</template>

<script>

import io from "socket.io-client"
import WaitingArea from "../components/WaitingArea.vue"
import Congrats from "../components/Congrats.vue"
import DatabaseServices from "../DatabaseServices.js"

export default {
  data: () => {
    return {

      /* playerList is a list of unique players' usernames, playerInfo contains all of the players' data */
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

      /* stores session object pulled from database */
      sessionData: null,

      /* displayed at the top for users to invite friends */
      inviteLink: '',

      /* controls cooldown for wrong answer submission */
      cooldownActive: false,
      cooldownDuration: 2000,

      /* true when host begins game */
      gameStarted: false,

      /* toggled by each client, depending on whether they are ready for game to begin */
      isUserReady: false,

      /* what question the client is on */
      qNumber: 1,
    };
  },
  components: {
    WaitingArea,
    Congrats
  },
  mounted() {

    // this line for testing purposes only!
    // localStorage.raceData = '';
    // this.sessionData = {"_id":"624dabcdfe515236dfe92e16","roomid":"6130","questions":[{"equation":"$$13+10$$","task":"Evaluate","answer":23,"options":[23,34,14,13]},{"equation":"$$1-13$$","task":"Evaluate","answer":-12,"options":[-8,-14,-10,-12]},{"equation":"$$1.63+2.08$$","task":"Evaluate","answer":3.71,"options":[2.11,5.23,2.86,3.71]},{"equation":"$$2.20\\cdot0.55$$","task":"Evaluate","answer":1.21,"options":[1.39,0.67,1.21,0.88]},{"equation":"$$6\\over2$$","task":"Evaluate","answer":3,"options":[3,4,5,2]},{"equation":"$$2+14$$","task":"Evaluate","answer":16,"options":[12,20,16,22]},{"equation":"$$8^0$$","task":"Evaluate","answer":1,"options":[1,2,-1,0]},{"equation":"$$7-3$$","task":"Evaluate","answer":4,"options":[4,8,3,6]},{"equation":"$$1.63-1.68$$","task":"Evaluate","answer":-0.05,"options":[-0.05,-0.06,-0.06,-0.03]},{"equation":"$$0.24\\cdot2.48$$","task":"Evaluate","answer":0.6,"options":[0.6,0.88,0.46,0.85]},{"equation":"$$(1^1)^1$$","task":"Evaluate","answer":1,"options":[3,0,1,-1]},{"equation":"$$(2+5)^1$$","task":"Evaluate","answer":7,"options":[7,6,8,5]},{"equation":"$$(7+1)^2$$","task":"Evaluate","answer":64,"options":[64,32,63,65]},{"equation":"$$(4+8)^1$$","task":"Evaluate","answer":12,"options":[13,14,10,12]},{"equation":"$$(3^2)^2$$","task":"Evaluate","answer":81,"options":[55,54,66,81]},{"equation":"$$(1^2)^1$$","task":"Evaluate","answer":1,"options":[2,3,1,0]},{"equation":"$$(6+7)^1$$","task":"Evaluate","answer":13,"options":[13,16,11,15]},{"equation":"$$(6+6)^1$$","task":"Evaluate","answer":12,"options":[12,16,11,14]},{"equation":"$$(8+6)^2$$","task":"Evaluate","answer":196,"options":[196,206,184,208]},{"equation":"$$(2^1)^2$$","task":"Evaluate","answer":4,"options":[4,6,3,1]}],"date":"2022-04-06T15:03:41.244Z","host":"YonaTest","difficulty":"Hard","hasBegun":true,"__v":0}
    
    if (this.sessionData.roomid === undefined) {
      this.$router.push('/');
    } else {

      this.gameStarted = this.sessionData.hasBegun;
      this.connect();

      if (localStorage.raceData) {
        if (localStorage.raceData.substring(0, 4) == this.sessionData.roomid) {
          this.qNumber = parseInt(localStorage.raceData.substring(6));
          this.cooldownDuration += ((this.qNumber - 1) * 250); // adds appropriate cooldown duration back
        } else {
          localStorage.raceData = '';
        }
      }
    }
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
          // only returns true if host broadcasted a signal to start
          if (data.startEvent) {
            console.log('startEvent detected')
            this.$refs.waitingArea.startCountdown();
          }
        });
      this.socketInstance.emit(
        "joinRoom", this.sessionData.roomid
      );
    },
    checkAnswer(answer) {
      if (answer === this.sessionData.questions[this.qNumber - 1].answer) {
        this.qNumber++;
        this.cooldownDuration += 250;
        localStorage.raceData = `${this.sessionData.roomid}: ${this.qNumber}`;
      } else {
        this.cooldownActive = true;
        setTimeout(() => {
          this.cooldownActive = false;
        }, this.cooldownDuration)
      }
    },
    updateStandings(startEvent = false) {

      const data = {
        qnum: this.qNumber,
        user: this.sessionData.clientName,
        isUserReady: this.isUserReady,
        refreshTimer: this.refreshTimer,
        startEvent,
      };
      this.updatePlayerInfo(data);
      this.socketInstance.emit('score', data, this.sessionData.roomid);

      setTimeout(() => {
        if (startEvent) DatabaseServices.sessionStarted(this.sessionData.roomid); 
      }, 10000) // Countdown Time Accounted For
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

.arrow-right {
  width: 0; 
  height: 0; 
  border-top: 1.5vh solid transparent;
  border-bottom: 1.5vh solid transparent;
  border-left: 1.5vh solid rgb(230, 41, 41);
  
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