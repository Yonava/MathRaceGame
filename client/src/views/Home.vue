<template>
  <div>

    <!-- View Controller -->

    <!-- Join Room -->
    <transition name="slide">
      <div style="position:fixed; z-index: 3;" class="view-container" v-if="(viewController || viewSelected) === 'JoinSession'">
        <JoinSession />
      </div>
    </transition>

    <!-- Create New Room -->
    <transition name="slide">
      <div style="position:fixed; z-index: 3;" class="view-container" v-if="(viewController || viewSelected) === 'CreatingSession'">
        <CreateNewRoom :username="username" /> 
      </div>
    </transition>

    <!-- Singleplayer Practice -->
    <div class="view-container" v-if="viewController === 'Practice'">
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

    <div class="home-container" v-if="!viewController || !viewSelected">

      <div>
        <b-icon-person style="width: 5ch; height: 5ch; border: 1.5px solid black; border-radius: 25px; padding: 8%;"></b-icon-person>
      </div>

      <!-- Session Details -->
      <p style="font-size: 9pt;">Session Accessed Through {{ $parent.throughApp ? "App":"Browser"}}</p>

      <!-- Sign In Form -->
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input v-model="username"></b-form-input>
        <b-input-group-append>
          <b-button :variant="searchColor"></b-button>
        </b-input-group-append>
      </b-input-group>

      <p class="error-msg-transition" :style="errorMsg ? 'color:red;transform:translateY(0%)':'color:rgba(0,0,0,0);transform:translateY(50%)'">{{  errorMsg ? errorMsg:'placeholder'}}</p>

      <p class="error-msg-transition" :style="(errorMsg || !username) ? 'translateY(0%)':'color:rgba(0,0,0,0);transform:translateY(50%)'">Enter A Valid Username To Unlock</p>

      <button class="btn btn-info btn-lg main-menu-button" :disabled="errorMsg || !username" @click="$router.push(`/profile/${username}`)">View Profile</button>

      <!-- Connect to Multiplayer Sessions -->

      <b-button variant="secondary" pill class="btn-lg main-menu-button" :disabled="errorMsg || !username" @click="switchView('JoinSession', true)">
        <div style="position: relative">
          <span>Join Session</span>
          <b-icon-chevron-right style="position: absolute; left: 90%; margin-top: 0.5vh;"></b-icon-chevron-right>
        </div>
      </b-button>

      <b-button variant="primary" pill class="btn-lg main-menu-button" :disabled="errorMsg || !username" @click="switchView('CreatingSession', true)">
        <div style="position: relative">
          <span>Create Session</span>
          <b-icon-chevron-right style="position: absolute; left: 90%; margin-top: 0.5vh;"></b-icon-chevron-right>
        </div>
      </b-button>

      <!-- End Connect to Multiplayer Sessions -->

      <button class="btn btn-outline-danger btn-lg main-menu-button" v-on:click="deleteSession('all')">
        Delete All Sessions
      </button>

    </div>

    <!-- End of Main Menu Content -->

    <br><br><br><br><br>


    <!-- Bottom Nav Bar -->
    <footer style="z-index:8;" class="bottom">
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
import JoinSession from '../components/JoinRoom.vue'
import Info from '../components/Info.vue'
import DatabaseServices from '../DatabaseServices.js'

export default {
  data: () => {
    return {

      /* both work in tandem to create an offset for 
      allowing smooth transition animation rendering */
      viewController: '',
      viewSelected: '',

      username: '',
      errorMsg: '',

      searchColor: 'warning',
    }
  },
  components: {
    Practice,
    Leaderboard,
    CreateNewRoom,
    Info,
    JoinSession
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
    switchView(view, isEntering = false) {

      if (!isEntering) {
        this.viewController = view;
        this.viewSelected = view;
        return;
      }

      this.viewController = view;
      setTimeout(() => {
        this.viewSelected = view;
      }, 250); // set transition duration to what is in component transition class
    },
    async deleteSession(session) {

      if (session === 'all') {
        const sessions = await DatabaseServices.getAllSessions();
        for (let i in sessions) DatabaseServices.deleteSessionByRoomID(sessions[i].roomid);
        return;
      }
      
      DatabaseServices.deleteSessionByRoomID(session)

      this.sessionDeletedMsg = true;
      setTimeout(() => {
        this.sessionDeletedMsg = false;
      }, 3000);
    }
  },
  watch: {
    username() {

      this.errorMsg = validateUsername(this.username.trim());

      if (!this.errorMsg)
        localStorage.username = this.username;
      
      if (this.errorMsg || !this.username) {
        this.searchColor = 'danger'
        this.joiningRoom = false;
      } else {
        this.searchColor = 'success'
      }
    }
  }

}
</script>

<style scoped>

/* New CSS Elements */

/* Component Transitions! */
.error-msg-transition {
  transition: 300ms;
  font-weight: bold;
}

.slide-enter-active, .slide-leave-active {
  transform: translateX(0%);
  transition: 250ms ease-in-out;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}

div.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5%;
}

/* Main Menu Buttons */
.main-menu-button {
  width: 50vw;
  margin: 2%;
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
