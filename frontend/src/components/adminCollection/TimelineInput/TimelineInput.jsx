import React, { useState } from 'react'

function AdminAccommodation() {
  const [time, setTime] = useState('')
  const [happening, setHappening] = useState('')
  const [place, setPlace] = useState('')
  const [res, setRes] = useState(false)

  const submit = () => {
    fetch('http://localhost:3001/timeline', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        time: time,
        happening: happening,
        place: place
      })
    }).then(res => res.json())
      .then(res => setRes(true))
      .catch(err => setRes(false))
  }

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

      <button disabled={!(time && happening && place)} onClick={() => submit()}>Submit</button>
    </div>
  );
}

export default AdminAccommodation