<template>
  <div>

    <div class="wait-top-card">

      <div class="roomid-display">Room {{ $parent.sessionData.roomid }}</div>

      <div class="center">
        <p style="margin: 0%;"><b>{{ countdownTimer === 10 ? 'Waiting For Players To Join...':`Race Is Beginning In ${countdownTimer}` }}</b></p>
      </div>

      <div style="flex-direction: row;" class="center tool-bar">
        <b-button style="margin-right: 1vw; width: 40vw; height: 6vh;" :variant="$parent.isUserReady ? 'success':'danger'" v-on:click="toggleReadiness()">
          {{ $parent.isUserReady ? 'Ready!':'Not Ready' }}
        </b-button>
        <b-button v-show="$parent.sessionData.clientName === $parent.sessionData.host" v-on:click="beginGame()" style="margin-left: 1vw; width: 40vw; height: 6vh;" variant="primary">
          Start Game
        </b-button>
      </div>

      <h1 class="list-title">Participants:</h1>
    
    </div>

    <div style="margin-top: 21vh; width: 100vw;"></div>

    <div class="user-container">
      <!-- client user -->
      <div class="users" :style="`${$parent.isUserReady ? `background-color: #28a745; ${readyTransition}`:`background-color: #dc3545; ${readyTransition}`}`">
        <p style="color: white; font-size: 15pt; margin: 2%;">{{ $parent.sessionData.clientName }}</p>
      </div>

      <!-- all users minus client user -->
      <div v-for="player in playerData" :key="player.id">
        <div class="users" v-show="player.user !== $parent.sessionData.clientName" style="width: 96vw; margin-top: 1vh;" :style="`${player.isUserReady ? 'background-color: #28a745;':'background-color: #dc3545;'}`">
          <p style="color: white; font-size: 15pt; margin: 2%;">{{ player.user }}</p>
        </div>
      </div>
    </div>

    <div class="center">
      <b-button style="position: fixed; bottom: 2.5%; width: 60vw;" variant="outline-danger" v-on:click="$router.push('/')">Leave Session</b-button>
    </div>

  </div>
</template>

<script>

export default {
  data: () => {
    return {
      readyTransition: 'width: 96vw;',
      countdownTimer: 10
    };
  },
  props: [
    'playerData',
    'host'
  ],
  created() {
    this.refresh = setInterval(() => {
      this.$forceUpdate();
    }, 250)
  },
  destroyed() {
    clearInterval(this.refresh);
  },
  methods: {
    toggleReadiness() {
      this.$parent.isUserReady = !this.$parent.isUserReady;
      this.readyTransition = 'width: 3vw;';
      setTimeout(() => {
        this.readyTransition = 'width: 96vw;'
      }, 200)
    },
    beginGame() {
      this.$parent.updateStandings(true);
      this.startCountdown();
    },
    startCountdown() {
      console.log('starting countdown')
      this.countdownTimer--;
      this.countdown = setInterval(() => {
        this.countdownTimer--;
        if (this.countdownTimer === 0) {
          clearInterval(this.countdown);
          this.$parent.gameStarted = true;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>

.roomid-display {
  width: 13vw;
  height: 2%;
  position: fixed;
  font-size: 50%;
  font-weight: bold;
  margin: 1vw;
  background-color:rgb(161, 47, 47);
  color: white;
  display: flex;
  justify-content: center;
  padding: 0.25%;
  border-radius: 5px;
}

.wait-top-card {
  background-color: rgb(238, 238, 238);
  position: fixed;
  top: 0%;
  height: 20vh;
  width: 100vw;
  border-bottom: 1px solid black;
}

.tool-bar {
  margin: 3vh;
}

.list-title {
  position: absolute;
  bottom: 2.5%;
  font-weight: bold;
  margin-left: 2%;
  margin-bottom: 0%;
  font-size: 4vh;
}

.user-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.users {
  height: 6.5vh;
  display: flex; 
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: 200ms ease-in-out;
}

</style>
