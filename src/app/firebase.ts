import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyB-8k-PYuYvOcLMKG8dcpXLe5Rok_uOQNk",
  authDomain: "push-notification-881ed.firebaseapp.com",
  projectId: "push-notification-881ed",
  storageBucket: "push-notification-881ed.appspot.com",
  messagingSenderId: "968885877073",
  appId: "1:968885877073:web:aa4910079cf75791cc3b70",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setToken: any) => {
  return getToken(messaging, {
    vapidKey:
      "BP93C7WuTic-qeOk0s-BGxZBHXkYDmGEtvMoCuRJzi7PuOLLktk4Y0Pw1ym4u8bnO2GZ9rvcPP_aYB2iZw1yHag",
  })
    .then((currentToken: any) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setToken(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );

        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload: any) => {
      resolve(payload);
    });
  });
