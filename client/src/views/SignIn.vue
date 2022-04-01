<template>
  <div>
    <h1>
      {{ signInType ? 'Login':'Sign Up'}}
    </h1>

    <!-- Login Form -->
    <b-input-group prepend="Username" class="mt-3">
      <b-form-input v-model="username"></b-form-input>
      <b-input-group-append>
        <b-button :variant="usernameColor"></b-button>
      </b-input-group-append>
    </b-input-group>

    <b-input-group prepend="Password" class="mt-3">
      <b-form-input v-model="password"></b-form-input>
      <b-input-group-append>
        <b-button :variant="passwordColor"></b-button>
      </b-input-group-append>
    </b-input-group>

    <b-button @click="signInType ? login():signUp()" pill variant="info" :disabled="passwordColor !== 'success' || usernameColor !== 'success'">{{ signInType ? 'Login':'Create Account'}}</b-button>

    <p class="error-msg-transition" :style="errorMsgUsername ? 'color:red;transform:translateY(0%)':'color:rgba(0,0,0,0);transform:translateY(50%)'">{{  errorMsgUsername ? errorMsgUsername:'placeholder'}}</p>
    <p class="error-msg-transition" :style="errorMsgPassword ? 'color:red;transform:translateY(0%)':'color:rgba(0,0,0,0);transform:translateY(50%)'">{{  errorMsgPassword ? errorMsgPassword:'placeholder'}}</p>

    <b-button @click="signInType = !signInType" :variant="signInType ? 'primary':'secondary'">{{ signInType ? 'Sign Up':'Login' }}</b-button>
    <br><br>
    <b-button @click="$router.push('/')" variant="danger">Return</b-button>
  </div>
</template>

<script>

import validateUsername from '../functionality/usernameValidation.js'
import validatePassword from '../functionality/passwordValidation.js'
import DatabaseServices from '../DatabaseServices.js'

export default {
  data: () => {
    return {

      password: '',
      passwordColor: 'warning',

      username: '',
      usernameColor: 'warning',

      errorMsgPassword: '',
      errorMsgUsername: '',

      /* True == login, False == Sign Up */
      signInType: true
    }
  },
  mounted() {
    document.title = 'Sign In - Math Race';
  },
  methods: {
    async signUp() {
      
      const doesUserAlreadyExist = await DatabaseServices.findUser(this.username);
      if (doesUserAlreadyExist !== null) {
        return this.errorMsg = `'${this.username}' Has Been Taken`;
      }

      await DatabaseServices.createNewUser({
        password: this.password,
        username: this.username
      })

      const confirmAccountCreation = await DatabaseServices.findUser(this.username);

      if (confirmAccountCreation === null) {
        return this.errorMsg = 'There Has Been An Issue Communicating With Our Servers, Check Your Connection And Try Again';
      }

      // Push User To Main Menu If Successful
      localStorage.username = this.username;
      this.$router.push('/');

    },
    async login() {

      const captureUserData = await DatabaseServices.findUser(this.username);

      if (captureUserData === null) {
        return this.errorMsg = `No Account Found That Matches '${this.username}'`;
      }

      console.log(captureUserData.password, this.password)
      if (captureUserData.password !== this.password) {
        return this.errorMsg = 'Password is incorrect';
      }

      // Push User To Main Menu If Successful
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
      } else {
        this.usernameColor = 'success';
      }
    },
    password() {

      this.password = this.password.trim();
      this.errorMsgPassword = validatePassword(this.password);
      
      console.log(this.password.includes(['1']))
      if (!this.password) {
        this.passwordColor = 'warning';
      } else if (this.errorMsgPassword) {
        this.passwordColor = 'danger';
      } else {
        this.passwordColor = 'success';
      }
    },
    signInType() {

      this.username = '';
      this.password = '';
    }
  }
}
</script>

<style scoped>

.error-msg-transition {
  transition: 300ms;
  font-weight: bold;
} 

</style>