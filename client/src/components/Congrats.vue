<template>
  <div style="position: fixed; left: 5vw; top: 2vh;">

    <h1 style="font-size: 23pt; font-weight: bold; margin: 0px">Congratulations!</h1>

    <p style="margin-top: 0.5vh;">You Finished In {{ finalPosition }}{{ placementSuffix }} Place</p>

    <div class="large-buffer"></div>

    <b-icon style="width: 16vw; height: 12vh; margin-left: 19.5vw;" icon="trophy" animation="cylon-vertical"></b-icon>

    <div class="large-buffer"></div>

    <div style="display: flex; flex-direction: column;">

      <b-button style="width: 55vw;" v-on:click="encourage()" variant="success">Cheer On The Remaining Racers</b-button>
      <div class="small-buffer"></div>

      <p style="font-weight: bold; margin: 0px; margin-left: 24vw;">OR</p>

      <div class="small-buffer"></div>
      <b-button style="width: 55vw;" v-on:click="brag()" variant="danger">Brag</b-button>

    </div>
    <div class="large-buffer"></div>
    <div class="large-buffer"></div>

    <p style="margin: 0px; font-size: 8pt; font-weight: bold;">Re-Entry Is Prohibited</p>
    <b-button style="width: 55vw;" variant="outline-danger">
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

