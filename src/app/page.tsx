"use client";
import { useEffect, useState } from "react";
import { fetchToken, onMessageListener } from "./firebase";
import styles from "./page.module.css";

export default function Home() {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [data, setData] = useState('');


  useEffect(() => {
    // onMessageListener()
    //   .then((payload: any) => {
    //     alert(1)
    //     setNotification({
    //       title: payload.notification.title,
    //       body: payload.notification.body,
    //     });
    //   })
    //   .catch((err) => console.log("failed: ", err));

    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        // Create and display the notification
        var notification = new Notification('Title', { 'body': 'ssss' });
      }
    }


    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log(11111)
      setNotification({
        title: event.data.notification.title,
        body: event.data.notification.body,
      });

    });



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
