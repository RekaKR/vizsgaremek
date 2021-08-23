import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ProfileContext } from '../../ProfileContext'
import Accommodation from './Accommodation'

const Accommodations = () => {
  const { accommodations } = useContext(ProfileContext)

  return (
    <div className="accommodations">
      <h2>Szállás</h2>

      <div className="accommodation-container">
        {accommodations && accommodations.map(accommodation => <Accommodation key={uuidv4()} accommodation={accommodation} />)}
      </div>
    </div>
  )
}

export default Accommodations
