import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AdminAccommodation from '../AdminAccommodation/AdminAccommodation'
import Event from '../../Event/Event'
import AdminTimeline from '../AdminTimeline/AdminTimeline'

//Menetrend/Programok, Szállás, Ülésrend, vendég lista/felhasználó hozzáadása - szerkesztés
const Admin = ({ accommodations, events }) => {
  const [isShowAccommodations, setIsShowAccommodations] = useState(false)
  const [isShowTimeline, setIsShowTimeline] = useState(false)

  return (
    <div className="admin">
      <h2>Admin felület</h2>

      <h3>Vendég lista</h3>
      <h4>Vendég lista (részletezve)</h4>
      <h4>Vendég hozzáadása (profil létrehozása)</h4>

      <h3>Szállás</h3>
      <button onClick={() => setIsShowAccommodations(!isShowAccommodations)}>Mutasd</button>
      {
        isShowAccommodations && <>
          <h4>Szállás lista</h4>
          {
            accommodations && accommodations.map(accommodation =>
              <div key={uuidv4()}>
                <p>{accommodation.name}</p>
                <p>Szállás szerkesztése</p>
              </div>)
          }
          <h4>Új szállás lehetőség hozzáadása</h4>
          <AdminAccommodation />
        </>
      }

      <h3>Menetrend</h3>
      <button onClick={() => setIsShowTimeline(!isShowTimeline)}>Mutasd</button>
      {
        isShowTimeline && <>
          <h4>Menetrend lista</h4>
          {
            events && events.map(event =>
              <div key={uuidv4()}>
                <Event event={event} />
                <p>Menetrend szerkesztése</p>
              </div>)
          }
          <AdminTimeline />
        </>
      }

      <h3>Ülésrend</h3>
      <h4>Ülésrend</h4>
      <h4>Ülésrend szerkesztése</h4>
      <button>Közzététel</button>
    </div >
  )
}

export default Admin
