import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import GuestListInput from '../GuestListInput/GuestListInput'

const GuestListAdmin = () => {
  const [guests, setGuests] = useState(null)
  const [deleteById, setDeleteById] = useState('')
  const [changeDelete, setChangeDelete] = useState(false)
  const [resDelete, setResDelete] = useState(0)
  const [resPost, setResPost] = useState(0)
  /*
    const resetRes = () => {
      if (resDelete === 10) setResDelete(0)
    }
  */
  useEffect(() => {
    fetch('http://localhost:3001/emailList')
      .then(res => res.json())
      .then(data => setGuests(data))
      .catch(err => setGuests(null))
  }, [resDelete, resPost])

  const deleteRecord = (guest) => {
    setDeleteById(guests.filter(item => item.key === guest.key) && guest._id)
    setChangeDelete(!changeDelete)
  }

  useEffect(() => {
    fetch(`http://localhost:3001/emailList/${deleteById}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then(res => setResDelete(resDelete + 1))
      .catch(err => setResDelete(false))
    //.finally(() => resetRes())
  }, [changeDelete])


  return (
    <div className="admin-guest-list">
      <h3>Vendéglista</h3>

      <h4>Vendéglista (részletezve)</h4>
      {
        guests && guests.map(guest =>
          <div key={uuidv4()}>
            <p>{guest.email}</p>
            <button onClick={() => deleteRecord(guest)}>Felhasználó törlése</button>
          </div>)
      }

      <GuestListInput resPost={resPost} setResPost={setResPost} />
    </div>
  )
}

export default GuestListAdmin