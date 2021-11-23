import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'

export default function Home() {
  const [valueInput, setValueInput] = useState('')
  const [valueCheckbox, setValueCheckbox] = useState(false)

  function handleInput(event) {
    setValueInput(event.target.value)
  }

  function handleCheckbox() {
    setValueCheckbox((prevState) => !prevState)
  }

  return (
    <div>
      <Button>Button</Button>
      <Button loading={+true}>Button with long text</Button>
      <Button loading={+false} disabled={true}>Disabled</Button>
      <Input hasError errorMessage='Requerido' />
      <Input 
        required
        value={valueInput}
        label='Nombre completo'
        placeholder='Placeholder'
        onChange={handleInput}
      />
      <Input placeholder='Placeholder' value='Hola' disabled />
      <Checkbox id='20' label='React' error='Requerido' onChange={handleCheckbox} checked={valueCheckbox} />
      <Checkbox id='12' label='Angular' disabled/>
    </div>
  )
}
