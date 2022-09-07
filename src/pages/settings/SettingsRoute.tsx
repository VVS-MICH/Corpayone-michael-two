import React, {useState} from 'react'
import Button from '../../components/Button'
import {client} from '../../util/roger-api-client'

export const SettingsRoute: React.FC<{}> = () => {
  const [working, setWorking] = useState(false)
  const [message, setMessage] = useState('')

  const reset = async () => {
    setWorking(true)
    await client.reset()
    setWorking(false)
    setMessage('All expenses were deleted.')
  }
  return (
    <>
      <h1>Data reset</h1>
      <p>Clicking this button will delete all expenses from localStorage.</p>
      {message && <div className="alert alert-info">{message}</div>}
      <p>
        <Button variant="danger" onClick={reset} disabled={working}>
          Delete all expenses
        </Button>
      </p>
    </>
  )
}

export default SettingsRoute
