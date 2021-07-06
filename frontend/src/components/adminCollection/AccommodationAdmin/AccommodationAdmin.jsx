import React, { useState } from 'react'

function AdminAccommodation() {
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
      .then(res => {
        setRes(true)
        console.log(res)
      })
      .catch(err => setRes(false))
  }

  return (
    <div className="admin-accommodation">
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
  );
}

export default AdminAccommodation