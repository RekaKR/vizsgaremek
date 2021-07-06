import React from 'react'

const Accommodation = ({ accommodation }) => {

  return (
    <div className="accommodation">
      <h3>{accommodation.name}</h3>

      <div className="address">
        <p>{accommodation.address.zip}</p>
        <p>{accommodation.address.city}</p>
        <p>{accommodation.address.street}</p>
        <p>{accommodation.address.houseNumber}</p>
      </div>

      <h4>Elérhetőség</h4>
      <p>Telefonszám: {accommodation.phoneNumber}</p>
      <div>Weboldal: <a href={accommodation.website}>{accommodation.website}</a></div>
    </div>
  )
}

export default Accommodation