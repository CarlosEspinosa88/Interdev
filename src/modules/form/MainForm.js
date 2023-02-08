import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { logoutGithubAuth } from '../../firebase/logout'
import { redirectToGithub } from '../../firebase/login'
import { sendDataToFirebase } from '../../firebase/sendData'
import Image from 'next/image'
import logo from '../../../public/githubo.png'
import Layout from '../../components/Layout'
import Input from '../../components/Input'
import SelectInput from '../../components/SelectInput'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'
import useReducerHook from './hook/useReducerHook'
import CheckboxGroup from '../chekcbox-group/CheckboxGroup'
import { 
  TYPE,
  SALARY,
  SENIORITY,
  ERROR_MESSAGES,
  CURRENT_DATE,
  FRAMEWORKS,
  EXPERIENCE
} from '../../constanst/index'
import {
  StyledFormContainer,
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
 } from './styles'

export default function MainForm() {
  const { state, dispatch } = useReducerHook()
  const name = useRef(null)
  const seniority = useRef(null)
  const salary = useRef(null)
  const date = useRef(null)
  const experience = useRef(null)

  const [userData, setUserData] = useState(null)
  const [isSendedData, setIsSendedData] = useState(false)
  const [valueAllCheckbox, setValueAllCheckbox] = useState([])
  const [stateChecked, setStateChecked] = useState(Array(FRAMEWORKS.length).fill(false))
  const [stateButton, setStateButton] = useState({
    isLoading: false,
    isDisabled: false,
  })
  const [userName, setUserName] = useState('')
  const [hasError, setHasError] = useState({
    name: false,
    seniority: false,
    salary: false,
    experience: false,
    date: false,
    study: false,
  })
  const [typeError, setTypeError] = useState({
    name: '',
    seniority: '',
    salary: '',
    experience: '',
    date: '',
    study: ''
  })
  const DYNAMIC_REF = useMemo(() => {
    return {
      name,
      seniority,
      salary,
      date,
      experience
    }
  }, [])
  const githubClient = userData?.auth?.currentUser?.reloadUserInfo?.screenName
  
  const handleOnBlurInputText = useCallback(
    function onBlurText(event) {
      const target = event.target.name;
      const valueBySelect = DYNAMIC_REF[target].current.setValueByRef(target);

      if (valueBySelect) {
        setHasError((prevState) => ({
          ...prevState,
          [target]: false
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [target]: ''
        }))
      } 

      else if (!valueBySelect) {
        setHasError((prevState) => ({
          ...prevState,
          [target]: true
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [target]: ERROR_MESSAGES.EMPTY
        }))
      }
    }, [DYNAMIC_REF]
  )

  const handleOnBlurInputSelect = useCallback(
    function onBlurSelect(event) {
      const target = event.target.name;
      const valueBySelect = DYNAMIC_REF[target].current.setValueByRef(target)

      if (valueBySelect) {
        setHasError((prevState) => ({
          ...prevState,
          [target]: false
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [target]: ''
        }))
      }

      else if (!valueBySelect) {
        setHasError((prevState) => ({
          ...prevState,
          [target]: true
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [target]: ERROR_MESSAGES.EMPTY
        }))
      }

    }, [DYNAMIC_REF]
  )

  const handleOnBlurInputDates = useCallback(
    function onBlurDates(event) {
      const target = event.target.name;
      const valueByDate = DYNAMIC_REF[target].current.setValueByRef(target);
      const validDates = valueByDate && event.target.value > CURRENT_DATE;

      if (validDates) {
        setHasError((prevState) => ({
          ...prevState,
          [target]: false
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [target]: ''
        }))
      }

      else if (!validDates) {
        setHasError((prevState) => ({
          ...prevState,
          [target]: true
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [target]: ERROR_MESSAGES.DATE
        }))
      }
    }, [DYNAMIC_REF]
  )

  const handleOnChangeValue = useCallback(
    function onChange(event) {
      DYNAMIC_REF[event.target.name].current.onChangeValueByRef(event)
    }, [DYNAMIC_REF]
  )

  function handleOnSubmitForm(event) {
    event.preventDefault();

    dispatch({
      type: 'setLoadingButton',
      payload: { loading: true, sendData: true }
    })

    setUserName(name.current.setValueByRef('name'))
    sendDataToFirebase({
      gitHub: `github.com/${githubClient}`,
      name: name.current.setValueByRef('name'),
      seniority: seniority.current.setValueByRef('seniority'),
      experience: experience.current.setValueByRef('experience'),
      salary: salary.current.setValueByRef('salary'),
      date: date.current.setValueByRef('date'),
      study: valueAllCheckbox
    })

    setTimeout(() => {
      logoutGithubAuth(setUserData, setIsSendedData)
      setStateButton((prevState) => ({
        ...prevState,
        isLoading: false,
      }))
    }, 2000)
  }

  const resetValues = useCallback(
    function reset() {
      setTimeout(() => {
        name.current.initialValueByRef('name')
        date.current.initialValueByRef('date')
        seniority.current.initialValueByRef('seniority')
        salary.current.initialValueByRef('salary')
        experience.current.initialValueByRef('experience')
        setStateChecked(Array(FRAMEWORKS.length).fill(false))
        setValueAllCheckbox([])
  
        dispatch({
          type: 'setLoadingButton',
          payload: { loading: false, sendData: false }
        })
      })
    }, [dispatch]
  )

  function handleLoginToInit() {
    redirectToGithub(setUserData);
  }

  useEffect(() => {
    const valueName = name?.current?.setValueByRef('name')
    const valueDate = date?.current?.setValueByRef('date')
    const valueSeniority = seniority?.current?.setValueByRef('seniority')
    const valueSalary = salary?.current?.setValueByRef('salary')
    const valueExperience = experience?.current?.setValueByRef('experience')
    const includeErrors = Object.values(hasError).includes(true)
    const includeStudy = valueAllCheckbox.length > 0

    const INCOMPLETE_DATA = (
      includeErrors || 
      !includeStudy ||
      !valueName || 
      !valueSeniority || 
      !valueSalary || 
      !valueExperience ||
      !valueDate
    )

    if (INCOMPLETE_DATA) {
      dispatch({
        type: 'setDisabledButton',
        payload: { disabled: true }
      })
    } 
    
    else if (!INCOMPLETE_DATA) {
      dispatch({
        type: 'setDisabledButton',
        payload: { disabled: false }
      })
    }

    if (state.sendData) {
      resetValues()
    }
  }, [hasError, state.sendData, dispatch, resetValues, valueAllCheckbox])

  return (
    <>
      {userData ? (
        <form onSubmit={handleOnSubmitForm}>
          <StyledFormContainer>
            <StyledGithubContainer>
              <StyledFirstColumnAvatar>
                <StyledAvatar>
                  <Image
                    height="200"
                    width="200"
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
                ref={name}
                required
                name='name'
                id='id-name'
                hasError={hasError.name}
                label='Nombre y apellido*'
                errorMessage={typeError.name}
                placeholder='Ingresa tu nombre completo'
                onBlur={handleOnBlurInputText}
                onChange={handleOnChangeValue}
              />
            </div>
            <StyledSelectsContainer>
              <StyledFirstColumnContainer>
                <SelectInput
                  ref={seniority}
                  required
                  id='id-seniority'
                  name='seniority'
                  Label='Seniority*'
                  hasError={hasError.seniority}
                  errorMessage={typeError.seniority}
                  options={SENIORITY}
                  onBlur={handleOnBlurInputSelect}
                  onChange={handleOnChangeValue}
                />
              </StyledFirstColumnContainer>
              <StyledFirstColumnContainer>
                <SelectInput
                  ref={salary}
                  required
                  id='id-salary'
                  name='salary'
                  Label='Aspiración salarial*'
                  hasError={hasError.salary}
                  errorMessage={typeError.salary}
                  options={SALARY}
                  onBlur={handleOnBlurInputSelect}
                  onChange={handleOnChangeValue}
                />
              </StyledFirstColumnContainer>
            </StyledSelectsContainer>
            <StyledSelectsContainer>
              <StyledFirstColumnContainer>
                <SelectInput
                  ref={experience}
                  required
                  id='id-experience'
                  name='experience'
                  Label='Años de experiencia*'
                  hasError={hasError.experience}
                  errorMessage={typeError.experience}
                  options={EXPERIENCE}
                  onBlur={handleOnBlurInputSelect}
                  onChange={handleOnChangeValue}
                />
              </StyledFirstColumnContainer>
              <StyledFirstColumnContainer>
                <Input
                  ref={date}
                  required
                  type={TYPE.DATE}
                  id='id-date'
                  name='date'
                  label='Fecha de ingreso*'
                  hasError={hasError.date}
                  errorMessage={typeError.date}
                  onBlur={handleOnBlurInputDates}
                  onChange={handleOnChangeValue}
                />
              </StyledFirstColumnContainer>
            </StyledSelectsContainer>
            <CheckboxGroup
              valueAllCheckbox={valueAllCheckbox}
              setValueAllCheckbox={setValueAllCheckbox}
              hasError={hasError.study}
              typeError={typeError.study}
              setHasError={setHasError}
              setTypeError={setTypeError}
              stateChecked={stateChecked}
              setStateChecked={setStateChecked}
            />
          </StyledFormContainer>
          <Button
            type={TYPE.SUBMIT}
            disabled={state.disabled}
            loading={state.loading}
            onClick={handleOnSubmitForm}
          >
            Enviar información
          </Button>
        </form>
      ) : (
        <StyledLoginContainer>
          {isSendedData && !userData ? (
            <StyledContainerThanks>
              <StyledCentered>
                <h1>!Gracias {userName}!</h1>
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
