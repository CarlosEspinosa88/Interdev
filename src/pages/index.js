import Image from 'next/image'
import { useState } from "react"
import { getAuth, GithubAuthProvider, signOut } from "firebase/auth"
import { loginWithGithub } from '../firebase/client'
import Button from '../components/Button'
import Input from '../components/Input'
import SelectInput from '../components/SelectInput'
import Checkbox from '../components/Checkbox'
import { OPTIONS } from '../constanst'

const auth = getAuth();

export default function Home() {
  const [userData, setUserData] = useState(null)
  const [isSendedData, setIsSendedData] = useState(false)

  const handleRedirectToGithub = () => {
    loginWithGithub()
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
         if(credential) {
           const token = credential.accessToken;
           const user = result.user;
           
           setUserData(user)
           console.log('AuthUserToken', token)           
           console.log('AuthUser', user)
         }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        
        console.log('AuthError', error)
        console.log('AuthErrorMessages', errorMessage)
      });
  }

  const logoutGithubAuth = () => {
    signOut(auth).then(() => {
      setUserData(null)
      setIsSendedData(true)
    }).catch((error) => {
      const errorMessage = error.message;

      console.log('LogoutError', errorMessage)
    });
  }

  function handleCheckbox() {
    setValueCheckbox((prevState) => !prevState)
  }

  function handleSelect(event) {
    setValueSelect(event.target.value)
  }

  return (
    <div>
      <Button
        disabled={userData ? true : false}
        onClick={handleRedirectToGithub}
      >
        Login
      </Button>
      <Button
        disabled={userData ? false : true}
        onClick={logoutGithubAuth}
      >
        Logout
      </Button>
      {userData && (
        <>
          <h4>User: {userData.displayName}</h4>
          <h4>Email: {userData.email}</h4>
          <Image height="300" width="300" src={userData.photoURL} alt='avatar-github' />
        </>
      )}
      {isSendedData && !userData && (
        <h2>Gracias por enviar tu informacion</h2>
      )}
    </div>
  )
}
