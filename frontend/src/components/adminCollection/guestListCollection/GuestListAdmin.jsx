import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useFetchGet from '../../../useFetchGet'
import useFetchDelete from '../../../useFetchDelete'
import GuestListInput from './GuestListInput'

const GuestListAdmin = () => {
  const [deleteById, setDeleteById] = useState('')
  const [changeDelete, setChangeDelete] = useState(false)
  const [resPost, setResPost] = useState(0)

  const deleteRecord = (guest) => {
    setDeleteById(guests.filter(item => item.key === guest.key) && guest._id)
    setChangeDelete(!changeDelete)
  }

  const { data: resDelete } = useFetchDelete(deleteById, `http://localhost:3001/api/emaillist/${deleteById}`, [changeDelete])
  const { data: guests } = useFetchGet(true, 'http://localhost:3001/api/emaillist', [resDelete, resPost])


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