import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AccommodationAdmin from '../AccommodationAdmin/AccommodationAdmin'
import Event from '../../Event/Event'
import TimelineAdmin from '../TimelineAdmin/TimelineAdmin'

//Menetrend, Szállás, Ülésrend, Vendég lista/felhasználó hozzáadása - szerkesztés
const Admin = ({ accommodations, events }) => {
  const [isShowGuest, setIsShowGuest] = useState(false)
  const [isShowAccommodations, setIsShowAccommodations] = useState(false)
  const [isShowTimeline, setIsShowTimeline] = useState(false)
  const [isShowSeatingSrrangements, setIsShowSeatingSrrangements] = useState(false)

  return (
    <div className="admin">
      <h2>Admin felület</h2>

      <h3>Vendég lista</h3>
      <button onClick={() => setIsShowGuest(!isShowGuest)}>
        {isShowGuest ? "Ne mutasd" : "Mutasd"}
      </button>
      {
        isShowGuest && <>
          <h4>Vendég lista (részletezve)</h4>
          <h4>Vendég hozzáadása (profil létrehozása)</h4>
        </>
      }

      <h3>Szállás</h3>
      <button onClick={() => setIsShowAccommodations(!isShowAccommodations)}>
        {isShowAccommodations ? "Ne mutasd" : "Mutasd"}
      </button>
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
          <AccommodationAdmin />
        </>
      }

      <h3>Menetrend</h3>
      <button onClick={() => setIsShowTimeline(!isShowTimeline)}>
        {isShowTimeline ? "Ne mutasd" : "Mutasd"}
      </button>
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
          <TimelineAdmin />
        </>
      }

      <h3>Ülésrend</h3>
      <button onClick={() => setIsShowSeatingSrrangements(!isShowSeatingSrrangements)}>
        {isShowSeatingSrrangements ? "Ne mutasd" : "Mutasd"}
      </button>
      {
        isShowSeatingSrrangements && <>
          <h4>Ülésrend</h4>
          <h4>Ülésrend szerkesztése</h4>
          <button>Közzététel</button>
        </>
      }
    </div >
  )
}

export default Admin
