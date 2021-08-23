import React from 'react'

const Accommodation = ({ accommodation }) => {
  const address = accommodation.address

  return (
    <div className="accommodation">
      <h3>{accommodation.name}</h3>

      <div className="address">
        <p>Cím: </p>
        <p>{address.zip}, </p>
        <p>{address.city} </p>
        <p>{address.street} </p>
        <p>{address.houseNumber}.</p>
      </div>

      <p>Telefonszám: {accommodation.phoneNumber}</p>

      <div className="inline-web">
        <p>Weboldal: </p>
        <a href={accommodation.website} target="_blank" rel="noreferrer">{accommodation.website}</a>
      </div>
    </div>
  )
}

export default Accommodation
