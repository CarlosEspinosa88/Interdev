import { GithubAuthProvider } from "firebase/auth"
import { loginWithGithub } from './client'

export function redirectToGithub(setUserData) {
  loginWithGithub()
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result)

      if(credential) {
         const token = credential.accessToken
         const user = result.user
         
         setUserData(user)
         console.log('AuthUserToken', token)           
         console.log('AuthUser', user)
       }
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = GithubAuthProvider.credentialFromError(error)
      
      console.log('AuthError', error)
      console.log('AuthErrorMessages', errorMessage)
    });
}