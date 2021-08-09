import React, { useState, useEffect } from 'react'
import useFetchPost from '../../../customHooks/useFetchPost'

function TimelineInput({ setResPostTime }) {
  const [time, setTime] = useState('')
  const [happening, setHappening] = useState('')
  const [place, setPlace] = useState('')
  const [submit, setSubmit] = useState(true)

  const postBody = {
    time: time,
    happening: happening,
    place: place
  }

  const { data } = useFetchPost('http://localhost:3001/api/timeline', postBody, [submit])

  useEffect(() => {
    setResPostTime(data)
  }, [submit])

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