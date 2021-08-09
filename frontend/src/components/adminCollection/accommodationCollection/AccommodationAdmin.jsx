import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useFetchDelete from '../../../customHooks/useFetchDelete'
import AccommodationInput from './AccommodationInput'

function AccommodationAdmin({ accommodations, setResPostAcc, setResDeleteAcc }) {
  const [deleteById, setDeleteById] = useState('')
  const [changeDelete, setChangeDelete] = useState(false)

  const { data } = useFetchDelete(deleteById, `http://localhost:3001/api/accommodation/${deleteById}`, [changeDelete])

  useEffect(() => {
    setResDeleteAcc(data)
  }, [data])

  const deleteRecord = (accommodation) => {
    setDeleteById(accommodations.filter(item => item.key === accommodation.key) && accommodation._id)
    setChangeDelete(!changeDelete)
  }

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

      <AccommodationInput setResPostAcc={setResPostAcc} />
    </div>
  )
}

export default AccommodationAdmin