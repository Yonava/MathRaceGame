<template>
  <div class="main-container">

    <h1 class="main-title">Congratulations!</h1>

    <p style="margin-top: 0.5vh;">You Finished In {{ position }}{{ placementSuffix }} Place</p>

    <div class="large-buffer"></div>

    <b-icon class="trophy-icon" icon="trophy" animation="cylon-vertical"></b-icon>

    <div class="large-buffer"></div>

    <div style="display: flex; flex-direction: column;">

      <b-button class="standard-btn" v-on:click="encourage()" variant="success">Cheer On The Remaining Racers</b-button>
      <div class="small-buffer"></div>

      <p style="font-weight: bold; margin: 0px; margin-left: 24vw;">OR</p>

      <div class="small-buffer"></div>
      <b-button class="standard-btn" v-on:click="brag()" variant="danger">Trash Talk</b-button>

    </div>

    <div class="large-buffer"></div>
    <div class="large-buffer"></div>

    <p class="no-re-entry">Re-Entry Is Prohibited</p>
    <b-button class="standard-btn" v-on:click="$router.push('/')" variant="outline-danger">
      Exit Room
      <b-icon icon="door-open-fill"></b-icon>
    </b-button>
 
  </div>
</template>

<script>

// import GameDataTracker from "../functionality/updateGameData"
import DatabaseServices from '../DatabaseServices'

export default {
  data: () => {
    return {
      placementSuffix: undefined,
      position: 'Loading',
      positionList: []
    }
  },
  async created() {

    while (!this.positionList.includes(this.$parent.sessionData.clientName)) {

      const sessionDetails = await DatabaseServices.findSessionByRoomID(this.$parent.sessionData.roomid);
      // guard clause to catch if session doesn't exist anymore
      if (!sessionDetails) this.$router.push('/');
      sessionDetails.finalPositions.push(this.$parent.sessionData.clientName);

      await DatabaseServices.updateFinalPositions(this.$parent.sessionData.roomid, sessionDetails.finalPositions);
      const confirmRequest = await DatabaseServices.findSessionByRoomID(this.$parent.sessionData.roomid);
      this.positionList = confirmRequest.finalPositions;
      console.log(confirmRequest.finalPositions);
    }
      
    this.position = this.finalPositions.indexOf(this.$parent.sessionData.clientName) + 1;

    const userData = await DatabaseServices.findUser(this.$parent.sessionData.clientName);

    if (userData) {
      userData.gameData.push({
        incorrectAnswers: this.$parent.gameData.incorrectAnswers ?? 0,
        correctAnswers: this.$parent.gameData.correctAnswers ?? [],
        readyPressed: this.$parent.gameData.readyPressed ?? 0,
        difficulty: this.$parent.sessionData.difficulty,
        sessionDate: this.$parent.sessionData.date,
        position: this.position
      });
      
      DatabaseServices.updateUserData(this.$parent.sessionData.clientName, userData.gameData);
    }

    switch (this.position) {
      case 1:
        this.placementSuffix = 'st';
        break;
      case 2:
        this.placementSuffix = 'nd';
        break;
      case 3:
        this.placementSuffix = 'rd';
        break;
      default:
        this.placementSuffix = 'th';
        break;
    }
  },
  methods: {
    brag() {

      const brags = [
        `${this.$parent.sessionData.clientName}: I Am Better Than You`,
        `${this.$parent.sessionData.clientName}: Wake Me Up When You're Finished`,
        `${this.$parent.sessionData.clientName}: How Does It Feel To Be Below Me!`,
        `${this.$parent.sessionData.clientName}: It Really Takes You This Long???`,
        `${this.$parent.sessionData.clientName}: You Must Be Out of Practice...`,
        `${this.$parent.sessionData.clientName}: Can You Even Solve 1+1? Genuinely Curious.`,
        `${this.$parent.sessionData.clientName}: Statistically Speaking, I'm Smarter.`
      ];

      // this.$parent.gameData = GameDataTracker.trashTalked(this.$parent.gameData);
      const brag = brags[Math.floor(Math.random() * brags.length)];
      this.$parent.updateStandings(false, false, brag);
      this.$parent.annoucements.push(brag);
    },
    encourage() {

      const encouragements = [
        `${this.$parent.sessionData.clientName}: You Got This Guys!`,
        `${this.$parent.sessionData.clientName}: Almost There, Keep Focusing!`,
        `${this.$parent.sessionData.clientName}: Keep Your Eyes On The Prize!`,
        `${this.$parent.sessionData.clientName}: You Can Do It!`,
        `${this.$parent.sessionData.clientName}: Keep Up The Effort!`
      ];
      
      // this.$parent.gameData = GameDataTracker.encouragements(this.$parent.gameData);
      const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
      this.$parent.updateStandings(false, false, encouragement);
      this.$parent.annoucements.push(encouragement);
    }
  }
}
</script>

<style scoped>

.main-container {
  position: fixed; 
  left: 5vw; 
  top: 2vh;
}

.main-title {
  font-size: 23pt; 
  font-weight: bold; 
  margin: 0px
}

.trophy-icon {
  width: 10vw; 
  height: 5vh; 
  margin-left: 22vw;
}

.standard-btn {
  width: 55vw;
}

.no-re-entry {
  margin: 0px; 
  font-size: 8pt; 
  font-weight: bold;
}

</style>

