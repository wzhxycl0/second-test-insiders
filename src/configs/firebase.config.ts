import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth} from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0zHSxYmcO9K_1ZLtbQKwmdsawsPgAbyw",
  authDomain: "second-test-insiders.firebaseapp.com",
  projectId: "second-test-insiders",
  storageBucket: "second-test-insiders.firebasestorage.app",
  messagingSenderId: "539956477129",
  appId: "1:539956477129:web:31c9112e0674b787f42118",
  measurementId: "G-B1P73GKBX4"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);