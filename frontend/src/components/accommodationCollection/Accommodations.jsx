import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Accommodation from './Accommodation'
//Szállás lehetőségek

const Accommodations = ({ accommodations }) => {

  return (
    <div className="accommodations">
      <h2>Szállás</h2>

      {accommodations && accommodations.map(accommodation => <Accommodation key={uuidv4()} accommodation={accommodation} />)}
    </div>
  )
}

export default Accommodations
