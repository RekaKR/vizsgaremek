import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Event from '../../timelineCollection/Event/Event'
import TimelineInput from '../TimelineInput/TimelineInput'

function AdminAccommodation({ events }) {
  return (
    <div className="admin-timeline">
      <h3>Menetrend</h3>

      <h4>Menetrend lista</h4>
      {
        events && events.map(event =>
          <div key={uuidv4()}>
            <Event event={event} />
            <h4>Menetrend szerkesztése</h4>
          </div>)
      }

      <TimelineInput />
    </div>
  );
}

export default AdminAccommodation