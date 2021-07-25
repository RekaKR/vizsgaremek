import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Event from '../../timelineCollection/Event/Event'
import TimelineInput from '../TimelineInput/TimelineInput'

function TimelineAdmin({ events, resPostTime, setResPostTime, resDeleteTime, setResDeleteTime }) {
  const [deleteById, setDeleteById] = useState('')
  const [changeDelete, setChangeDelete] = useState(false)

  const deleteRecord = (event) => {
    setDeleteById(events.filter(item => item.key === event.key) && event._id)
    setChangeDelete(!changeDelete)
  }

  useEffect(() => {
    if (deleteById) {
      fetch(`http://localhost:3001/timeline/${deleteById}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('token')
        }
      }).then(res => res.json())
        .then(res => setResDeleteTime(resDeleteTime + 1))
        .catch(err => setResDeleteTime(false))
      //.finally(() => resetRes())
    }
  }, [changeDelete])

  return (
    <div className="admin-timeline">
      <h3>Menetrend</h3>

      <h4>Menetrend lista</h4>
      {
        events && events.map(event =>
          <div key={uuidv4()}>
            <Event event={event} />
            <button onClick={() => deleteRecord(event)}>Esemény törlése</button>
          </div>)
      }

      <TimelineInput resPostTime={resPostTime} setResPostTime={setResPostTime} />
    </div>
  );
}

export default TimelineAdmin