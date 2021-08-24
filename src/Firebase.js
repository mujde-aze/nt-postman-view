import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";
import "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export const functions = firebase.app().functions("australia-southeast1");

if (process.env.REACT_APP_DEV_MODE) {
  const auth = firebase.auth();
  auth.useEmulator("http://localhost:9099");
  functions.useEmulator("localhost", 5001);
} else {
  const appCheck = firebase.appCheck();
  appCheck.activate(process.env.APP_CHECK_PUBLIC_KEY, true);
}

export default firebase;
