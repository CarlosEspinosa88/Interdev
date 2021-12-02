import Image from 'next/image'
import { useState, useEffect } from "react"
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { getAuth, GithubAuthProvider, signOut } from "firebase/auth"
import { loginWithGithub } from '../../firebase/client'
import logo from '../../../public/githubo.png';
import Button from '../../components/Button'
import Input from '../../components/Input'
import SelectInput from '../../components/SelectInput'
import Checkbox from '../../components/Checkbox'
import {
  SENIORITY,
  EXPERIENCE,
  SALARY,
  TYPE,
  FRAMEWORKS,
  ERROR_MESSAGES
} from '../../constanst'
import {
  StyledFormContainer,
  StyledCheckboxesContainer,
  StyledSelectsContainer,
  StyledGithubContainer,
  StyledAvatar,
  StyledFirstColumnAvatar,
  StyledSecondColumnAvatar,
  StyledFirstColumnContainer,
  StyledSecondColumContainer,
  StyledLoginContainer,
  StyledInnerButtonContainer,
  StyledFaviconContainer,
  StyledContainerThanks,
  StyledCentered,
  StyledContainerLabelCheckbox,
  StyledLabelCheckbox
 } from './styles'

const auth = getAuth();

export default function HomeForm() {
  const [userData, setUserData] = useState(null)
  const [isSendedData, setIsSendedData] = useState(false)
  const [valueAllCheckbox, setValueAllCheckbox] = useState([])
  
  const [stateButton, setStateButton] = useState({
    isLoading: false,
    isDisabled: false,
  })
  
  const [checked, setChecked] = useState(
    new Array(FRAMEWORKS.length).fill(false)
  )
  
  const [hasError, setHasError] = useState({
    name: false,
    seniority: false,
    experience: false,
    salary: false,
    date: false,
  })

  const [values, setValues] = useState({
    name: '',
    seniority: '',
    experience: '',
    salary: '',
    date: '',
  })

  function handleValue(event) {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  function handleOnBlur(event) {
    if (event.target.value === '') {
      setHasError((prevState) => ({
        ...prevState,
        [event.target.name]: true
      }))
    } else if (event.target.value !== '') {
      setHasError((prevState) => ({
        ...prevState,
        [event.target.name]: false
      }))
    }
  }

  function handleCheckboxes(name, position) {
    const includes = valueAllCheckbox.includes(name.label)

    if (!includes) {
      setValueAllCheckbox(prevState =>
        [...prevState, name.label]
      );
    } else {
      function removeItemFromCheckboxArr(arr, item) {
        let index = arr.indexOf( item );
        index !== -1 && arr.splice(index, 1)
      }

      removeItemFromCheckboxArr(valueAllCheckbox, name.label);
    }

    const updatedCheckedState = checked.map((item, index) => {
      return index === position ? !item : item
    });
    
    setChecked(updatedCheckedState);
  }

  useEffect(() => {
    const { name, seniority, experience, salary, date } = values

    if (name && seniority && experience && salary && date) {
      setStateButton((prevState) => ({
        ...prevState,
        isDisabled: false,
      }))
    } else if (!name || !seniority || !experience || !salary || !date ) {
      setStateButton((prevState) => ({
        ...prevState,
        isDisabled: true,
      }))
    }
  }, [values])

  
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

  function handleSubmitForm(event) {
    event.preventDefault();

    setStateButton((prevState) => ({
      ...prevState,
      isLoading: true,
    }))

    setTimeout(() => {
      logoutGithubAuth();
      setStateButton((prevState) => ({
        ...prevState,
        isLoading: false,
      }))

      console.log('SEND_DATA', {
        gitHub: `github.com/${githubClient}`,
        name: values.name, 
        seniority: values.seniority,
        experience: values.experience,
        salary: values.salary,
        framework: valueAllCheckbox
      })
    }, 2000)
  }

  const githubClient = userData?.auth?.currentUser?.reloadUserInfo?.screenName

  return (
    <>
      {userData ? (
        <form onSubmit={handleSubmitForm}>
          <StyledFormContainer>
            <StyledGithubContainer>
              <StyledFirstColumnAvatar>
                <StyledAvatar>
                  <Image
                    height="300"
                    width="300"
                    src={userData?.photoURL || logo }
                    alt='avatar-github'
                  />
                </StyledAvatar>
              </StyledFirstColumnAvatar>
              <StyledSecondColumnAvatar>
                <Input
                  disabled
                  required
                  name='github'
                  id='id-github-url'
                  label='Github Url'
                  value={`github.com/${githubClient}`}
                />
              </StyledSecondColumnAvatar>
            </StyledGithubContainer>
            <div>
              <Input
                required
                id='id-name'
                name='name'
                placeholder='Ingresa tu nombre completo'
                label='Nombre y apellido*'
                value={values.name}
                hasError={hasError.name}
                errorMessage={ERROR_MESSAGES.EMPTY}
                onChange={handleValue}
                onBlur={handleOnBlur}
              />
            </div>
            <StyledSelectsContainer>
              <StyledFirstColumnContainer>
                <SelectInput
                  required
                  id='id-seniority'
                  name='seniority'
                  labelSelect='Seniority*'
                  value={values.seniority}
                  hasError={hasError.seniority}
                  errorMessage={ERROR_MESSAGES.EMPTY}
                  options={SENIORITY}
                  onChange={handleValue}
                  onBlur={handleOnBlur}
                />
              </StyledFirstColumnContainer>
              <StyledSecondColumContainer>
                <SelectInput
                  required
                  id='id-experience'
                  name='experience'
                  labelSelect='Años de experiencia*'
                  value={values.experience}
                  hasError={hasError.experience}
                  errorMessage={ERROR_MESSAGES.EMPTY}
                  options={EXPERIENCE}
                  onChange={handleValue}
                  onBlur={handleOnBlur}
                />
              </StyledSecondColumContainer>
            </StyledSelectsContainer>
            <StyledSelectsContainer>
              <StyledFirstColumnContainer>
                <SelectInput 
                  required
                  id='id-salary'
                  name='salary'
                  labelSelect='Aspiración salarial*'
                  value={values.salary}
                  hasError={hasError.salary}
                  errorMessage={ERROR_MESSAGES.EMPTY}
                  options={SALARY}
                  onChange={handleValue}
                  onBlur={handleOnBlur}
                />
              </StyledFirstColumnContainer>
              <StyledSecondColumContainer>
                <Input
                  required
                  type={TYPE.DATE}
                  id='id-date'
                  name='date'
                  label='Fecha de ingreso*'
                  value={values.date}
                  hasError={hasError.date}
                  errorMessage={ERROR_MESSAGES.EMPTY}
                  onChange={handleValue}
                  onBlur={handleOnBlur}
                />

              </StyledSecondColumContainer>
            </StyledSelectsContainer>
            <div>
              <StyledContainerLabelCheckbox>
                <StyledLabelCheckbox>
                  Frameworks Favoritos
                </StyledLabelCheckbox>
              </StyledContainerLabelCheckbox>
              <StyledCheckboxesContainer>
                {FRAMEWORKS?.map((item, index) => (
                  <div key={item.value}>
                    <Checkbox
                      id={`${item.value}-${index}`}
                      label={item.label}
                      onChange={() => handleCheckboxes(item, index)}
                      checked={checked[index]}
                    />
                  </div>
                ))}
              </StyledCheckboxesContainer>
            </div>
            <div>
              <Button
                type={TYPE.SUBMIT}
                loading={stateButton.isLoading}
                disabled={stateButton.isDisabled}
                onClick={handleSubmitForm}
              >
                Enviar información
              </Button>
            </div>
          </StyledFormContainer>
        </form>
      ) : (
        <StyledLoginContainer>
          {isSendedData && !userData ? (
            <StyledContainerThanks>
              <StyledCentered>
                <h1>!Gracias {values?.name}!</h1>
                <div><span>Mientras revisamos toda tu información {' '}</span></div>
                <div><span>conoce más de Ayenda.</span></div>
              </StyledCentered>
            </StyledContainerThanks>
          ) : (
            <Button onClick={handleRedirectToGithub}>
              <StyledInnerButtonContainer>
                <StyledFaviconContainer>
                  <Image width="30" height="30" src={logo} alt="ico-github"/>
                </StyledFaviconContainer>
                <div><span>login con Github</span></div>
              </StyledInnerButtonContainer>
            </Button>
          )}
        </StyledLoginContainer>
      )}
    </>
  )
}
