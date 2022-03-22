<template>
  <div>
    <h1>Register page Page</h1>
    <hr />
    <input type="text" placeholder="Enter Email" v-model="email" />
    <input type="password" placeholder="Enter password" v-model="password" />
    <button @click="HandleRegister">Register</button>
  </div>
</template>

<script setup>
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "@firebase/auth";
import { reactive, toRefs } from "@vue/reactivity";
import auth from "../firebase";
const state = reactive({
  email: "",
  password: "",
});
const { email, password } = toRefs(state);
// export default {};
function HandleRegister() {
  createUserWithEmailAndPassword(auth, state.email, state.password)
    .then(function (user) {
      console.log("user Registered", user);
    })
    .catch(function (error) {
      console.log(error.code, error.message);
      console.log(state.email, state.password);
    });
}
</script>

<style>
</style>