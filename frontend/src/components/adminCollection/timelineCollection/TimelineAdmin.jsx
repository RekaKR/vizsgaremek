import React, { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ProfileContext } from '../../../ProfileContext'
import useFetchDelete from '../../../customHooks/useFetchDelete'

import '../../../style/css/timeline.css'

import Event from '../../timelineCollection/Event'
import TimelineInput from './TimelineInput'
import DeleteButton from '../../elementsCollection/DeleteButton/DeleteButton'

const TimelineAdmin = () => {
  const { events, setResDeleteTime } = useContext(ProfileContext)

  const [deleteById, setDeleteById] = useState('')
  const [changeDelete, setChangeDelete] = useState(false)

  const { data } = useFetchDelete(deleteById, `http://localhost:3001/api/timeline/${deleteById}`, [changeDelete])

  useEffect(() => {
    setResDeleteTime(data)
  }, [data])

  const deleteRecord = (event) => {
    setDeleteById(events.filter(item => item.key === event.key) && event._id)
    setChangeDelete(!changeDelete)
  }

  return (
    <div className="admin-timeline">
      <h3>Menetrend</h3>

      <div className="timeline-container">
        <div className="timeline">
          <h4>Menetrend lista</h4>

          {
            events && events.map(event =>
              <div className="timeline-names" key={uuidv4()}>
                <Event event={event} />
                <DeleteButton deleteRecord={deleteRecord} element={event} />
              </div>)
          }
        </div>

        <TimelineInput />
      </div>
    </div>
  )
}

export default TimelineAdmin