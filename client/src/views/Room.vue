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

        <b-icon-award-fill variant="warning" :animation="ribbonAnimation" style="margin-bottom: 1vh; width: 9vw; height: 9vw;"></b-icon-award-fill>

        <div style="border: 1px solid black; border-right: none; height: 60vh; width: 10vw;">

          <div :style="`position: absolute; height: ${(qNumber - 1) * 3}vh; width: 10vw; bottom: 0; background-color: rgb(0, ${255 - (qNumber * 7)}, 0); transition: 500ms; border-bottom: 1px solid black;`"></div>

          <div :style="`display: flex; flex-direction: row; align-items: center; position: absolute; transition: 500ms; right: 11vw; bottom: ${((player.qnum - 1) * 3) - 1.25}vh;`" v-for="player in playerInfo" :key="player.id">
            <!--  -->
            <div :style="`display: flex; flex-direction: row; align-items: center;`" v-show="player.user !== sessionData.clientName">
              <span style="font-size: 10pt; font-weight: bold;">{{ player.user }}</span>
              <div style="margin-left: 1vw;" class="arrow-right"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Question Panel -->

      <div class="cooldown-bar" :style="`${cooldownActive ? `width: 0vw; transition: ${cooldownDuration}ms;`:'width: 100vw;'}`"></div>

      <div style="background-color: white; position: fixed; left: 0; top: 17.5vh; height: 12.5vh; width: 70vw; margin-left: 7.5vw;">
        <p style="text-decoration: underline; font-weight: bold">{{ sessionData.questions[qNumber - 1].task }}</p>
        <vue-mathjax style="font-size: 16pt; position: absolute; bottom: 0;" :formula="sessionData.questions[qNumber - 1].equation"></vue-mathjax>
      </div>

      <div style="width: 100vw; height: 30vh; background-color: white; z-index: -1"></div>

      
      <div style="display: flex; flex-direction: column; margin-left: 7.5vw; z-index: -2;">
        <div v-for="option in sessionData.questions[qNumber - 1].options" :key="option.id">
          <b-button pill :disabled="cooldownActive" style="margin-top: 1vh; width: 55vw;" variant="primary" @click="checkAnswer(option)">{{ option }}</b-button>
        </div>
      </div>

      <div style="position: fixed; bottom: 0; width: 60vw; height: 40vh; left: 7vw; border-top: 1px solid black; background-color: white;">
        <p style="font-weight: bold; position: absolute; top: 0; left: 0;">Annoucements:</p>
        <p style="margin-top: 3.5vh; font-size: 9pt;">Race Annoucements Coming Soon!</p>
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

      ribbonAnimation: '',
    };
  },
  components: {
    WaitingArea,
    Congrats
  },
  mounted() {

    // this line for testing purposes only!
    // localStorage.raceData = '';
    // this.sessionData = {"_id":"62506eb2a54ad6e1692f203a","roomid":"5131","questions":[{"equation":"$$13+9$$","task":"Evaluate","answer":22,"options":[14,31,13,17,20,24,33,12,22,19]},{"equation":"$$2.14+0.30$$","task":"Evaluate","answer":2.44,"options":[2.29,2.29,2.34,2.27,2.44,2.68,1.93,2.17,2,1.32]},{"equation":"$$11^2$$","task":"Evaluate","answer":121,"options":[71,121,163,110,73,114,178,108,155,150]},{"equation":"$$7-15$$","task":"Evaluate","answer":-8,"options":[-7,-8,-15,-6,-11,-12,-5,-4,-10,-9]},{"equation":"$$\\sqrt{49} + 11-17$$","task":"Evaluate","answer":1,"options":[-3,6,0,2,1,4,3,-1,-2,5]},{"equation":"$$3**3$$","task":"Evaluate","answer":27,"options":[31,33,21,39,22,34,30,27,15,19]},{"equation":"$$12 + 9\\cdot 5$$","task":"Evaluate","answer":57,"options":[34,78,67,76,48,29,36,74,46,57]},{"equation":"$$5 + 10\\cdot 6$$","task":"Evaluate","answer":65,"options":[77,36,85,53,57,75,94,81,65,78]},{"equation":"$$(3^1)^2$$","task":"Evaluate","answer":9,"options":[5,9,12,10,14,11,6,8,13,7]},{"equation":"$$(2^1)^2$$","task":"Evaluate","answer":4,"options":[2,0,7,11,1,8,6,3,5,4]},{"equation":"$$(3+1)^1$$","task":"Evaluate","answer":4,"options":[4,8,5,6,3,1,11,7,2,0]},{"equation":"$$7 + y - 4 = 2$$","task":"Solve for y","answer":-1,"options":[-1,0,2,1,-2,-3,6,4,3,-4]},{"equation":"$$7y = 7$$","task":"Solve for y","answer":1,"options":[0,-1,5,1,2,-3,3,4,-2,-4]},{"equation":"$$5c + 7 = 4$$","task":"Solve for c","answer":-0.6,"options":[-0.88,-0.6,-0.32,-0.56,-0.37,-0.78,-0.61,-0.52,-0.71,-0.35]},{"equation":"$$$$","task":"Find the area of the rectangle with  length 11 and width 4.","answer":44,"options":[37,44,58,40,26,59,66,46,45,32]},{"equation":"$$$$","task":"Find the area of the rectangle with  length 10 and width 19.","answer":190,"options":[131,241,178,190,262,127,129,200,283,163]},{"equation":"$$$$","task":"Find the area of the triangle with base 8.1 and height 17.5.","answer":70.88,"options":[83.64,44.65,84.35,49.62,48.2,50.32,48.2,98.52,70.88,59.54]},{"equation":"$$6cos({0})$$","task":"Evaluate","answer":6,"options":[8,3,5,12,9,10,2,7,4,6]},{"equation":"$$2cos({\\pi})$$","task":"Evaluate","answer":-2,"options":[1,-3,-2,0,-6,-1,-5,4,-4,2]},{"equation":"$$8cos({3\\pi\\over2})$$","task":"Evaluate","answer":0,"options":[3,4,-3,0,1,2,-4,-2,6,-1]}],"date":"2022-04-08T17:19:46.070Z","host":"2xLogger","difficulty":"Intermediate","hasBegun":true,"__v":0}
    
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
    document.addEventListener('visibilitychange', this.visibilityHandler)
      
    
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
    document.removeEventListener('visibilitychange', this.visibilityHandler)
  },
  methods: {
    async visibilityHandler() {
      if (document.visibilityState === 'visible') {
        this.visibilityState = true;
        document.title = `Race ${this.sessionData.roomid}`;
        if (!this.gameStarted) {
          const hasGameBegun = await DatabaseServices.findSessionByRoomID(this.sessionData.roomid);
          if (hasGameBegun.hasBegun) this.gameStarted = true;
        } 
      } else {
        this.visibilityState = false;
        document.title = 'Click Back!';
      }
    },
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

      // this.playerInfo.sort((a, b) => b.qnum - a.qnum);
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
          if (data.startEvent) this.$refs.waitingArea.startCountdown();
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
        this.ribbonAnimation = 'throb';
        if (this.qNumber < 18) {
          setTimeout(() => {
            this.ribbonAnimation = '';
          }, 800)
        }
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
  top: 0;
  height: 5vh;
  background-color: rgb(0, 132, 255);
}

.arrow-right {
  width: 0; 
  height: 0; 
  border-top: 1.5vh solid transparent;
  border-bottom: 1.5vh solid transparent;
  border-left: 1.5vh solid rgb(230, 41, 41);
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>