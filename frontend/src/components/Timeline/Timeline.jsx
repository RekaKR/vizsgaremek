import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Event from '../Event/Event'
//Esküvő menetrend

const Timeline = ({ timeline }) => {

  return (
    <div className="timeline">
      <h2>Menetrend</h2>

      {timeline && timeline.map(event => <Event key={uuidv4()} event={event} />)}
    </div>
  )
}

export default Timeline
