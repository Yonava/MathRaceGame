<template>
  <div style="position: fixed; left: 5vw; top: 15vh;">

    <h1 style="font-size: 23pt; font-weight: bold; margin: 0px">Congratulations!</h1>

    <p style="margin-top: 0.5vh;">You Finished In {{ finalPosition }}{{ placementSuffix }} Place</p>

    <div class="large-buffer"></div>

    <b-icon style="width: 10vw; height: 10vh; margin-left: 22vw;" icon="trophy" animation="cylon-vertical"></b-icon>

    <div class="large-buffer"></div>

    <div style="display: flex; flex-direction: column;">
      <b-button style="width: 55vw;" variant="success">Cheer On The Remaining Racers</b-button>
      <div class="small-buffer"></div>
      <p style="font-weight: bold; margin: 0px; margin-left: 24vw;">OR</p>
      <div class="small-buffer"></div>
      <b-button style="width: 55vw;" variant="danger">Brag</b-button>
    </div>

    
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
        this.placementSuffix = 'st'
        break;
      case '2':
        this.placementSuffix = 'nd'
        break;
      default:
        this.placementSuffix = 'th'    
        break;
    }
  }
}
</script>

