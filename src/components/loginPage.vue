<template>
  <div>
    <h1>Login Page</h1>
    <hr />
    <input type="text" placeholder="Enter Email" v-model="email" />
    <input type="password" placeholder="Enter password" v-model="password" />
    <button @click="HandleLogin">Login</button>
    <br />
    <br />
    <button @click="HandleLogin">Login with Google</button> <br />
    <button @click="loginWithFacebook">Login with FaceBook</button> <br />
    <button v-show="isMerged" @click="mergeAccount">Merged Account</button>

    <hr />

    <br />
    <button @click="linkpopup">Login link with popup</button>
    <hr />
    <button @click="merginGithub">Login link with Github</button>
    <br />
    <router-link to="/loginphone">Login With Phone Number</router-link>
  </div>
</template>

<script setup>
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  // fetchSignInMethodsForEmail,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  OAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
} from "@firebase/auth";
import { reactive, toRefs } from "@vue/reactivity";
import auth from "../firebase";
import { ref } from "vue";
// import func from "../../vue-temp/vue-editor-bridge";
// import { getAuth } from "firebase/auth";

const state = reactive({
  email: "",
  password: "",
});
const { email, password } = toRefs(state);
let isMerged = ref(false);
const pendingCredRef = ref(null);
const providerRef = ref(null);

function HandleLogin() {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(function () {
      console.log("Logged-In");
    })
    .catch(function (error) {
      // console.log(error);
      const email = error.customData.email;
      const pendingCred = OAuthProvider.credentialFromError(error);
      // console.log(error.customData.email, OAuthProvider.credentialFromError(eror))
      if (error.code === "auth/account-exists-with-different-credential") {
        // mergeAccount(email, pendingCred);

        fetchSignInMethodsForEmail(auth, error.customData.email).then(function (
          methods
        ) {
          console.log("method called", methods);
          if (methods[0] === "password") {
            const password = prompt("Enter Password");
            signInWithEmailAndPassword(
              auth,
              error.customData.email,
              password
            ).then(function (result) {
              return linkWithCredential(
                result.user,
                OAuthProvider.credentialFromError(error)
              );
            });
            return;
          }
          console.log(" pending cred", pendingCred);
          isMerged.value = true;
          pendingCredRef.value = pendingCred;
          providerRef.value = getProvider(methods[0]);
        });
      }
    });
}

function loginWithFacebook() {
  console.log("Login with facebook");
  signInWithPopup(auth, new FacebookAuthProvider())
    .then(function () {
      console.log("Logged-In");
    })
    .catch(function (error) {
      // console.log(error);
      const email = error.customData.email;
      const pendingCred = OAuthProvider.credentialFromError(error);
      // console.log(error.customData.email, OAuthProvider.credentialFromError(eror))
      if (error.code === "auth/account-exists-with-different-credential") {
        // mergeAccount(email, pendingCred);
        console.log("object0", error.code);
        fetchSignInMethodsForEmail(auth, error.customData.email).then(function (
          methods
        ) {
          console.log("method called", methods);
          if (methods[0] === "password") {
            const password = prompt("Enter Password");
            signInWithEmailAndPassword(
              auth,
              error.customData.email,
              password
            ).then(function (result) {
              return linkWithCredential(
                result.user,
                OAuthProvider.credentialFromError(error)
              );
            });
            return;
          }
          console.log(" pending cred", pendingCred);
          isMerged.value = true;
          pendingCredRef.value = pendingCred;
          providerRef.value = getProvider(methods[0]);
        });
      }
    });
}
function mergeAccount() {
  console.log(providerRef.value);
  signInWithPopup(auth, providerRef.value)
    .then((result) => {
      console.log(result.user);
      linkWithCredential(result.user, pendingCredRef.value);
    })
    .catch((error) => {
      console.log(error.code);
      console.log("Error while merging");
    });
}

// This is the function is to handle login of user using popup.
// function linkpopup() {
//   signInWithPopup(auth, new GoogleAuthProvider())
//     .then(function (user) {
//       console.log("varrified", user);
//     })
//     .catch(function (error) {
//       console.log(error.customData);
//     });
// }
function merginGithub() {
  console.log("Login with Github");
  signInWithPopup(auth, new GithubAuthProvider())
    .then(function () {
      console.log("Logged-In");
    })
    .catch(function (error) {
      // console.log(error);
      const email = error.customData.email;
      const pendingCred = OAuthProvider.credentialFromError(error);
      // console.log(error.customData.email, OAuthProvider.credentialFromError(eror))
      if (error.code === "auth/account-exists-with-different-credential") {
        // mergeAccount(email, pendingCred);
        console.log("object0", error.code);
        fetchSignInMethodsForEmail(auth, error.customData.email).then(function (
          methods
        ) {
          console.log("method called", methods);
          if (methods[0] === "password") {
            const password = prompt("Enter Password");
            signInWithEmailAndPassword(
              auth,
              error.customData.email,
              password
            ).then(function (result) {
              return linkWithCredential(
                result.user,
                OAuthProvider.credentialFromError(error)
              );
            });
            return;
          }
          console.log(" pending cred", pendingCred);
          isMerged.value = true;
          pendingCredRef.value = pendingCred;
          providerRef.value = getProvider(methods[0]);
        });
      }
    });
}
function getProvider(providerId) {
  switch (providerId) {
    case "twitter.com":
      return new TwitterAuthProvider();
    case "google.com":
      return new GoogleAuthProvider();
    case "facebook.com":
      return new FacebookAuthProvider();
    case "github.com":
      return new GithubAuthProvider();
    default:
      throw Error(`ProviderId not availabe ${providerId}`);
  }
}

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("User looged in", user);
//   } else {
//     console.log("User logged Out", user);
//   }
// });
</script>

<style>
</style>