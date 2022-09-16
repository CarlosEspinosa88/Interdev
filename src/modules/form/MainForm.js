import { useRef, useState, useEffect, useCallback, useMemo, useReducer } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/Input'
import SelectInput from '../../components/SelectInput'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'
import useReducerHook from './hook/useReducerHook'
import { ERROR_MESSAGES, SENIORITY, SALARY, TYPE, CURRENT_DATE, FRAMEWORKS } from '../../constanst/index'

export default function MainForm() {
  const { state, dispatch } = useReducerHook()
  const name = useRef(null)
  const lastName = useRef(null)
  const seniority = useRef(null)
  const salary = useRef(null)
  const date = useRef(null)
  const study = useRef(null)

  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    seniority: '',
    salary: '',
    date: '',
    study: []
  })

  const [hasError, setHasError] = useState({
    name: false,
    lastName: false,
    seniority: false,
    salary: false,
    date: false,
    study: false,
  })

  const [typeError, setTypeError] = useState({
    name: '',
    lastName: '',
    seniority: '',
    salary: '',
    date: '',
    study: ''
  })

  const DYNAMIC_REF = useMemo(() => {
    return {
      name,
      lastName,
      seniority,
      salary,
      date,
      study
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

  const handleOnBlurInputCheckbox = useCallback(
    function onBlurCheckbox(event) {
      const valueCheckbox = study.current.setValueByRef();

      if (valueCheckbox.length > 0) {
        setHasError((prevState) => ({
          ...prevState,
          study: false
        }))
        setTypeError((prevState) => ({
          ...prevState,
          study: ''
        }))
      } else {
        setHasError((prevState) => ({
          ...prevState,
          study: true
        }))
        setTypeError((prevState) => ({
          ...prevState,
          study: ERROR_MESSAGES.EMPTY
        }))

      }
    }, []
  )

  const handleOnChangeValue = useCallback(
    function onChange(event) {
      DYNAMIC_REF[event.target.name].current.onChangeValueByRef(event)
    }, [DYNAMIC_REF]
  )

  const handleOnChangeValueCheckbox = useCallback(
    function onChangeCheckbox(event) {
      study.current.onChangeValueByRef(event)
    }, []
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
      study: study.current.setValueByRef(),
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
        study.current.initialValueByRef()
  
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
    const valueAllCheckbox = study?.current?.setValueByRef()
    const includeStudy = valueAllCheckbox.length > 0
    const includeErrors = Object.values(hasError).includes(true)

    const INCOMPLETE_DATA = (
      includeErrors || 
      !includeStudy ||
      !valueName || 
      !valueLastName || 
      !valueSeniority || 
      !valueSalary || 
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

        <p>{typeError.study}</p>
        {FRAMEWORKS?.map((item, index) => (
          <div key={item.value}>
            <Checkbox
              ref={study}
              id={index}
              name={item.value}
              label={item.label}
              onChange={handleOnChangeValueCheckbox}
              onBlur={handleOnBlurInputCheckbox}
            />
          </div>
        ))}
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
      <div>
        {userData.study.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </>
  )
}
