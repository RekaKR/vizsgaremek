import React, { useState, useEffect, useContext } from 'react'
import { ProfileContext } from '../../../ProfileContext'
import useFetchPost from '../../../customHooks/useFetchPost'

import Inp from '../../elementsCollection/Inp/Inp'
import MultiLineInp from '../../elementsCollection/MultiLineInp/MultiLineInp'

function TimelineInput() {
  const { setResPostTime } = useContext(ProfileContext)

  const [time, setTime] = useState('')
  const [happening, setHappening] = useState('')
  const [place, setPlace] = useState('')
  const [submit, setSubmit] = useState(true)

  const postBody = {
    time: time,
    happening: happening,
    place: place
  }

  const { data } = useFetchPost((time && happening && place), 'http://localhost:3001/api/timeline', postBody, [submit])

  useEffect(() => {
    setResPostTime(data)
  }, [data])

  return (
    <div className="timeline-input">
      <h3>Új programpont hozzáadása</h3>
      <p>Add meg az új programpont adatait!</p>

      <div>
        <Inp classN="timeline-i" label="Időpont" value={time} setValue={setTime} />
        <MultiLineInp classN="timeline-i" label="Esemény" value={happening} setValue={setHappening} />
        <Inp classN="timeline-i" label="Helyszín" value={place} setValue={setPlace} />
      </div>

      <button className="send-button" disabled={!(time && happening && place)} onClick={() => setSubmit(!submit)}>Küldés</button>
    </div>
  )
}

export default TimelineInput