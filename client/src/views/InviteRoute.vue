<template>
  <div>
    <br><br><br><br>
    <center>

      <div v-if="sessionInfo === undefined">
        <h1>Loading Session...</h1>
      </div>

      <!-- Session Found Error -->
      <div v-else-if="sessionInfo === null">
        <h1>
          Session Not Found!
        </h1>
        <br>
        <p><b>[Unable To Retrieve Session {{ $route.params.roomid }}]</b></p>
      </div>

      <!-- Input Username -->
      <div v-else>
        <p>Join Room <b>{{ sessionInfo.roomid }}</b>, Created on <b>{{ sessionInfo.date }}</b></p>
        <h1>Enter A Username:</h1>
        <input v-model="username" type="text" placeholder="Enter Username" />
        <button @click="joinRoom()">Join Room</button>
        <h1 class="error">{{ errorMessage }}</h1>
        <h4 style="margin-top: 5vh;">Session Details:</h4>
        <p>
          {{ sessionInfo }}
        </p>
      </div>

      <button @click="$router.push('/')">Back</button>

    </center>

  </div>
</template>

<script>

import validateUsername from '../functionality/usernameValidation.js'

export default {
  data: () => {
    return {
      username: '',
      errorMessage: '',
      sessionInfo: undefined,
    }
  },
  created() {
    fetch(`https://math-race-game.herokuapp.com/api/sessions/${this.$route.params.roomid}`)
      .then(response => response.json())
      .then(data => {
        this.sessionInfo = data;
      });
  },
  methods: {
    joinRoom() {
      this.errorMessage = validateUsername(this.username.trim());

      if (this.errorMessage) return;

      this.$router.push(this.$router.push({ name: 'Room', params: { sessionObject: this.sessionInfo }}))
    }
  }
}
</script>


<style scoped>
 * {
   margin: 5px;
}
/* gets rid of up and down arrows in input */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
h1.error {
    font-size: x-small;
    font-weight: bolder;
    color: red;
}
</style>