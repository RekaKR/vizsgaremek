import React from 'react'
import { v4 as uuidv4 } from 'uuid'
//Menetrend/Programok, Szállás, Ülésrend, vendég lista/felhasználó hozzáadása - szerkesztés
import AdminAccommodation from '../AdminAccommodation/AdminAccommodation'

const Admin = ({ accommodations }) => {
  return (
    <div className="admin">
      <h2>Adatok feltöltése</h2>

      <h3>Vendég lista</h3>
      <h4>Vendég lista (részletezve)</h4>
      <h4>Vendég hozzáadása (profil létrehozása)</h4>

      <h3>Szállás</h3>
      <h4>Szállás lista</h4>
      {accommodations && accommodations.map(accommodation =>
        <div key={uuidv4()}>
          <p>{accommodation.name}</p>
          <p>Szállás szerkesztése</p>
        </div>
      )}
      <h4>Új szállás lehetőség hozzáadása</h4>
      <AdminAccommodation />

      <h3>Menetrend</h3>
      <h4>Menetrend lista</h4>
      <h4>Menetrend szerkesztése</h4>

      <h3>Ülésrend</h3>
      <h4>Ülésrend</h4>
      <h4>Ülésrend szerkesztése</h4>
      <button>Közzététel</button>
    </div >
  )
}

export default Admin
