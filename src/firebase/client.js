import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeTgXbudNdA_74lpPA3h2Xtejf2IDwEFc",
  authDomain: "interdev-4cc5d.firebaseapp.com",
  projectId: "interdev-4cc5d",
  storageBucket: "interdev-4cc5d.appspot.com",
  messagingSenderId: "670057614037",
  appId: "1:670057614037:web:8a2693a58dcdabb8beb05c",
  measurementId: "G-JJXQHBKF5N"
};

initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore()
export const loginWithGithub = () => {
  const provider = new GithubAuthProvider()
  return signInWithPopup(auth, provider)
}