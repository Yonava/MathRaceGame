<template>
  <div class="signin-parent">
    <center>
      <h1 class="title">
        {{ signInType ? 'Login':'Sign Up For Math Race'}}
      </h1>
    </center>

    <!-- Sign In Form -->
    <b-input-group prepend="Username" class="mt-3 input-fields">
      <b-form-input v-model="username"></b-form-input>
      <b-input-group-append>
        <b-button :variant="usernameColor"></b-button>
      </b-input-group-append>
    </b-input-group>

    <b-input-group prepend="Password" class="mt-3 input-fields">
      <b-form-input v-model="password" type="password"></b-form-input>
      <b-input-group-append>
        <b-button :variant="passwordColor"></b-button>
      </b-input-group-append>
    </b-input-group>

    <div class="large-buffer"></div>

    <b-button style="width: 40vw;" @click="signInType ? login():signUp()" pill variant="info" :disabled="passwordColor !== 'success' || usernameColor !== 'success'">{{ signInType ? 'Login':'Create Account'}}</b-button>

    <div class="error-container">
      <p class="error-msg-transition" :style="errorMsgUsername ? 'color:red;transform:translateY(0%)':'color:rgba(0,0,0,0);transform:translateY(50%)'">{{  errorMsgUsername ? errorMsgUsername:'Resolved'}}</p>
      <p class="error-msg-transition" :style="errorMsgPassword ? 'color:red;transform:translateY(0%)':'color:rgba(0,0,0,0);transform:translateY(50%)'">{{  errorMsgPassword ? errorMsgPassword:'Resolved'}}</p>
    </div>

    <p>{{ signInType ? "Don't Have An Account Already? Sign Up!":"Have An Account Already? Login!"}}</p>
    <b-button @click="signInType = !signInType" class="input-fields" :variant="signInType ? 'primary':'secondary'">{{ signInType ? 'Sign Up':'Login' }}</b-button>
    <br>
    <p v-show="processingRequest"><b>{{ signInType ? 'Logging In...':'Creating Account...' }}</b></p>
    <p v-show="successMsg" class="success-msg">Account Was Successfully Created!</p>

    <b-button class="return-btn" @click="$router.push('/')" variant="danger">Back</b-button>

  </div>
</template>

<script>

import validateUsername from '../functionality/usernameValidation.js'
import validatePassword from '../functionality/passwordValidation.js'
import DatabaseServices from '../DatabaseServices.js'
import { hashSync, compareSync } from 'bcryptjs'

export default {
  data: () => {
    return {

      password: '',
      passwordColor: 'warning',
      errorMsgPassword: '',

      username: '',
      usernameColor: 'warning',
      errorMsgUsername: '',


      processingRequest: false,

      /* tiggered if account creation is successful */
      successMsg: false,

      /* True == login, False == Sign Up */
      signInType: true
    }
  },
  async mounted() {
    document.title = 'Sign In - Math Race';
  },
  methods: {
    signUp() {

      this.processingRequest = true;
    
      /* defers call to database for a variable number of milliseconds from 0-500
      to ensure that multiple accounts with the same username never occur */
      setTimeout(async () => {
        const doesUserAlreadyExist = await DatabaseServices.findUser(this.username);
        if (doesUserAlreadyExist !== null) {
          return this.errorMsgUsername = `'${this.username}' Has Been Taken`;
        }
        
        await DatabaseServices.createNewUser({
          password: hashSync(this.password),
          username: this.username
        })

        const confirmAccountCreation = await DatabaseServices.findUser(this.username);

        if (confirmAccountCreation === null) {
          return this.errorMsgUsername = 'There Has Been An Issue Communicating With Our Servers, Check Your Connection And Try Again';
        }

        // Prompts User For Login If Account Was Created Successfully
        this.signInType = true;
        this.successMsg = true;
        this.processingRequest = false;
        setTimeout(() => {
          this.successMsg = false;
        }, 10000)

      }, Math.floor(Math.random() * 1500) + 750);
    },
    
    async login() {

      this.processingRequest = true;

      const captureUserData = await DatabaseServices.findUser(this.username);

      if (captureUserData === null) {
        return this.errorMsgUsername = `Account Does Not Exist`;
      } else if (!compareSync(this.password, captureUserData.password)) {
        return this.errorMsgUsername = `Username or Password is Incorrect`;
      } 

      // Push User To Main Menu If Successful
      await DatabaseServices.updateLastLogin(this.username, Date.now());
      localStorage.username = this.username;
      this.$router.push('/');
    }
  },
  watch: {
    username() {

      this.username = this.username.trim();
      this.errorMsgUsername = validateUsername(this.username);

      if (!this.username) {
        this.usernameColor = 'warning';
      } else if (this.errorMsgUsername) {
        this.usernameColor = 'danger';
        if (this.signInType) this.errorMsgUsername = 'Invalid Username';
      } else {
        this.usernameColor = 'success';
      }
    },
    password() {

      this.password = this.password.trim();
      this.errorMsgPassword = validatePassword(this.password);
      
      if (!this.password) {
        this.passwordColor = 'warning';
      } else if (this.errorMsgPassword) {
        this.passwordColor = 'danger';
        if (this.signInType) this.errorMsgPassword = 'Invalid Password';
      } else {
        this.passwordColor = 'success';
      }
    },
    signInType() {

      this.username = '';
      this.password = '';
    },
    errorMsgUsername() {

      this.processingRequest = false;
    }
  }
}
</script>

<style scoped>

.input-fields {
  width: 90vw;
}

.error-msg-transition {
  transition: 300ms;
  font-size: 11pt;
  font-weight: bold;
  padding: 0%;
  margin: 0%;
} 

.error-container {
  margin: 2.5% 0% 2.5% 0%;
}

.success-msg {
  color: rgb(3, 192, 3);
  font-weight: bold;
}

.signin-parent {
  position: fixed;
  padding: 5vw; 
  display: flex;
  flex-direction: column;
} 

.return-btn {
  position: fixed;
  bottom: 5%;
  width: 90%;
}

.title {
  font-size: 22pt;
  font-weight: bold;
}

</style>