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

      <button v-on:click="qNumber++" style="">answer</button>
      <!-- <p>{{ Math.floor(secondsPassed / 60) }}:{{ secondsPassed - Math.floor(secondsPassed / 60) * 60 }}</p> -->

      <!-- Progress Side Bar -->
      <div class="progress-container" style="display: flex; flex-direction: column; right: 0; top: 0; margin-top: 15vh; position: fixed; justify-content: center; align-items: center">

        <b-icon-award-fill variant="warning" :animation="ribbonAnimation" style="margin-bottom: 1vh; width: 9vw; height: 9vw;"></b-icon-award-fill>

        <div style="border: 1px solid black; border-right: none; height: 60vh; width: 10vw;">

          <div :style="`position: absolute; height: ${(qNumber - 1) * 3}vh; width: 10vw; bottom: 0; background-color: rgb(0, ${255 - (qNumber * 7)}, 0); transition: 500ms; border-bottom: 1px solid black;`"></div>

          <div :style="`display: flex; flex-direction: row; align-items: center; position: absolute; transition: 500ms; right: 11vw; bottom: ${((player.qnum - 1) * 3) - 1.25}vh; z-index: 5;`" v-for="player in playerInfo" :key="player.id">
            <!--  -->
            <div :style="`display: flex; flex-direction: row; align-items: center;`" v-show="player.user !== sessionData.clientName">
              <span style="font-size: 10pt; font-weight: bold;">{{ player.user }}</span>
              <div style="margin-left: 1vw;" class="arrow-right"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Question Panel -->

      <div class="cooldown-bar" :style="`${cooldownActive ? `width: 0vw; transition: ${cooldownDuration}ms;`:'width: 100vw;'}; z-index: -6;`"></div>

      <div style="background-color: white; position: fixed; left: 0; top: 17.5vh; height: 15vh; width: 55vw; margin-left: 7.5vw;">
        <p style="text-decoration: underline; font-weight: bold">{{ sessionData.questions[qNumber - 1].task }}</p>
        <vue-mathjax class="mathjax" :style="`color: ${hideMathjaxPrerender}`" :formula="sessionData.questions[qNumber - 1].equation"></vue-mathjax>
        <p class="mathjax" ></p>
      </div>

      <div style="width: 100vw; height: 30vh; background-color: white; z-index: -1"></div>

      
      <div style="display: flex; flex-direction: column; margin-left: 7.5vw; position: fixed;">
        <div v-for="option in sessionData.questions[qNumber - 1].options" :key="option.id">
          <b-button pill :disabled="cooldownActive" style="margin-top: 1vh; width: 55vw;" variant="primary" @click="checkAnswer(option)">{{ option }}</b-button>
        </div>
      </div>

      <div style="position: fixed; bottom: 0; width: 55vw; height: 30vh; left: 7vw; border-top: 1px solid black; background-color: white;">
        <p style="font-weight: bold; position: absolute; top: 0; left: 0;">Annoucements:</p>
        <p style="margin-top: 3.5vh; font-size: 9pt;">Race Annoucements Coming Soon!</p>
      </div>
      
   

    </div>

    <div v-else>
      <Congrats
      :position="position" />
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

      hideMathjaxPrerender: '',

      position: 1
    };
  },
  components: {
    WaitingArea,
    Congrats
  },
  mounted() {

    // this line for testing purposes only!
    // localStorage.raceData = '';
    // this.sessionData = {"_id":"6250d63ae42bc5193289755b","roomid":"6225","questions":[{"equation":"$$2**1$$","task":"Evaluate","answer":2,"options":[2,1,0,3]},{"equation":"$$8*2$$","task":"Evaluate","answer":16,"options":[24,21,13,16]},{"equation":"$$6+4$$","task":"Evaluate","answer":10,"options":[8,10,6,5]},{"equation":"$$0.89+1.45$$","task":"Evaluate","answer":2.34,"options":[1.78,2.34,3.16,2.27]},{"equation":"$$\\sqrt{361} + 7-5$$","task":"Evaluate","answer":21,"options":[18,28,11,21]},{"equation":"$$7**3$$","task":"Evaluate","answer":343,"options":[220,401,281,343]},{"equation":"$$3**3$$","task":"Evaluate","answer":27,"options":[36,21,35,27]},{"equation":"$$\\sqrt{121} + 18-17$$","task":"Evaluate","answer":12,"options":[9,8,12,10]},{"equation":"$$(9+9)^0$$","task":"Evaluate","answer":1,"options":[4,2,1,3]},{"equation":"$$(5+7)^2$$","task":"Evaluate","answer":144,"options":[216,150,202,144]},{"equation":"$$(7+6)^2$$","task":"Evaluate","answer":169,"options":[169,211,144,93]},{"equation":"$$8c + 6 = 7$$","task":"Solve for c","answer":0.13,"options":[0.12,0.15,0.13,0.08]},{"equation":"$$9x = 7$$","task":"Solve for x","answer":0.78,"options":[0.51,0.9,0.72,0.78]},{"equation":"$$2x = 3$$","task":"Solve for x","answer":1.5,"options":[1.56,2.13,1.33,1.5]},{"equation":"$$$$","task":"Find the area of the rectangle with  length 17.1 and width 5.8.","answer":99.18,"options":[94.22,146.79,90.25,99.18]},{"equation":"$$$$","task":"Find the area of the rectangle with  length 7.5 and width 5.2.","answer":39,"options":[39,38,42,43]},{"equation":"$$$$","task":"Find the area of the rectangle with  length 7.67 and width 12.92.","answer":99.1,"options":[123.88,131.8,99.1,113.96]},{"equation":"$$5cos({\\pi\\over2})$$","task":"Evaluate","answer":0,"options":[0,1,3,-1]},{"equation":"$$9sin({\\pi})$$","task":"Evaluate","answer":0,"options":[-3,-1,0,1]},{"equation":"$$3cos({\\pi})$$","task":"Evaluate","answer":-3,"options":[-4,-6,-2,-3]}],"date":"2022-04-09T00:41:30.460Z","host":"2xLogger","difficulty":"Easy","hasBegun":true,"__v":0}
    
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

    document.title = `Race ${this.sessionData.roomid}`;

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
          this.position = data.position;
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
    updateStandings(startEvent = false, finished = false) {

      const data = {
        qnum: this.qNumber,
        user: this.sessionData.clientName,
        isUserReady: this.isUserReady,
        refreshTimer: this.refreshTimer,
        position: this.position + finished ? 1:0,
        startEvent
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
    qNumber() {
  
      this.hideMathjaxPrerender = 'white';
      setTimeout(() => {
        this.hideMathjaxPrerender = '';
      }, 200)

      if (this.qNumber > 20) {
        this.updateStandings(false, true);
      }
    }
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

.mathjax {
  font-size: 16pt; 
  position: absolute;
  bottom: 0;
}
</style>