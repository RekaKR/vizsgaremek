import React from 'react'

const Event = ({ event }) => {
  return (
    <div className="event">
      <p>{event.happening}</p>
      <p>{event.time}</p>
      <p>{event.place}</p>
    </div>
  )
}

export default Event
