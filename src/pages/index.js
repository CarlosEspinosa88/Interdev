import { useRef, useState, useEffect, useCallback, useMemo, useReducer } from 'react'
import HomeForm from '../modules/home'
import Layout from '../components/Layout'
import Input from '../components/Input'
import SelectInput from '../components/SelectInput'
import Button from '../components/Button'
import { ERROR_MESSAGES, SENIORITY, SALARY } from '../constanst/index'


export default function Home() {
  const [state, dispatch] = useReducer(reducerStates, initialState)

  const name = useRef(null)
  const lastName = useRef(null)
  const seniority = useRef(null)
  const salary = useRef(null)

  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    seniority: '',
    salary: ''
  })
  const [hasError, setHasError] = useState({
    name: false,
    lastName: false,
    seniority: false,
    salary: false
  })
  const [typeError, setTypeError] = useState({
    name: '',
    lastName: '',
    seniority: '',
    salary: ''
  })
  const DYNAMIC_REF = useMemo(() => {
    return {
      name,
      lastName,
      seniority,
      salary
    }
  }, [])

  const handleOnBlurInput = useCallback(
    function onBlur(event) {

      if (event.target.type === 'text') {
        if (DYNAMIC_REF[event.target.name].current?.value && hasError.[event.target.name]) {
          setHasError((prevState) => ({
            ...prevState,
            [event.target.name]: false
          }))
          setTypeError((prevState) => ({
            ...prevState,
            [event.target.name]: ''
          }))
        } 
        
        else if (!DYNAMIC_REF[event.target.name].current?.value && !hasError.[event.target.name]) {
          setHasError((prevState) => ({
            ...prevState,
            [event.target.name]: true
          }))
          setTypeError((prevState) => ({
            ...prevState,
            [event.target.name]: ERROR_MESSAGES.EMPTY
          }))
        }
      }

      if (event.target.type === 'select-one') {
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
      }
  }, [hasError, DYNAMIC_REF])

  const handleOnChangeValue = useCallback(
    function onChange(event) {
    
      // if (state.disabled) {
      //   // setDisabled(false)
      //   dispatch({
      //     type: 'setDisabledButton',
      //     payload: { disabled: false }
      //   })
      // }
  
      // else if (!state.disabled) {
      //   // setDisabled(true)
      //   dispatch({
      //     type: 'setDisabledButton',
      //     payload: { disabled: true }
      //   })
      // }

      if (event.target.name === 'seniority' || event.target.name === 'salary') {
        DYNAMIC_REF[event.target.name].current.onChangeValueByRef(event)
      }
    }, [DYNAMIC_REF]
  )

  function handlePress(event) {
    event.preventDefault();
    
    dispatch({
      type: 'setLoadingButton',
      payload: { loading: true, sendData: true }
    })

    setUserData((prevState) => ({
      ...prevState,
      name: name.current.value,
      lastName: lastName.current.value,
      seniority: seniority.current.setValueByRef('seniority'),
      salary: salary.current.setValueByRef('salary'),
    }))
  }

  function resetValues() {
    setTimeout(() => {
      name.current.value = ''
      lastName.current.value = ''
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
    const valueSeniority = seniority?.current?.setValueByRef('seniority')
    const valueSalary = salary?.current?.setValueByRef('salary')
    const includeErrors = Object.values(hasError).includes(true)

    if (includeErrors || !valueName || !valueLastName || !valueSeniority || !valueSalary) {
      dispatch({
        type: 'setDisabledButton',
        payload: { disabled: true }
      })
    } 

    else if (!includeErrors && valueName && valueLastName && valueSeniority && valueSalary) {
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
      <form onSubmit={handlePress}>
        <Input
          ref={name}
          required
          name='name'
          id='id-name'
          hasError={hasError.name}
          label='Nombre' 
          errorMessage={typeError.name}
          placeholder='Escribe tu nombre'
          onBlur={handleOnBlurInput}
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
          onBlur={handleOnBlurInput}
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
          onBlur={handleOnBlurInput}
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
          onBlur={handleOnBlurInput}
          onChange={handleOnChangeValue}
        />
        <Button
          disabled={state.disabled}
          loading={state.loading}
          onClick={handlePress}
        >
          Enviar
        </Button>
      </form>
      <p>{userData.name}</p>
      <p>{userData.lastName}</p>
      <p>{userData.seniority}</p>
      <p>{userData.salary}</p>
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