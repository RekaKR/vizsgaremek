import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useFetchGet from '../../../customHooks/useFetchGet'
import useFetchDelete from '../../../customHooks/useFetchDelete'
import GuestListInput from './GuestListInput'
import DeleteButton from '../../elementsCollection/DeleteButton/DeleteButton'
import '../../../style/css/guestList.css'

const GuestListAdmin = () => {
  const [deleteById, setDeleteById] = useState('')
  const [changeDelete, setChangeDelete] = useState(false)
  const [resPost, setResPost] = useState(0)

  const { data: resDelete } = useFetchDelete(deleteById, `http://localhost:3001/api/emaillist/${deleteById}`, [changeDelete])
  const { data: guests } = useFetchGet(true, 'http://localhost:3001/api/emaillist', [resDelete, resPost])

  const deleteRecord = (guest) => {
    setDeleteById(guests.filter(item => item.key === guest.key) && guest._id)
    setChangeDelete(!changeDelete)
  }

  return (
    <div className="admin-guest-list">
      <h3>Vendéglista</h3>

      <div className="guest-list-container">
        <div className="guest-list">
          <h4>Vendéglista (részletezve)</h4>
          {
            guests && guests.map(guest =>
              <div className="guest-list-names" key={uuidv4()}>
                <p>{guest.email}</p>
                <DeleteButton deleteRecord={deleteRecord} element={guest} />
              </div>)
          }
        </div>

        <GuestListInput resPost={resPost} setResPost={setResPost} />
      </div>
    </div>
  )
}

export default GuestListAdmin