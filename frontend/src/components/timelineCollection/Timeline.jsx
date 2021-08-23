import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ProfileContext } from '../../ProfileContext'

import Event from './Event'

const Timeline = () => {
  const { events } = useContext(ProfileContext)

  return (
    <div className="timeline">
      <h2>Menetrend</h2>

      <div className="timeline-container">
        {events && events.map(event => <Event key={uuidv4()} event={event} />)}
      </div>
    </div>
  )
}

export default Timeline
