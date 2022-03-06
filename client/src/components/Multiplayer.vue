<template>
    <div>

        <!-- Session Input Fields -->
        <div v-if="menuDisplay">
            <br><br><br>
            <div>
                <h1>Join Group Session</h1>
                <input v-model="username" type="text" placeholder="Enter Username" />
                <input v-model="roomID" placeholder="Enter Room ID" type="number">
                <br>
                <button @click="joinRoom()">Join Room</button>
                <button @click="createRoom()">Create Room</button>
                <br>
                <h1 class="error">{{ errorMessage }}</h1>
            </div>
        </div>

        <!-- Session Room -->
        <div v-else>
            <Room
            :username="`${username[0].toUpperCase() + username.substring(1)} (Guest#${Math.round(Math.random() * 10000)})`" 
            :room="roomID" 
            :host="host" />
        </div>

    </div>
</template>

<script>

import Room from '../components/Room.vue'
import validateUsername from '../functionality/usernameValidation.js'
import DatabaseServices from '../DatabaseServices.js'

export default {
    components: {
        Room
    },
    data: () => {
        return {
            menuDisplay: true,
            username: '',
            roomID: '',
            host: false,
            errorMessage: '',
        }
    },
    methods: {
        async createRoom() {
            
            this.username = this.username.trim();
            this.errorMessage = validateUsername(this.username);

            this.roomID = 0;

            while (this.roomID < 1000) {
                this.roomID = Math.round(Math.random() * 10000);
            }

            const doesRoomExist = await DatabaseServices.findSessionByRoomID(String(this.roomID));
        
            if (doesRoomExist !== null) 
                this.errorMessage = "Problem Encountered While Creating Room, Try One More Time!";

            if (this.errorMessage) return;

            try {
                await DatabaseServices.createNewSession({
                    "questions": "trial",
                    "date": Date.now().toString(),
                    "roomid": String(this.roomID)
                });
            } catch (error) {
                this.errorMessage = error;
                return;
            }

            this.host = true;
            this.roomID = String(this.roomID);
            this.menuDisplay = false;

        },
        async joinRoom() {

            this.username = this.username.trim();
            this.errorMessage = validateUsername(this.username);
            const findSession = await DatabaseServices.findSessionByRoomID(this.roomID);
            console.table(findSession);

            if (findSession === null)
                this.errorMessage = "Couldn't Find That Room..."

            if (this.errorMessage) return;

            this.host = false;
            this.menuDisplay = false;
        },
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