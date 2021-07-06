import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function AdminAccommodation() {
  const [time, setTime] = useState('')
  const [happening, setHappening] = useState('')
  const [place, setPlace] = useState('')
  const [res, setRes] = useState(false)

  const inputs = [
    {
      set: setTime,
      type: 'text',
      placeholder: "Időpont"
    },
    {
      set: setHappening,
      type: 'text',
      placeholder: "Esemény"
    },
    {
      set: setPlace,
      type: 'text',
      placeholder: "Helyszín"
    },
  ]

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
    <div className="timeline-input">
      <h4>Új programpont hozzáadása</h4>
      <p>Add meg az új programpont adatait!</p>

      {inputs.map(input =>
        <div key={uuidv4()}>
          <input type={input.type} onChange={e => input.set(e.target.value)} placeholder={input.placeholder} />
        </div>)
      }

      <button disabled={!(time && happening && place)} onClick={() => submit()}>Submit</button>
    </div>
  );
}

export default AdminAccommodation

/*
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
*/