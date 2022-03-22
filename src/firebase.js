import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// ...
const firebaseConfig = {
    apiKey: "AIzaSyBbXc-aD016-eDrjyWhHeX9EKObA9t3AlA",
    authDomain: "newfirebaseproject-da7e0.firebaseapp.com",
    projectId: "newfirebaseproject-da7e0",
    storageBucket: "newfirebaseproject-da7e0.appspot.com",
    messagingSenderId: "708825765367",
    appId: "1:708825765367:web:0f8acba804bfb3f84c0af2",
    measurementId: "G-J1N1XX7YVF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;