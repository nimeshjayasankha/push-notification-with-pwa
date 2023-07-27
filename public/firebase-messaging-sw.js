// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAjWIJe9AaL6fDZVn9tRajF-BUexEPFZyA",
  authDomain: "react-notif-40228.firebaseapp.com",
  projectId: "react-notif-40228",
  storageBucket: "react-notif-40228.appspot.com",
  messagingSenderId: "790644971731",
  appId: "1:790644971731:web:dc0c5d007d2b961af3dc26",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
 
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     title: payload.notification.title,
//     body: payload.notification.body,
//   };
  
//   console.log("Received background message ", payload);
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });


self.addEventListener('push', (event) => {
  console.log('event',event)
  if (event.data) {
   
    const data = event.data.json();
    const title = data.title || 'Notification';
    const options = {
      body: data.body || '',
      icon: data.icon || '/path/to/icon.png',
    };

    event.waitUntil(self.registration.showNotification(title, options));
  }
});

