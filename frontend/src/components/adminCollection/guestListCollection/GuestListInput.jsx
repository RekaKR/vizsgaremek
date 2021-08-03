import React, { useState } from 'react'
import validator from 'validator'

import ComboBox from '../../ComboBox/ComboBox'

const GuestListInput = ({ resPost, setResPost }) => {
  const options = ['vendég', 'esküvőszervező']
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(options[0])
  const [emailError, setEmailError] = useState('')

  const submit = () => {
    fetch('http://localhost:3001/api/emaillist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        email: email,
        role: (role === 'vendég' ? "guest" : "weddingP"),
      })
    }).then(res => res.json())
      .then(res => setResPost(resPost + 1))
      .catch(err => setResPost(false))
  }

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
      <h4>Vendég hozzáadása</h4>
      <p>Add meg az új felhasználó email címét!</p>

      <div>
        <input type="text" onChange={e => validateEmail(e)} placeholder="Email" />
        <span>{emailError}</span>
        <ComboBox options={options} value={role} setValue={setRole} label="Megnevezés" />
      </div>

      <button disabled={!(email && role)} onClick={() => submit()}>Submit</button>
    </div>
  )
}

export default GuestListInput