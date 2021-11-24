import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import SelectInput from '../components/SelectInput'
import Checkbox from '../components/Checkbox'

export default function Home() {
  const [valueInput, setValueInput ] = useState('')
  const [valueSelect, setValueSelect ] = useState('banana')
  const [valueCheckbox, setValueCheckbox] = useState(false)

  function handleInput(event) {
    setValueInput(event.target.value)
  }

  function handleCheckbox() {
    setValueCheckbox((prevState) => !prevState)
  }

  function handleSelect(event) {
    setValueSelect(event.target.value)
  }

  const options = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pineapple",
      value: "pineapple",
    },
  ];

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
      <Input disabled value='Hola' />
      <Checkbox id='20' label='React' error='Requerido' onChange={handleCheckbox} checked={valueCheckbox} />
      <Checkbox id='12' label='Angular' disabled/>
      <SelectInput disabled options={options} />
      <SelectInput 
        id='Select-id'
        name='Frutas'
        options={options}
        value={valueSelect}
        onChange={handleSelect}
        hasError
        errorMessages="Requerido"
      />
    </div>
  )
}
