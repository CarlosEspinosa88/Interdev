import * as dayjs from 'dayjs'
import { useState, useEffect } from "react"

import Image from 'next/image'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { logoutGithubAuth } from '../../firebase/logout'
import { redirectToGithub } from '../../firebase/login'
import { sendDataToFirebase } from '../../firebase/sendData'
import logo from '../../../public/githubo.png'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Checkbox from '../../components/Checkbox'
import SelectInput from '../../components/SelectInput'
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
  StyledLabelCheckbox,
  StyledErrorLabelCheckbox
 } from './styles'

const todayDate = dayjs().format('YYYY-MM-DD');

function HomeForm() {
  const [userData, setUserData] = useState(null)
  const [isSendedData, setIsSendedData] = useState(false)
  const [valueAllCheckbox, setValueAllCheckbox] = useState([])

  const [stateButton, setStateButton] = useState({
    isLoading: false,
    isDisabled: false,
  })

  const [stateChecked, setStateChecked] = useState(
    new Array(FRAMEWORKS.length).fill(false)
  )

  const [typeError, setTypeError] = useState({
    name: '',
    seniority: '',
    experience: '',
    salary: '',
    date: '',
    checkbox: '',
  })

  const [hasError, setHasError] = useState({
    name: false,
    seniority: false,
    experience: false,
    salary: false,
    date: false,
    checkbox: false,
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

  function handleOnBlurInput(event) {
    if (event.target.value === '') {
      setHasError((prevState) => ({
        ...prevState,
        [event.target.name]: true
      }))

      setTypeError((prevState) => ({
        ...prevState,
        [event.target.name]: ERROR_MESSAGES.EMPTY
      }))

    } else if (event.target.value !== '') {

      setHasError((prevState) => ({
        ...prevState,
        [event.target.name]: false
      }))

      setTypeError((prevState) => ({
        ...prevState,
        [event.target.name]: ''
      }))
    }
  }

  function handleOnBlurCalendar(event) {
    if (event.target.value !== '' && event.target.value < todayDate) {

      setHasError((prevState) => ({
        ...prevState,
        [event.target.name]: true
      }))

      setTypeError((prevState) => ({
        ...prevState,
        [event.target.name]: ERROR_MESSAGES.DATE
      }))
    } else if (event.target.value !== '' || event.target.value > todayDate) {

      setHasError((prevState) => ({
        ...prevState,
        [event.target.name]: false
      }))

      setTypeError((prevState) => ({
        ...prevState,
        [event.target.name]: ''
      }))
    }
  }

  function handleOnBlurCheckbox(event, index) {
    const includesAnyCheckboxsInTrue = stateChecked.includes(true)

    if (event.target.value === 'false' && !includesAnyCheckboxsInTrue) {

      setHasError((prevState) => ({
        ...prevState,
        [event.target.name]: true
      }))

      setTypeError((prevState) => ({
        ...prevState,
        [event.target.name]: ERROR_MESSAGES.CHECBOXES
      }))
    } else if (event.target.value === 'true' || includesAnyCheckboxsInTrue) {

      setHasError((prevState) => ({
        ...prevState,
        [event.target.name]: false
      }))

      setTypeError((prevState) => ({
        ...prevState,
        [event.target.name]: ''
      }))
    }
  }

  function handleCheckboxesValue(name, position) {
    const includes = valueAllCheckbox.includes(name.label)

    if (!includes) {
      setValueAllCheckbox(prevState =>
        [...prevState, name.label]
      )
    } else {
      function removeItemFromCheckboxArr(arr, item) {
        let index = arr.indexOf( item )
        index !== -1 && arr.splice(index, 1)
      }

      removeItemFromCheckboxArr(valueAllCheckbox, name.label)
    }

    const updatedCheckedState = stateChecked.map((item, index) => {
      return index === position ? !item : item
    });

    setStateChecked(updatedCheckedState)
  }

  function handleLoginToInit() {
    redirectToGithub(setUserData);
  }

  function handleSubmitForm(event) {
    event.preventDefault()

    setStateButton((prevState) => ({
      ...prevState,
      isLoading: true,
    }))

    sendDataToFirebase({
      gitHub: `github.com/${githubClient}`,
      name: values.name,
      seniority: values.seniority,
      experience: values.experience,
      salary: values.salary,
      entranceDateToWork: values.date,
      framework: valueAllCheckbox
    })

    setTimeout(() => {
      logoutGithubAuth(setUserData, setIsSendedData)
      setStateButton((prevState) => ({
        ...prevState,
        isLoading: false,
      }))
    }, 2000)
  }

  useEffect(() => {
    const includeErrors = Object.values(hasError).includes(true)
    const includeEmptyValues = Object.values(values).includes('')
    const includeChecboxesValues = valueAllCheckbox.length === 0

    if (!includeEmptyValues && !includeErrors && !includeChecboxesValues) {
      setStateButton((prevState) => ({
        ...prevState,
        isDisabled: false,
      }))
    } else if (includeEmptyValues || includeErrors || includeChecboxesValues) {
      setStateButton((prevState) => ({
        ...prevState,
        isDisabled: true,
      }))
    }
  }, [values, hasError, valueAllCheckbox])

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
                  label='Github url'
                  placeholder={`github.com/${githubClient}`}
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
                errorMessage={typeError.name}
                onChange={handleValue}
                onBlur={handleOnBlurInput}
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
                  errorMessage={typeError.seniority}
                  options={SENIORITY}
                  onChange={handleValue}
                  onBlur={handleOnBlurInput}
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
                  errorMessage={typeError.experience}
                  options={EXPERIENCE}
                  onChange={handleValue}
                  onBlur={handleOnBlurInput}
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
                  errorMessage={typeError.salary}
                  options={SALARY}
                  onChange={handleValue}
                  onBlur={handleOnBlurInput}
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
                  errorMessage={typeError.date}
                  onChange={handleValue}
                  onBlur={handleOnBlurCalendar}
                />
              </StyledSecondColumContainer>
            </StyledSelectsContainer>
            <div>
              <StyledContainerLabelCheckbox>
                <StyledLabelCheckbox>
                  Frameworks favoritos*
                </StyledLabelCheckbox>
                {hasError.checkbox && (
                  <StyledErrorLabelCheckbox>
                    {typeError.checkbox}
                  </StyledErrorLabelCheckbox>
                )}
              </StyledContainerLabelCheckbox>
              <StyledCheckboxesContainer>
                {FRAMEWORKS?.map((item, index) => (
                  <div key={item.value}>
                    <Checkbox
                      id={`${item.value}-${index}`}
                      name='checkbox'
                      label={item.label}
                      value={stateChecked[index]}
                      checked={stateChecked[index]}
                      onChange={() => handleCheckboxesValue(item, index)}
                      onBlur={handleOnBlurCheckbox}
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
            <Button onClick={handleLoginToInit}>
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

export default HomeForm
