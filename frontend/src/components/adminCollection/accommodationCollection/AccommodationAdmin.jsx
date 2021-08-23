import React, { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ProfileContext } from '../../../ProfileContext'
import useFetchDelete from '../../../customHooks/useFetchDelete'

import AccommodationInput from './AccommodationInput'
import DeleteButton from '../../elementsCollection/DeleteButton/DeleteButton'

const AccommodationAdmin = () => {
  const { accommodations, setResDeleteAcc } = useContext(ProfileContext)

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
      <h2>Szállás</h2>

      <div className="accommodation-container">
        <div className="accommodation">
          <h3>Szállás lista</h3>

          {accommodations && accommodations.map(accommodation =>
            <div className="accommodation-names" key={uuidv4()}>
              <p>{accommodation.name}</p>

              <DeleteButton deleteRecord={deleteRecord} element={accommodation} />
            </div>)
          }
        </div>

        <AccommodationInput />
      </div>
    </div>
  )
}

export default AccommodationAdmin