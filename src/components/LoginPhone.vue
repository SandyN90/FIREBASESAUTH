<template>
  <div>
    <h1>Login With Phone</h1>
    <div id="recaptcha-container"></div>
    <button @click="PhoneLogin">Phone Login</button>
  </div>
</template>

<script>
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from "../firebase.js";
export default {
  setup() {
    async function PhoneLogin() {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {},
          auth
        );
        //   console.log(window.RecaptchaVerifier);
        //   console.log("Phone Login");
        let PhoneNumber = prompt("Enter Your phone number");
        PhoneNumber = "+91" + PhoneNumber;
        console.log(PhoneNumber);
        const appVerifier = window.recaptchaVerifier;
        // console.log(auth, PhoneNumber, appVerifier);
        const signInPhone = await signInWithPhoneNumber(
          auth,
          PhoneNumber,
          appVerifier
        );
        const code = await signInPhone(confirmationResult);
        console.log("SMS sent", confirmationResult);
      } catch (error) {
        console.log(error);
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
      }
    }
    return {
      PhoneLogin,
    };
  },
};
</script>

<style>
</style>