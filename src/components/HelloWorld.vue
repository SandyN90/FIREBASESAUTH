<template>
  <div>
    <button @click="handleRequest()">Click</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    handleRequest: async () => {
      // const axios = require("axios");
      let data = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=noida&appid=bf36ebd25be8147f707dfc6f07f27765"
      );
      console.log(data);
    },
  },
};
</script>

<style>
</style>