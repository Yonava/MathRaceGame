<template>
  <div>
    <div>
      <b-card no-body>
        <b-tabs card>

          <b-tab v-on:click="winners()" title="Champions" active>
            <p style="font-size: 18pt; font-weight: bold;">Races Won:</p>
            <div v-for="player in playerData" :key="player.id">
              <p :style="`color: ${player.user === username ? 'red':''}`">{{ playerData.indexOf(player) + 1 }}. {{ player.user }} {{ player.racesWon }}</p>
            </div>
          </b-tab>

          <b-tab v-on:click="fastest()" title="Fastest">
            <p style="font-size: 18pt; font-weight: bold;">Avg. Time For Correct Answer:</p>
            <div v-for="player in playerData" :key="player.id">
              <p :style="`color: ${player.user === username ? 'red':''}`">{{ playerData.indexOf(player) + 1 }}. {{ player.user }} {{ player.timeTaken }}</p>
            </div>
          </b-tab>

          <b-tab v-on:click="prepared()" title="Most Prepared">
            <p style="font-size: 18pt; font-weight: bold;">Times 'Ready!' Pressed:</p>
            <div v-for="player in playerData" :key="player.id">
              <p :style="`color: ${player.user === username ? 'red':''}`">{{ playerData.indexOf(player) + 1 }}. {{ player.user }} {{ player.readyPressed }}</p>
            </div>
          </b-tab>

        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>

import DatabaseServices from '../DatabaseServices'
import gameDataParser from '../functionality/gameDataParser'

export default {

  data: () => {
    return {

      completeData: undefined,
      playerData: [],
      username: undefined,
    }
  },
  async created() {

    document.title = 'Leaderboard - Math Race';
    this.username = localStorage?.username;

    this.completeData = await DatabaseServices.getAllUsers();
    for (let i = 0; i < this.completeData.length; i++) {
      const gameData = gameDataParser(this.completeData[i].gameData);
      gameData.user = this.completeData[i].username;
      this.playerData.push(gameData);
    }

    this.winners();
  },
  methods: {
    winners() {
      this.playerData.sort((a, b) => b.racesWon - a.racesWon);
    },
    prepared() {
      this.playerData.sort((a, b) => b.readyPressed - a.readyPressed);
    },
    fastest() {
      this.playerData.sort((a, b) => a.timeTaken - b.timeTaken);
    }
  }
}
</script>

<style scoped>

</style>