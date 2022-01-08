import * as dayjs from 'dayjs'

import { useRef, useState, useEffect, useCallback, useMemo, useReducer } from 'react'
import HomeForm from '../modules/home'
import Layout from '../components/Layout'
import Input from '../components/Input'
import SelectInput from '../components/SelectInput'
import Button from '../components/Button'
import { ERROR_MESSAGES, SENIORITY, SALARY, TYPE } from '../constanst/index'

const todayDate = dayjs().format('YYYY-MM-DD');

export default function Home() {
  const [state, dispatch] = useReducer(reducerStates, initialState)

  const name = useRef(null)
  const lastName = useRef(null)
  const seniority = useRef(null)
  const salary = useRef(null)
  const date = useRef(null)

  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    seniority: '',
    salary: '',
    date: ''
  })

  const [hasError, setHasError] = useState({
    name: false,
    lastName: false,
    seniority: false,
    salary: false,
    date: false,
  })

  const [typeError, setTypeError] = useState({
    name: '',
    lastName: '',
    seniority: '',
    salary: '',
    date: ''
  })

  const DYNAMIC_REF = useMemo(() => {
    return {
      name,
      lastName,
      seniority,
      salary,
      date
    }
  }, [])

  const handleOnBlurInputText = useCallback(
    function onBlurText(event) {
      if (DYNAMIC_REF[event.target.name].current?.value && hasError[event.target.name]) {
        setHasError((prevState) => ({
          ...prevState,
          [event.target.name]: false
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [event.target.name]: ''
        }))
      } 

      else if (!DYNAMIC_REF[event.target.name].current?.value && !hasError[event.target.name]) {
        setHasError((prevState) => ({
          ...prevState,
          [event.target.name]: true
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [event.target.name]: ERROR_MESSAGES.EMPTY
        }))
      }
    }, [hasError, DYNAMIC_REF]
  )

  const handleOnBlurInputSelect = useCallback(
    function onBlurSelect(event) {
      const valueBySelect = DYNAMIC_REF[event.target.name].current.setValueByRef(event.target.name)

        if (valueBySelect) {
          setHasError((prevState) => ({
            ...prevState,
            [event.target.name]: false
          }))
          setTypeError((prevState) => ({
            ...prevState,
            [event.target.name]: ''
          }))
        }

        else if (!valueBySelect) {
          setHasError((prevState) => ({
            ...prevState,
            [event.target.name]: true
          }))
          setTypeError((prevState) => ({
            ...prevState,
            [event.target.name]: ERROR_MESSAGES.EMPTY
          }))
        }

    }, [DYNAMIC_REF]
  )

  const handleOnBlurInputDates = useCallback(
    function onBlurDates(event) {
      if (
        DYNAMIC_REF[event.target.name].current?.value && hasError[event.target.name] &&
        event.target.value > todayDate
      ) {
        setHasError((prevState) => ({
          ...prevState,
          [event.target.name]: false
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [event.target.name]: ''
        }))
      }

      else if (
        !DYNAMIC_REF[event.target.name].current?.value || !hasError[event.target.name] &&
        event.target.value < todayDate
      ) {
        setHasError((prevState) => ({
          ...prevState,
          [event.target.name]: true
        }))
        setTypeError((prevState) => ({
          ...prevState,
          [event.target.name]: ERROR_MESSAGES.DATE
        }))
      }
    }, [DYNAMIC_REF, hasError]
  )

  const handleOnChangeValue = useCallback(
    function onChange(event) {
      if (event.target.name === 'seniority' || event.target.name === 'salary') {
        DYNAMIC_REF[event.target.name].current.onChangeValueByRef(event)
      }
    }, [DYNAMIC_REF]
  )

  function handlePressForm(event) {
    event.preventDefault();

    dispatch({
      type: 'setLoadingButton',
      payload: { loading: true, sendData: true }
    })

    setUserData((prevState) => ({
      ...prevState,
      name: name.current.value,
      lastName: lastName.current.value,
      date: date.current.value,
      seniority: seniority.current.setValueByRef('seniority'),
      salary: salary.current.setValueByRef('salary'),
    }))
  }

  function resetValues() {
    setTimeout(() => {
      name.current.value = ''
      lastName.current.value = ''
      date.current.value = ''
      seniority.current.initialValueByRef('seniority')
      salary.current.initialValueByRef('salary')

      dispatch({
        type: 'setLoadingButton',
        payload: { loading: false, sendData: false }
      })
    }, 500)
  }

  useEffect(() => {
    const valueName = name?.current?.value
    const valueLastName = lastName?.current?.value
    const valueDate = date?.current?.value
    const valueSeniority = seniority?.current?.setValueByRef('seniority')
    const valueSalary = salary?.current?.setValueByRef('salary')
    const includeErrors = Object.values(hasError).includes(true)

    const isValid = includeErrors || !valueName || !valueLastName || !valueSeniority || !valueSalary || !valueDate
    const isInValid = !includeErrors && valueName && valueLastName && valueSeniority && valueSalary && valueDate

    if (isValid) {
      dispatch({
        type: 'setDisabledButton',
        payload: { disabled: true }
      })
    } 

    else if (isInValid) {
      dispatch({
        type: 'setDisabledButton',
        payload: { disabled: false }
      })
    }

    if (state.sendData) {
      resetValues()
    }
  }, [hasError, state.sendData])

  return (
    <Layout>
      <form onSubmit={handlePressForm}>
        <Input
          ref={name}
          required
          name='name'
          id='id-name'
          hasError={hasError.name}
          label='Nombre' 
          errorMessage={typeError.name}
          placeholder='Escribe tu nombre'
          onBlur={handleOnBlurInputText}
          onChange={handleOnChangeValue}
        />
        <Input
          ref={lastName}
          required
          id='id-lastName'
          name='lastName'
          hasError={hasError.lastName}
          label='Apellido'
          errorMessage={typeError.lastName}
          placeholder='Escribe tu Apellido'
          onBlur={handleOnBlurInputText}
          onChange={handleOnChangeValue}
        />
        <SelectInput
          ref={seniority}
          required
          id='id-seniority'
          name='seniority'
          Label='Señority'
          hasError={hasError.seniority}
          errorMessage={typeError.seniority}
          options={SENIORITY}
          onBlur={handleOnBlurInputSelect}
          onChange={handleOnChangeValue}
        />
        <SelectInput
          ref={salary}
          required
          id='id-salary'
          name='salary'
          Label='Salario'
          hasError={hasError.salary}
          errorMessage={typeError.salary}
          options={SALARY}
          onBlur={handleOnBlurInputSelect}
          onChange={handleOnChangeValue}
        />
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
        <Button
          disabled={state.disabled}
          loading={state.loading}
          onClick={handlePressForm}
        >
          Enviar
        </Button>
      </form>
      <p>{userData.name}</p>
      <p>{userData.lastName}</p>
      <p>{userData.seniority}</p>
      <p>{userData.salary}</p>
      <p>{userData.date}</p>
    </Layout>
  )
}

const initialState = {
  loading: false,
  disabled: true,
  sendData: false
}

function reducerStates(state, action) {
  switch (action.type) {
    case 'setDisabledButton': {
      return {
        ...state,
        disabled: action.payload.disabled
      }
    }
    case 'setLoadingButton': {
      return {
        ...state,
        loading: action.payload.loading,
        sendData: action.payload.sendData
      }
    }
  }
}
