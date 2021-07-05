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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        time: time,
        happening: happening,
        place: place
      })
    }).then(res => res.json())
      .then(res => {
        setRes(true)
        console.log(res)
      })
      .catch(err => setRes(false))
  }

  return (
    <div className="admin-timeline">
      <div>
        <p>time</p>
        <input type="text" onChange={e => setTime(e.target.value)} />
      </div>

      <div>
        <p>happening</p>
        <input type="text" onChange={e => setHappening(e.target.value)} />
      </div>

      <div>
        <p>place</p>
        <input type="text" onChange={e => setPlace(e.target.value)} />
      </div>

      <button disabled={!(time && happening && place)} onClick={() => submit()}>Submit</button>
    </div>
  );
}

export default AdminAccommodation