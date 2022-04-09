<template>
  <div class="main-container">

    <h1 class="main-title">Congratulations!</h1>

    <p style="margin-top: 0.5vh;">You Finished In {{ finalPosition }}{{ placementSuffix }} Place</p>

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

export default {
  data: () => {
    return {
      finalPosition: undefined,
      placementSuffix: undefined
    }
  },
  props: [
    'position'
  ],
  created() {

    this.finalPosition = String(this.position);

    switch (this.finalPosition.substring(this.finalPosition.length-1)) {
      case '1':
        this.placementSuffix = 'st';
        break;
      case '2':
        this.placementSuffix = 'nd';
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
        `${this.$parent.sessionData.clientName}: Can You Even Solve 1+1? Geniunely Curious.`,
        `${this.$parent.sessionData.clientName}: Statistically Speaking, I'm Smarter.`
      ];

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
  width: 16vw; 
  height: 12vh; 
  margin-left: 19.5vw;
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

