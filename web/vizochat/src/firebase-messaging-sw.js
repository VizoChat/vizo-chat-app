// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAbEJzxXIUj3JGzjNjJiW2AYLCQfFdESOw",
//   authDomain: "vizochat-380115.firebaseapp.com",
//   projectId: "vizochat-380115",
//   storageBucket: "vizochat-380115.appspot.com",
//   messagingSenderId: "242662627798",
//   appId: "1:242662627798:web:4348daf50fef786147ec77",
//   measurementId: "G-NVES6CPSP0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyAbEJzxXIUj3JGzjNjJiW2AYLCQfFdESOw",
    authDomain: "vizochat-380115.firebaseapp.com",
    projectId: "vizochat-380115",
    storageBucket: "vizochat-380115.appspot.com",
    messagingSenderId: "242662627798",
    appId: "1:242662627798:web:4348daf50fef786147ec77",
    measurementId: "G-NVES6CPSP0"
});
const messaging = firebase.messaging();