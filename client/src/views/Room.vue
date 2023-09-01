<template>
  <div>

    <!-- Pre-Game Waiting Area -->
    <div v-if="!gameStarted">
      <WaitingArea
      ref="waitingArea"
      :host="sessionData.host"
      :playerData="playerInfo" />
    </div>


    <!-- Fixed Element Container -->
    <div v-else>

      <!-- Progress Side Bar -->
      <div class="progress-container">

        <b-icon-award-fill variant="warning" :animation="ribbonAnimation" class="ribbon"></b-icon-award-fill>

        <div class="progress-bar-outline">

          <div class="progress-bar-fill" :style="`height: ${(qNumber - 1) * 3}vh; background-color: rgb(0, ${255 - (qNumber * 7)}, 0);`"></div>

          <div class="opponent-container" :style="`bottom: ${((player.qnum - 1) * 3) - 1.25}vh;`" v-for="player in playerInfo" :key="player.id">
            <!--  -->
            <div class="inner-opponent-container" v-show="player.user !== sessionData.clientName && player.qnum <= 20">
              <span class="opponent-nametag">{{ player.user }}</span>
              <div class="arrow-right"></div>
            </div>

          </div>

        </div>
      </div>

      <!-- Announcement Display -->
      <div class="announcement-container">
        <p class="announcement-title">announcements:</p>

        <div class="large-buffer"></div>
        <div class="small-buffer"></div>

        <div>
          <p :style="shiftAnnouncementTxt" class="announcement-txt">{{ announcements.slice().reverse()[0] }}</p>
          <p :style="shiftAnnouncementTxt" class="announcement-txt">{{ announcements.slice().reverse()[1] }}</p>
          <p :style="shiftAnnouncementTxt" class="announcement-txt">{{ announcements.slice().reverse()[2] }}</p>
          <p :style="shiftAnnouncementTxt" class="announcement-txt">{{ announcements.slice().reverse()[3] }}</p>
          <p :style="shiftAnnouncementTxt" class="announcement-txt">{{ announcements.slice().reverse()[4] }}</p>
        </div>

      </div>

      <!-- Room ID Display At Bottom Of Screen -->
      <p class="roomid-display-txt">math-race-game.herokuapp.com/go/{{ sessionData.roomid }}</p>

    </div>

    <!-- Race Area -->
    <div v-if="gameStarted && qNumber < (sessionData.questions.length + 1)">

      <!-- Question Panel -->
      <div class="cooldown-bar" :style="`${cooldownActive ? `width: 0vw; transition: ${cooldownDuration}ms;`:'width: 100vw;'};`"></div>

      <div class="prompt-container">
        <p class="task-display">{{ sessionData.questions[qNumber - 1].task }}</p>
        <vue-mathjax class="mathjax" :style="`color: ${hideMathjaxPrerender}`" :formula="sessionData.questions[qNumber - 1].equation"></vue-mathjax>
      </div>

      <div class="options-buffer"></div>

      <!-- FOR ADMIN TESTING ONLY -->
      <button v-show="sessionData.clientName === 'YonaVA'" v-on:click="qNumber++">answer</button>
      <!-- <button v-on:click="console">log gamedata</button>  -->

      <div class="options-container">
        <div v-for="option in sessionData.questions[qNumber - 1].options" :key="option.id">
          <b-button pill :disabled="cooldownActive" class="option-btn" variant="primary" @click="checkAnswer(option)">{{ option }}</b-button>
        </div>
      </div>

    </div>

    <!-- Post Race Area -->
    <div v-if="qNumber > 20 && gameStarted">
      <Congrats />
    </div>

  </div>
</template>

<script>

import io from "socket.io-client"
import WaitingArea from "../components/WaitingArea.vue"
import Congrats from "../components/Congrats.vue"
import DatabaseServices from "../DatabaseServices.js"
import GameDataTracker from "../functionality/updateGameData"

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

      /* stores session object pulled from database */
      sessionData: null,

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

      announcements: [],

      /* first message displayed through announcements when game starts */
      startMessage: 'And We Are Off To The Races!',

      /* styling the push down effect when new announcements are broadcast */
      shiftAnnouncementTxt: '',

      timeTracker: 0,

      gameData: {}
    };
  },
  components: {
    WaitingArea,
    Congrats
  },
  mounted() {
    if (this.sessionData.roomid === undefined) {
      this.$router.push('/');
    } else {

      if (this.sessionData.hasBegun) this.gameStarted = this.sessionData.hasBegun;
      this.connect();

      if (localStorage.raceData) {
        if (localStorage.raceData.substring(0, 4) == this.sessionData.roomid) {
          if (parseInt(localStorage.raceData.substring(6)) > 20) this.$router.push('/');
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
    document.addEventListener('visibilitychange', this.visibilityHandler);

    // ensures client pings the server every 250 milliseconds
    this.refreshConnection = setInterval(() => {
      if (this.visibilityState) this.updateStandings();
      if (this.gameStarted) this.timeTracker += 500;
    }, 500);


    this.checkRefreshTimers = setInterval(() => {

      // check timers on players
      for (let i = 0; i < this.playerInfo.length; i++) {
        this.playerInfo[i].refreshTimer -= 250;
        if (this.playerInfo[i].refreshTimer < 0) {
          this.playerInfo.splice(i, 1);
          this.announcements.push(`${this.playerList[i]} Left Us :(`);
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
    console() {
      console.table(this.gameData)
    },
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
        this.announcements.push(`${data.user} Joined Up!`);
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
        "scoreReceived", (data) => {

          this.updatePlayerInfo(data);
          this.detectInboundConnection = 3000;

          if (data.broadcastMessage) return this.announcements.push(data.broadcastMessage);

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

        this.gameData = GameDataTracker.questionAnsweredCorrectly(this.gameData, this.timeTracker);
        this.timeTracker = 0;

        if (this.qNumber < 18) {
          setTimeout(() => {
            this.ribbonAnimation = '';
          }, 800)
        }
      } else {
        this.gameData = GameDataTracker.questionAnsweredIncorrectly(this.gameData);
        this.cooldownActive = true;
        setTimeout(() => {
          this.cooldownActive = false;
        }, this.cooldownDuration)
      }
    },
    updateStandings(startEvent = false, broadcastMessage = '') {

      const data = {
        qnum: this.qNumber,
        user: this.sessionData.clientName,
        isUserReady: this.isUserReady,
        refreshTimer: this.refreshTimer,
        broadcastMessage,
        startEvent
      };

      this.updatePlayerInfo(data);
      this.socketInstance.emit('score', data, this.sessionData.roomid);

      if (startEvent) {
        setTimeout(() => {
          DatabaseServices.sessionStarted(this.sessionData.roomid);
        }, 10000); // Countdown Time Accounted For
      }
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
      }, 200);

      switch (this.qNumber) {
        case 12:
          this.announcements.push(`${this.sessionData.clientName} Is Half Way There!`);
          this.updateStandings(false, `${this.sessionData.clientName} Is Half Way There!`);
          break;
        case 18:
          this.announcements.push(`${this.sessionData.clientName} Is About To Finish!`);
          this.updateStandings(false, `${this.sessionData.clientName} Is About To Finish`);
          break;
      }
    },
    gameStarted() {
      this.announcements = [this.startMessage];
    },
    announcements() {

      this.shiftAnnouncementTxt = 'transform: translateY(50%); color: limegreen;';
      setTimeout(() => {
        this.shiftAnnouncementTxt = '';
      }, 200)
    }
  },
}
</script>

<style scoped>

/* Annoucement System */

.announcement-txt {
  font-size: 9pt;
  margin-bottom: 0%;
  transition: 200ms;
}

.announcement-container {
  position: fixed;
  bottom: 0;
  width: 65vw;
  height: 30vh;
  left: 2vw;
  background-color: white;
}

.announcement-title {
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14pt
}

/* Misc */

.roomid-display-txt {
  position: fixed;
  bottom: 0;
  margin-bottom: 0px;
  margin-left: 0.5vw;
  font-weight: bold;
  width: 100vw;
  background-color: white;
  user-select: default;
  font-size: 10pt;
}

/* Progress Display */

.ribbon {
  margin-bottom: 1vh;
  width: 9vw;
  height: 9vw;
}

.progress-bar-fill {
  position: absolute;
  width: 10vw;
  bottom: 0;
  transition: 500ms;
  border-bottom: 1px solid black;
}

.progress-bar-outline {
  border: 1px solid black;
  border-right: none;
  height: 60vh;
  width: 10vw;
}

.progress-container {
  display: flex;
  flex-direction: column;
  right: 0;
  top: 0;
  margin-top: 15vh;
  position: fixed;
  justify-content: center;
  align-items: center
}

.opponent-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  transition: 500ms;
  right: 11vw;
  z-index: 5;
}

.inner-opponent-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.arrow-right {
  width: 0;
  height: 0;
  border-top: 1.5vh solid transparent;
  border-bottom: 1.5vh solid transparent;
  border-left: 1.5vh solid rgb(230, 41, 41);
  margin-left: 1vw;
}

.opponent-nametag {
  font-size: 10pt;
  font-weight: bold;
}

/* Question Display */

.task-display {
  text-decoration: underline;
  font-weight: bold
}

.cooldown-bar {
  position: fixed;
  top: 0;
  height: 5vh;
  background-color: rgb(0, 132, 255);
}

.mathjax {
  font-size: 16pt;
  position: absolute;
  bottom: 0;
}

.prompt-container {
  background-color: white;
  position: fixed;
  left: 0;
  top: 15vh;
  height: 12.5vh;
  width: 55vw;
  margin-left: 7.5vw;
}

.options-buffer {
  width: 100vw;
  height: 30vh;
  background-color: white;
  z-index: -1
}

.options-container {
  display: flex;
  flex-direction: column;
  margin-left: 7.5vw;
  position: fixed;
}

.option-btn {
  margin-top: 1vh;
  width: 55vw;
}

</style>