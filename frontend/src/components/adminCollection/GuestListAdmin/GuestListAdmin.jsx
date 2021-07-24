import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import GuestListInput from '../GuestListInput/GuestListInput'

const GuestListAdmin = () => {
  const [guests, setGuests] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/emailList')
      .then(res => res.json())
      .then(data => setGuests(data))
      .catch(err => setGuests(null))
  }, [])

  return (
    <div className="admin-guest-list">
      <h3>Vendéglista</h3>

      <h4>Vendéglista (részletezve)</h4>
      {
        guests && guests.map(guest =>
          <div key={uuidv4()}>
            <p>{guest.email}</p>
            <h4>Felhasználó szerkesztése</h4>
          </div>)
      }

      <GuestListInput />
    </div>
  )
}

export default GuestListAdmin