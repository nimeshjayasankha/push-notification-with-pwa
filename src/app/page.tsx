"use client";
import { useEffect, useState } from "react";
import { fetchToken, onMessageListener } from "./firebase";
import styles from "./page.module.css";

export default function Home() {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [data, setData] = useState('');


  useEffect(() => {
    onMessageListener()
      .then((payload: any) => {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch((err) => console.log("failed: ", err));

    // if ('serviceWorker' in navigator && 'firebase-messaging-sw.js' in window) {
    //   navigator.serviceWorker.ready.then((registration) => {
    //     registration.pushManager
    //       .subscribe({
    //         userVisibleOnly: true,
    //       })
    //       .then((subscription) => {
    //         console.log(subscription)
    //         // Send the subscription information to your server
    //         // Your server should store this information to send future notifications
    //       })
    //       .catch((error) => {
    //         console.error('Error subscribing to push notifications:', error);
    //       });
    //   });
    // }

  })



  const askNotificationPermission = async () => {
    try {
      const permissionResult = await Notification.requestPermission();
      return permissionResult;
    } catch (error) {
      console.error("Error while asking for notification permission:", error);
      return null;
    }
  }

  const handleNotificationPermission = async () => {
    const permissionResult = await askNotificationPermission();
    if (permissionResult === "granted") {
      fetchToken(setToken);
      // User granted notification permission
      // Now you can subscribe to push notifications
    } else if (permissionResult === "denied") {
      alert('denied')

      // User denied notification permission
      // You can handle this case accordingly (e.g., show an informative message)
    } else if (permissionResult === "default") {
      alert('default')

      // User closed the permission prompt without making a choice
      // You can handle this case accordingly (e.g., show a prompt later)
    }
  }

  return (
    <main className={styles.main}>
      <p>forground {JSON.stringify(notification)}</p>
      <p>{data}</p>

      <textarea value={token} onChange={() => ""} rows={10} cols={200}></textarea>
      <button onClick={handleNotificationPermission}>
        Enable Push Notifications
      </button>
    </main>
  );
}
