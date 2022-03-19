<template>
  <div>
    <h1>Create Group Session</h1>
    <input v-model="username" type="text" placeholder="Enter Username" />
    <br>
    <button @click="createRoom()">Create Room</button>
    <br>
    <h1 class="error">{{ errorMessage }}</h1>
    <br>
    <button v-on:click="$parent.creatingSession = false">Back</button>
  </div>
</template>

<script>

import GenerateQuestions from '../assets/QuestionAssembler'
import validateUsername from '../functionality/usernameValidation.js'
import DatabaseServices from '../DatabaseServices.js'

export default {
    data: () => {
        return {
            username: '',
            roomID: 0,
            errorMessage: '',
        }
    },
    methods: {
        async createRoom() {
            
          this.errorMessage = validateUsername(this.username.trim());
          if (this.errorMessage) return;

          while (this.roomID < 1000) {
            this.roomID = Math.round(Math.random() * 10000);
          }

          const doesRoomIDAlreadyExist = await DatabaseServices.findSessionByRoomID(String(this.roomID));
      
          if (doesRoomIDAlreadyExist !== null) 
            return this.errorMessage = "Problem Encountered While Creating Room, Try One More Time.";  

          try {
              await DatabaseServices.createNewSession({
                "questions": GenerateQuestions(),
                "date": Date.now().toString(),
                "roomid": String(this.roomID),
                "host": this.username,
                "difficulty": "Impossible" // replace with custom values
              });
          } catch (error) {
              this.errorMessage = error;
              return;
          }
          
          const confirmedSessionObject = await DatabaseServices.findSessionByRoomID(String(this.roomID));
          if (confirmedSessionObject === null) 
            return this.errorMessage = "An Issue Was Encountered Whilst Connecting to Our Servers.";

          // Execute Redirect to Room Once Everything Has Been Validated
          this.$router.push({ name: 'Room', params: { sessionObject: confirmedSessionObject }})
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