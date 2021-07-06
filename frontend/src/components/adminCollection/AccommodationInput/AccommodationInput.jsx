import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function AccommodationInput() {
  const [name, setName] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [website, setWebsite] = useState('')
  const [res, setRes] = useState(false)

  const inputs = [
    {
      set: setName,
      type: 'text',
      placeholder: "Név"
    },
    {
      set: setZip,
      type: 'number',
      placeholder: "Irányítószám"
    },
    {
      set: setCity,
      type: 'text',
      placeholder: "Város"
    },
    {
      set: setStreet,
      type: 'text',
      placeholder: "Utca"
    },
    {
      set: setHouseNumber,
      type: 'number',
      placeholder: "Házszám"
    },
    {
      set: setPhoneNumber,
      type: 'text',
      placeholder: "Telefonszám"
    },
    {
      set: setWebsite,
      type: 'text',
      placeholder: "Weboldal"
    }
  ]

  const submit = () => {
    fetch('http://localhost:3001/accommodation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        zip: zip,
        city: city,
        street: street,
        houseNumber: houseNumber,
        phoneNumber: phoneNumber,
        website: website
      })
    }).then(res => res.json())
      .then(data => {
        setRes(true)
        console.log(data)
      })
      .catch(err => setRes(false))
  }

  return (
    <div className="accommodation-input">
      <h4>Új szállás lehetőség hozzáadása</h4>
      <p>Add meg az új szállás adatait!</p>

      {inputs.map(input =>
        <div key={uuidv4()}>
          <input type={input.type} onChange={e => input.set(e.target.value)} placeholder={input.placeholder} />
        </div>)
      }

      <button disabled={!(name && zip && city && street && houseNumber && phoneNumber && website)} onClick={() => submit()}>Submit</button>
    </div>
  );
}

export default AccommodationInput

/*<div className="accommodation-input">
      <div>
        <p>name</p>
        <input type="text" onChange={e => setName(e.target.value)} />
      </div>

      <div>
        <p>zip</p>
        <input type="number" onChange={e => setZip(e.target.value)} />
      </div>

      <div>
        <p>city</p>
        <input type="text" onChange={e => setCity(e.target.value)} />
      </div>

      <div>
        <p>street</p>
        <input type="text" onChange={e => setStreet(e.target.value)} />
      </div>

      <div>
        <p>houseNumber</p>
        <input type="number" onChange={e => setHouseNumber(e.target.value)} />
      </div>

      <div>
        <p>phoneNumber</p>
        <input type="text" onChange={e => setPhoneNumber(e.target.value)} />
      </div>

      <div>
        <p>website</p>
        <input type="text" onChange={e => setWebsite(e.target.value)} />
      </div>

      <button disabled={!(name && zip && city && street && houseNumber && phoneNumber && website)} onClick={() => submit()}>Submit</button>
    </div>
  */