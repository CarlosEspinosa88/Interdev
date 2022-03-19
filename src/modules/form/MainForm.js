import { useRef, useState, useEffect, useCallback, useMemo, useReducer } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/Input'
import SelectInput from '../../components/SelectInput'
import Button from '../../components/Button'
import useReducerHook from './hook/useReducerHook'
import { ERROR_MESSAGES, SENIORITY, SALARY, TYPE, CURRENT_DATE } from '../../constanst/index'

export default function MainForm() {
  const { state, dispatch } = useReducerHook()
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

  function handlePressForm(event) {
    event.preventDefault();

    dispatch({
      type: 'setLoadingButton',
      payload: { loading: true, sendData: true }
    })

    setUserData((prevState) => ({
      ...prevState,
      name: name.current.setValueByRef('name'),
      lastName: lastName.current.setValueByRef('lastName'),
      date: date.current.setValueByRef('date'),
      seniority: seniority.current.setValueByRef('seniority'),
      salary: salary.current.setValueByRef('salary'),
    }))
  }

  const resetValues = useCallback(
    function reset() {
      setTimeout(() => {
        name.current.initialValueByRef('name')
        lastName.current.initialValueByRef('lastName')
        date.current.initialValueByRef('date')
        seniority.current.initialValueByRef('seniority')
        salary.current.initialValueByRef('salary')
  
        dispatch({
          type: 'setLoadingButton',
          payload: { loading: false, sendData: false }
        })
      })
    }, [dispatch]
  )

  useEffect(() => {
    const valueName = name?.current?.setValueByRef('name')
    const valueLastName = lastName?.current?.setValueByRef('lastName')
    const valueDate = date?.current?.setValueByRef('date')
    const valueSeniority = seniority?.current?.setValueByRef('seniority')
    const valueSalary = salary?.current?.setValueByRef('salary')
    const includeErrors = Object.values(hasError).includes(true)

    
    const IMCOMPLETE_DATA = (
      includeErrors || 
      !valueName || 
      !valueLastName || 
      !valueSeniority || 
      !valueSalary || 
      !valueDate
    )

    if (IMCOMPLETE_DATA) {
      dispatch({
        type: 'setDisabledButton',
        payload: { disabled: true }
      })
    } 
    
    else if (!IMCOMPLETE_DATA) {
      dispatch({
        type: 'setDisabledButton',
        payload: { disabled: false }
      })
    }

    if (state.sendData) {
      resetValues()
    }
  }, [hasError, state.sendData, dispatch, resetValues])

  return (
    <>
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
    </>
  )
}
