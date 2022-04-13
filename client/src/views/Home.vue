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
        <CreateNewRoom /> 
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

    <div style="position: fixed;" v-if="!viewController || !viewSelected">

      <div class="profile-btn-container" @click="$router.push(`/profile/${username}`)">
        <span style="margin-right: 2vw;"><b>{{ username ? `${username}`:'Sign In' }}</b></span>
        <b-avatar :text="username ? `${username[0]}`:''"></b-avatar>
      </div>

      <div class="x-large-buffer"></div>
      <div class="x-large-buffer"></div>

      <!-- Session Details -->
      <!-- <p style="font-size: 9pt;">Session Accessed Through {{ $parent.throughApp ? "App":"Browser"}}</p> -->

      <div class="center">

        <b-button v-show="!username" class="main-menu-button" @click="$router.push('/sign-in')" variant="info">Sign In To Create Sessions</b-button> 
        <div v-show="!username" class="large-buffer"></div> 

        <!-- Connect to Multiplayer Sessions -->

        <b-button variant="primary" pill class="btn-lg main-menu-button" :disabled="!username" @click="switchView('CreatingSession', true)">
          <div style="position: relative">
            <span>Create Session</span>
            <b-icon-chevron-right style="position: absolute; left: 95%; margin-top: 0.5vh;"></b-icon-chevron-right>
          </div>
        </b-button>

        <b-button variant="secondary" pill class="btn-lg main-menu-button" @click="switchView('JoinSession', true)">
          <div style="position: relative">
            <span>Join Session</span>
            <b-icon-chevron-right style="position: absolute; left: 95%; margin-top: 0.5vh;"></b-icon-chevron-right>
          </div>
        </b-button>

        <!-- End Connect to Multiplayer Sessions -->

        <!-- <button style="position: fixed; bottom: 10%" class="btn btn-outline-danger btn-lg main-menu-button" v-on:click="deleteSession('all')">
          Delete All Sessions
        </button> -->

      </div>

    </div>

    <!-- End of Main Menu Content -->

    <br><br><br><br><br>


    <!-- Bottom Nav Bar -->
    <footer style="z-index:8;" class="bottom">
      <div class="bottom-container">
        <div @click="switchView('')" class="nav-container">
          <b-icon class="icon" :icon="`house${viewController === '' ? '-fill':''}`"></b-icon>
          <p class="icon-txt">Home</p>
        </div>
        <div @click="switchView('Practice')" class="nav-container">
          <b-icon class="icon" :icon="`vinyl${viewController === 'Practice' ? '-fill':''}`"></b-icon>
          <p class="icon-txt">Practice</p>
        </div>
        <div @click="switchView('Leaderboard')" class="nav-container">
          <b-icon class="icon" :icon="`star${viewController === 'Leaderboard' ? '-fill':''}`"></b-icon>
          <p class="icon-txt">Leaderboard</p>
        </div>
        <div @click="switchView('Info')" class="nav-container">
          <b-icon class="icon" :icon="`info-circle${viewController === 'Info' ? '-fill':''}`"></b-icon>
          <p class="icon-txt">Info</p>
        </div>
      </div>
    </footer> 

  </div>
</template>

<script>

import Practice from '../components/Practice.vue'
import Leaderboard from '../components/Leaderboard.vue'
import CreateNewRoom from '../components/CreateNewRoom.vue'
import JoinSession from '../components/JoinRoom.vue'
import Info from '../components/Info.vue'
import DatabaseServices from '../DatabaseServices.js'

export default {
  data: () => {
    return {

      username: undefined,

      /* both work in tandem to create an offset for 
      allowing smooth transition animation rendering */
      viewController: '',
      viewSelected: '',
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

    document.title = 'Home - Math Race';
    if (!localStorage.username) return;
    this.username = localStorage.username;
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
  }
}
</script>

<style>

/* Buffers */

div.small-buffer {
  width: 100vw;
  height: 1vh;
}

div.large-buffer {
  width: 100vw;
  height: 3vh;
}

div.x-large-buffer {
  width: 100vw;
  height: 10vh;
}

/* New CSS Elements */

.profile-btn-container {
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  position: absolute; 
  right: 0%; 
  margin-top: 3.5vh; 
  margin-right: 5vw;
}

.profile-icon {
  width: 10vw; 
  height: 10vw; 
  border: 1px solid black; 
  border-radius: 50px; 
  padding: 4%;
}


/* Component Transitions! */

.slide-enter-active, .slide-leave-active {
  transform: translateX(0%);
  transition: 250ms ease-in-out;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}

div.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Main Menu Buttons */
.main-menu-button {
  width: 65vw;
  margin: 2%;
}

/* NAVIGATION DISPLAY */
.icon-txt {
  font-size: 8pt;
  margin-top: 0.25vh;
}
.icon {
  margin-top: 0.33vh;
  height: 4.3vh;
  width: 4.3vh;
  margin-bottom: 0px;
}
.nav-container {
  
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5vh;
  width: 5vh;
  margin-top: .5vh;
  margin-right: 7vw;
  margin-left: 7vw;
  margin-bottom: 0px;
}
.bottom-container {
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
