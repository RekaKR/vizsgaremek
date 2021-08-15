import React, { useState, useEffect, useContext } from 'react'
import { ProfileContext } from '../../../ProfileContext'
import useFetchPost from '../../../customHooks/useFetchPost'

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
      <h4>Új programpont hozzáadása</h4>
      <p>Add meg az új programpont adatait!</p>

      <div>
        <input type="text" onChange={e => setTime(e.target.value)} placeholder="Időpont" />
      </div>

      <div>
        <input type="text" onChange={e => setHappening(e.target.value)} placeholder="Esemény" />
      </div>

      <div>
        <input type="text" onChange={e => setPlace(e.target.value)} placeholder="Helyszín" />
      </div>

      <button disabled={!(time && happening && place)} onClick={() => setSubmit(!submit)}>Submit</button>
    </div>
  )
}

export default TimelineInput