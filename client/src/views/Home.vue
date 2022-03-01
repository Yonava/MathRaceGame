<template>
  <div>

    <!-- Singleplayer Practice -->
    <div class="view-container" v-if="viewController[renderedView] === 'Practice'">
      <Practice />
    </div>

    <!-- Leaderboard -->
    <div class="view-container" v-else-if="viewController[renderedView] === 'Leaderboard'">
      <Leaderboard />
    </div>

    <!-- Multiplayer -->
    <div class="view-container" v-else-if="viewController[renderedView] === 'Multiplayer'">
      <Multiplayer />
    </div>

    <!-- Info Page -->
    <div class="view-container" v-else-if="viewController[renderedView] === 'Info'">
      <Info />
    </div>

    <div class="view-container" v-else>
      <p>Sessions Accessed Through {{ $parent.throughApp ? "App":"Browser"}}</p>
      <button @click="$router.push('/profile')">View Profile</button>
    </div>

    <!-- Navigation Panel -->
    <footer class="bottom">
      <div class="bottom-container">
        <div @click="switchView('Home')" class="nav-container">
          <img class="icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/1200px-Home-icon.svg.png" alt="home">
        </div>
        <div @click="switchView('Multiplayer')" class="nav-container">
          <img class="icon" src="https://www.pngitem.com/pimgs/m/391-3911003_multiplayer-visitor-icon-hd-png-download.png" alt="multiplayer">
        </div>
        <div @click="switchView('Practice')" class="nav-container">
          <img class="icon" src="https://previews.123rf.com/images/sarahdesign/sarahdesign1706/sarahdesign170600477/80760345-target-practice-icon.jpg" alt="singleplayer">
        </div>
        <div @click="switchView('Leaderboard')" class="nav-container">
          <img class="icon" src="https://cdn-icons-png.flaticon.com/512/4489/4489655.png" alt="singleplayer">
        </div>
        <div @click="switchView('Info')" class="nav-container">
          <img class="icon" src="https://www.pngitem.com/pimgs/m/195-1951784_info-icon-svg-transparent-background-information-icon-hd.png" alt="info">
        </div>
      </div>
    </footer> 

  </div>
</template>

<script>

import Practice from '../components/Practice.vue'
import Leaderboard from '../components/Leaderboard.vue'
import Multiplayer from '../components/Multiplayer.vue'
import Info from '../components/Info.vue'

export default {
  data: () => {
    return {
      viewController: ['Home', 'Practice', 'Leaderboard', 'Multiplayer', 'Info'],
      renderedView: 0
    }
  },
  components: {
    Practice,
    Leaderboard,
    Multiplayer,
    Info
  },
  mounted() {

  },
  created() {

  },
  destroyed() {

  },
  methods: {
    switchView(view) {
      this.renderedView = this.viewController.indexOf(view);
    }
  },
  watch: {
  }

}
</script>

<style scoped>
div.view-container {
  padding: 2.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
/* NAVIGATION DISPLAY */
.icon {
    height: 5vh;
    width: 5.3vh;
    margin-bottom: 0px;
}
.nav-container {
    height: 5vh;
    width: 5vh;
    margin-top: .5vh;
    margin-right: 7.5vw;
    margin-left: 7.5vw;
    margin-bottom: 0px;
}
.bottom-container {
    margin-top: .5vh;
    width: 90vw;
    justify-content: center;
    display: flex;
    background-color: white;
}
.bottom {
    height: 7.75vh;
    background-color: white;
    position: fixed;
    bottom: 0;
    min-width: 100vw;
    border-top: 1px black solid;
    display: flex;
    justify-content: center;
}
</style>
