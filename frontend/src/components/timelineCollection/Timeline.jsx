import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Event from './Event'

const Timeline = ({ events }) => {
  return (
    <div className="timeline">
      <h2>Menetrend</h2>

      {events && events.map(event => <Event key={uuidv4()} event={event} />)}
    </div>
  )
}

export default Timeline
