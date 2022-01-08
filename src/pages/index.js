import { useRef, useState, useEffect } from 'react'
import HomeForm from '../modules/home'
import Layout from '../components/Layout'
import Input from '../components/Input'
import Button from '../components/Button'


export default function Home() {
  const [info, setInfo] = useState({
    name: '',
    description: '',
  })
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const name = useRef(null)
  const description = useRef(null)

  const DYNAMIC_REF = {
    name,
    description
  }

  function handleOnChangeValue(event) {
    if (DYNAMIC_REF[event.target.name].current.value) {
      setDisabled(false)
    }

    else if (!DYNAMIC_REF[event.target.name].current.value) {
      setDisabled(true)
    }
  }

  function handleOnBlurInput(event) {
    if (DYNAMIC_REF[event.target.name].current?.value) {
      error && setError(false)
    } 
    
    else if (!DYNAMIC_REF[event.target.name].current?.value) {
      !error && setError(true)
    }
  }

  function handlePress() {
    setInfo((prevState) => ({
      ...prevState,
      name: name.current.value,
      description: description.current.value
    }))
    setDisabled(true)
  }

  useEffect(() => {
    if (error || !name?.current?.value || !description?.current?.value) {
      setDisabled(true)
    } else if (!error && name?.current?.value && description?.current?.value) {
      setDisabled(false)
    }
  }, [disabled, error])

  return (
    <Layout>
      <form onSubmit={handlePress}>
        <input placeholder='Tu nombre' name="name" ref={name} onBlur={handleOnBlurInput} onChange={handleOnChangeValue} />
        <input placeholder='Descripción' name="description" ref={description} onBlur={handleOnBlurInput} onChange={handleOnChangeValue} />
        <Button disabled={disabled} onClick={handlePress}>Click</Button>
        {error && (<p>Hay errores</p>)}
      </form>
      <p>{info.name}</p>
      <p>{info.description}</p>
    </Layout>
  )
}
