// lib/firebase.js
import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyB-8k-PYuYvOcLMKG8dcpXLe5Rok_uOQNk",
    authDomain: "push-notification-881ed.firebaseapp.com",
    projectId: "push-notification-881ed",
    storageBucket: "push-notification-881ed.appspot.com",
    messagingSenderId: "968885877073",
    appId: "1:968885877073:web:aa4910079cf75791cc3b70",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const messaging = firebase.messaging();
