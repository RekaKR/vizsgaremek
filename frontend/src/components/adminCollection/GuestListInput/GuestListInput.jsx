import React, { useState } from 'react'

const GuestListInput = ({ resPost, setResPost }) => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const submit = () => {
    fetch('http://localhost:3001/emailList', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        email: email,
        role: role,
      })
    }).then(res => res.json())
      .then(res => setResPost(resPost + 1))
      .catch(err => setResPost(false))
  }

  return (
    <div className="guest-list-input">
      <h4>Vendég hozzáadása</h4>
      <p>Add meg az új felhasználó email címét!</p>

      <div>
        <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email" />
      </div>

      <div>
        <input type="text" onChange={e => setRole(e.target.value)} placeholder="role" />
      </div>

      <button disabled={!(email && role)} onClick={() => submit()}>Submit</button>
    </div>
  )
}

export default GuestListInput