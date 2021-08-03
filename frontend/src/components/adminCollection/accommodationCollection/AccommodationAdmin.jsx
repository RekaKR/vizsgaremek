import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AccommodationInput from './AccommodationInput'

function AccommodationAdmin({ accommodations, resDeleteAcc, setResDeleteAcc, resPostAcc, setResPostAcc }) {
  const [deleteById, setDeleteById] = useState('')
  const [changeDelete, setChangeDelete] = useState(false)

  const deleteRecord = (accommodation) => {
    setDeleteById(accommodations.filter(item => item.key === accommodation.key) && accommodation._id)
    setChangeDelete(!changeDelete)
  }

  useEffect(() => {
    if (deleteById) {
      fetch(`http://localhost:3001/api/accommodation/${deleteById}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }).then(res => res.json())
        .then(res => setResDeleteAcc(resDeleteAcc + 1))
        .catch(err => setResDeleteAcc(false))
      //.finally(() => resetRes())
    }
  }, [changeDelete])

  return (
    <div className="admin-accommodation">
      <h3>Szállás</h3>

      <h4>Szállás lista</h4>
      {accommodations && accommodations.map(accommodation =>
        <div key={uuidv4()}>
          <p>{accommodation.name}</p>
          <button onClick={() => deleteRecord(accommodation)}>Szállás törlése</button>
        </div>)
      }

      <AccommodationInput resPostAcc={resPostAcc} setResPostAcc={setResPostAcc} />
    </div>
  )
}

export default AccommodationAdmin