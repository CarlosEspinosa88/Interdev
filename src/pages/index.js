import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Home() {
  const [valueInput, setValueInput ] = useState('')

  function handleInput(event) {
    setValueInput(event.target.value)
  }

  return (
    <div>
      <Button>Button</Button>
      <Button loading={+true}>Button with long text</Button>
      <Button loading={+false} disabled={true}>Disabled</Button>
      <Input hasError errorMessage='Obligatorio' />
      <Input 
        required
        value={valueInput}
        label='Nombre completo'
        placeholder='Placeholder'
        onChange={handleInput}
      />
      <Input disabled value='Hola' />
    </div>
  )
}
