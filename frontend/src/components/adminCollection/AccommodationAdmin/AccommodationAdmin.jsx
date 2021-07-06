import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import AccommodationInput from '../AccommodationInput/AccommodationInput'

function AdminAccommodation({ accommodations }) {
  return (
    <div className="admin-accommodation">
      <h3>Szállás</h3>

      <h4>Szállás lista</h4>
      {
        accommodations && accommodations.map(accommodation =>
          <div key={uuidv4()}>
            <p>{accommodation.name}</p>
            <h4>Szállás szerkesztése</h4>
          </div>)
      }
      <h4>Új szállás lehetőség hozzáadása</h4>
      <AccommodationInput />
    </div>
  );
}

export default AdminAccommodation