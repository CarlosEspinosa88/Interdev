import Button from '../components/Button'

export default function Home() {
  return (
    <div>
      <Button>Button</Button>
      <Button loading={+true}>Button with long text</Button>
      <Button loading={+false} disabled={true}>Disabled</Button>
    </div>
  )
}
