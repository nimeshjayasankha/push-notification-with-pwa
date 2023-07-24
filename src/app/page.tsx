"use client";
import { useEffect, useState } from "react";
import { fetchToken, onMessageListener } from "./firebase";
import styles from "./page.module.css";

export default function Home() {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(()=>{
    onMessageListener()
    .then((payload: any) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log("failed: ", err));
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
      }
    }

  return (
    <main className={styles.main}>
      <p>forground {JSON.stringify(notification)}</p>
      <p>background {localStorage.getItem('background')}</p>

      <textarea value={token} onChange={() => ""} rows={10} cols={200}></textarea>
      <button onClick={handleNotificationPermission}>
          Enable Push Notifications
        </button>
    </main>
  );
}
