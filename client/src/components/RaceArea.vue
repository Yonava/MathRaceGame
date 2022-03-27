<template>
  <div>

    <div>

      <!-- <b-icon-award></b-icon-award> -->
      <div :style="`height: ${(playerData[$parent.clientIndex].qnum - 1) * 3}vh;`" class="display-pole"></div>
      <div class="progress-pole"></div>
      <div v-for="player in playerData" :key="player.id">
        <div class="player-arrow"></div>
      </div>
      
    </div>

    <div class="display-questions">
      <b-button variant="primary" @click="$parent.questionAnswered()">Answer a question</b-button>
      <br><br>
      <div v-for="player in playerData" :key="player.id">
        <p>
          <b>{{ player.user }} is on question {{ player.qnum }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: () => {
    return {

    };
  },
  props: [
    'playerData'
  ],
  mounted() {
  },
  created() {
    this.refresh = setInterval(() => {
      this.$forceUpdate();
      console.log()
    }, 100)
  },
  destroyed() {
    clearInterval(this.refresh);
  }
}
</script>

<style scoped>

.display-pole {
  bottom: 15%;
  right: 0%;
  position: fixed;
  width: 3vw;
  background-color: rgb(145, 255, 126);
  transition: 300ms ease-in-out;
}

.progress-pole {
  bottom: 15%;
  right: 0%;
  position: fixed;
  height: 70vh;
  width: 3vw;
  border: 1px solid black;
  border-right: none;
}

.player-arrow {

}

.display-questions {
  position: fixed;
  padding: 2.5%;
  max-width: 85vw;
}

</style>
