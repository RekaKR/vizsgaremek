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

  const submit = () => {
    fetch('http://localhost:3001/accommodation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
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

      <div>
        <input type="text" onChange={e => setName(e.target.value)} placeholder="Név" />
      </div>

      <div>
        <input type="number" onChange={e => setZip(e.target.value)} placeholder="Irányítószám" />
      </div>

      <div>
        <input type="text" onChange={e => setCity(e.target.value)} placeholder="Város" />
      </div>

      <div>
        <input type="text" onChange={e => setStreet(e.target.value)} placeholder="Utca" />
      </div>

      <div>
        <input type="number" onChange={e => setHouseNumber(e.target.value)} placeholder="Házszám" />
      </div>

      <div>
        <input type="text" onChange={e => setPhoneNumber(e.target.value)} placeholder="Telefonszám" />
      </div>

      <div>
        <input type="text" onChange={e => setWebsite(e.target.value)} placeholder="Weboldal" />
      </div>


      <button disabled={!(name && zip && city && street && houseNumber && phoneNumber && website)} onClick={() => submit()}>Submit</button>
    </div >
  )
}

export default AccommodationInput



/*

const inputs = [
    {
      var: name,
      set: setName,
      type: 'text',
      placeholder: "Név"
    },
    {
      var: zip,
      set: setZip,
      type: 'number',
      placeholder: "Irányítószám"
    },
    {
      var: city,
      set: setCity,
      type: 'text',
      placeholder: "Város"
    },
    {
      var: street,
      set: setStreet,
      type: 'text',
      placeholder: "Utca"
    },
    {
      var: houseNumber,
      set: setHouseNumber,
      type: 'number',
      placeholder: "Házszám"
    },
    {
      var: phoneNumber,
      set: setPhoneNumber,
      type: 'text',
      placeholder: "Telefonszám"
    },
    {
      var: website,
      set: setWebsite,
      type: 'text',
      placeholder: "Weboldal"
    }
  ]

inputs.map(input =>
  <div key={uuidv4()}>
    <p>{input.placeholder}</p>
    <input type={input.type} onChange={e => input.set(e.target.value)} />
  </div>)
*/