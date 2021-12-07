import { getAuth, signOut } from "firebase/auth"
import { auth } from './client'

export function logoutGithubAuth(setUserData, setIsSendedData) {
  signOut(auth).then(() => {
    setUserData(null)
    setIsSendedData(true)
  }).catch((error) => {
    const errorMessage = error.message;
    console.log('LogoutError', errorMessage)
  });
}