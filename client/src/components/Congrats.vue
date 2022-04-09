<template>
  <div>
    <h1>Congrats, You Completed The Math Race!</h1>
    <br>
    <p>You Finished in {{ finalPosition }}{{ placementSuffix }} Place!</p>
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

