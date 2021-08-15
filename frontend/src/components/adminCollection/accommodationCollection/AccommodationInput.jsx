import React, { useState, useEffect, useContext } from 'react'
import { ProfileContext } from '../../../ProfileContext'
import useFetchPost from '../../../customHooks/useFetchPost'

function AccommodationInput() {
  const { setResPostAcc } = useContext(ProfileContext)

  const [name, setName] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [website, setWebsite] = useState('')
  const [submit, setSubmit] = useState(true)

  const postBody = {
    name: name,
    zip: zip,
    city: city,
    street: street,
    houseNumber: houseNumber,
    phoneNumber: phoneNumber,
    website: website
  }

  const { data } = useFetchPost((name && zip && city && street && houseNumber && phoneNumber && website), 'http://localhost:3001/api/accommodation', postBody, [submit])

  useEffect(() => {
    setResPostAcc(data)
  }, [data])

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


      <button disabled={!(name && zip && city && street && houseNumber && phoneNumber && website)} onClick={() => setSubmit(!submit)}>Submit</button>
    </div >
  )
}

export default AccommodationInput