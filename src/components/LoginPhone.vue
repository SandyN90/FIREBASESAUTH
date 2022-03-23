<template>
  <div>
    <h1>Login With Phone</h1>
    <div id="recaptcha-container"></div>
    <button @click="phoneLogin">Phone Login</button>
    <input type="number" v-model="code" />
    <h1>{{ code }}</h1>
    <button @click="verifyHandler">verify code</button>
  </div>
</template>

<script>
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { reactive } from "vue";
import auth from "../firebase.js";
export default {
  data() {
    return {
      code: "",
    };
  },
  methods: {
    phoneLogin() {
      window.RecaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
      const phoneNumber = "+91" + prompt("Enter your ten digit phone number");
      const appVerifier = window.RecaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log("verification code is send");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    verifyHandler() {
      confirmationResult
        .confirm(this.code)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log("User is verified successfully");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    },
  },
};
</script>

<style>
</style>