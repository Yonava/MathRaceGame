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

    <div v-if="!viewController || !viewSelected">

      <div style="position: relative" @click="$router.push(`/profile/${username}`)">
        <span style="position: absolute; left: 68%; margin-top: 3.5vh;"><b>{{ username ? `${username}`:'Sign In' }}</b></span>
        <b-icon-person class="profile-icon"></b-icon-person>
      </div>

      <div class="large-buffer"></div>
      <div class="large-buffer"></div>
      <div class="large-buffer"></div>

      <!-- Session Details -->
      <!-- <p style="font-size: 9pt;">Session Accessed Through {{ $parent.throughApp ? "App":"Browser"}}</p> -->

      <div class="center">

        <b-button v-show="!username" @click="$router.push('/sign-in')" variant="info">Sign In To Create Sessions</b-button>  

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

        <button style="position: fixed; bottom: 10%" class="btn btn-outline-danger btn-lg main-menu-button" v-on:click="deleteSession('all')">
          Delete All Sessions
        </button>

      </div>

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

/* New CSS Elements */

.profile-icon {
  padding: 0.5%;
  margin: 5% 5% 0% 85%;
  width: 9%;
  height: 9%;
  border: 1.5px solid black;
  border-radius: 25px;
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
