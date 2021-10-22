import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCoCjPdaWPDoTjK57roPH71qOBVDL5ptsU",
  authDomain: "hike-ca753.firebaseapp.com",
  projectId: "hike-ca753",
  storageBucket: "hike-ca753.appspot.com",
  messagingSenderId: "960753380366",
  appId: "1:960753380366:web:dfdb199fddc063813c205f",
  measurementId: "G-RM5L5LKVZC",
};

firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage, "images/file.jpg", "audio/file.mp3");
export { auth, googleAuthProvider, storageRef };
export default db;
