import React, { useState, useEffect, useContext } from 'react'
import { ProfileContext } from '../../../ProfileContext'
import useFetchPost from '../../../customHooks/useFetchPost'

import Inp from '../../elementsCollection/Inp/Inp'
import NumInp from '../../elementsCollection/NumInp/NumInp'

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
      <h3>Új szállás lehetőség hozzáadása</h3>
      <p>Add meg az új szállás adatait!</p>

      <div>
        <Inp classN="timeline-i" label="Név" value={name} setValue={setName} />
        <NumInp classN="timeline-i" label="Irányítószám" value={zip} setValue={setZip} />
        <Inp classN="timeline-i" label="Város" value={city} setValue={setCity} />
        <Inp classN="timeline-i" label="Utca" value={street} setValue={setStreet} />
        <NumInp classN="timeline-i" label="Házszám" value={houseNumber} setValue={setHouseNumber} />
        <Inp classN="timeline-i" label="Telefonszám" value={phoneNumber} setValue={setPhoneNumber} />
        <Inp classN="timeline-i" label="Weboldal" value={website} setValue={setWebsite} />
      </div>

      <button className="send-button" disabled={!(name && zip && city && street && houseNumber && phoneNumber && website)} onClick={() => setSubmit(!submit)}>Küldés</button>
    </div >
  )
}

export default AccommodationInput