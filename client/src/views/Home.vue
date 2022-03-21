<template>
  <div>


    <!-- View Controller -->

    <!-- Create New Room -->
    <div class="view-container" v-if="viewController === 'CreatingSession'">
      <CreateNewRoom :username="username" />
    </div>

    <!-- Singleplayer Practice -->
    <div class="view-container" v-else-if="viewController === 'Practice'">
      <Practice />
    </div>

    <!-- Leaderboard -->
    <div class="view-container" v-else-if="viewController === 'Leaderboard'">
      <Leaderboard />
    </div>

    <!-- Info Page -->
    <div class="view-container" v-else-if="viewController === 'Info'">
      <Info />
    </div>

    <!-- End of View Controller -->


    <!-- Main Menu Content -->

    <div class="view-container" v-else>
      <p>Sessions Accessed Through {{ $parent.throughApp ? "App":"Browser"}}</p>
      <button @click="$router.push(`/profile/${username}`)">View Profile</button>
      <button @click="consolelog()">Console Log!</button>
      <input type="text" v-model="username" placeholder="enter username">
      <p style="color:red;font-weight:bold;">{{ errorMsg }}</p>

      <!-- Connect to Multiplayer Sessions -->
      <b-button :disabled="errorMsg || !username" variant="primary" @click="switchView('CreatingSession')">Create Session</b-button>
      <b-button :disabled="errorMsg || !username" variant="secondary" @click="joinSession()">Join Session</b-button>
      <input v-show="joiningRoom" v-model="roomidInput" placeholder="enter room id" type="number">
      <b-button v-show="roomidInput.length === 4" v-on:click="$router.push(`/go/${roomidInput}`)" variant="success">Go!</b-button>

    </div>

    <!-- End of Main Menu Content -->



    <!-- Bottom Nav Bar -->
    <footer v-show="!$parent.inGame" class="bottom">
      <div class="bottom-container">
        <div @click="switchView('')" class="nav-container">
          <img class="icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/1200px-Home-icon.svg.png" alt="home">
        </div>
        <div @click="switchView('Practice')" class="nav-container">
          <img class="icon" src="https://previews.123rf.com/images/sarahdesign/sarahdesign1706/sarahdesign170600477/80760345-target-practice-icon.jpg" alt="singleplayer">
        </div>
        <div @click="switchView('Leaderboard')" class="nav-container">
          <img class="icon" src="https://cdn-icons-png.flaticon.com/512/4489/4489655.png" alt="singleplayer">
        </div>
        <div @click="switchView('Info')" class="nav-container">
          <img class="icon" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="singleplayer">
        </div>
      </div>
    </footer> 

  </div>
</template>

<script>

import validateUsername from '../functionality/usernameValidation.js'
import Practice from '../components/Practice.vue'
import Leaderboard from '../components/Leaderboard.vue'
import CreateNewRoom from '../components/CreateNewRoom.vue'
import Info from '../components/Info.vue'

export default {
  data: () => {
    return {
      viewController: '',
      joiningRoom: false,
      username: '',
      errorMsg: '',
      roomidInput: ''
    }
  },
  components: {
    Practice,
    Leaderboard,
    CreateNewRoom,
    Info
  },
  mounted() {
    // checks if username is on file, and if so, sets username data to it
    if (localStorage?.username !== undefined) {
      this.username = localStorage.username;
    }
  },
  created() {

  },
  destroyed() {

  },
  methods: {
    switchView(view) {
      this.viewController = view;
    },
    consolelog() {
      this.$router.push({ name: 'Room', params: { sessionObject: { myname: 'yona' }}})
    },
    joinSession() {
      this.joiningRoom = !this.joiningRoom;
    }
  },
  watch: {
    username() {

      this.errorMsg = validateUsername(this.username.trim());

      if (!this.errorMsg)
        localStorage.username = this.username;
    }
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
    margin-right: 5vw;
    margin-left: 5vw;
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
