import React, { useState, useEffect } from 'react'
import validator from 'validator'
import useFetchPost from '../../../customHooks/useFetchPost'
import TextField from '@material-ui/core/TextField'
import ComboBox from '../../elementsCollection/ComboBox/ComboBox'

const GuestListInput = ({ setResPost }) => {
  const options = ['vendég', 'esküvőszervező']
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(options[0])
  const [emailError, setEmailError] = useState('')
  const [submit, setSubmit] = useState(true)

  const postBody = {
    email: email,
    role: (role === 'vendég' ? "guest" : "weddingP"),
  }

  const { data } = useFetchPost((email && role), 'http://localhost:3001/api/emaillist', postBody, [submit])

  useEffect(() => {
    setResPost(data)
    setEmail('')
    setRole('')
  }, [data])

  const validateEmail = (e) => {
    const email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('')
      setEmail(email)
    } else {
      setEmailError('Enter valid Email!')
      setEmail(null)
    }
  }

  return (
    <div className="guest-list-input">
      <h3>Új vendég hozzáadása</h3>
      <p>Add meg az új esküvőszervező, vendég címét!</p>

      <div>
        <form noValidate autoComplete="off">
          <TextField className="guest-list-i" id="outlined-size-normal" label="Email" variant="outlined"
            value={email} onChange={e => validateEmail(e)} />
        </form>

        <span>{emailError}</span>
        <ComboBox classN="guest-list-i" label="Megnevezés" options={options} value={role} setValue={setRole} />
      </div>

      <button className="send-button" disabled={!(email && role)} onClick={() => setSubmit(!submit)}>Küldés</button>
    </div>
  )
}

export default GuestListInput