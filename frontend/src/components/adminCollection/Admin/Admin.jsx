import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import AccommodationAdmin from '../AccommodationAdmin/AccommodationAdmin'
import Event from '../../Event/Event'
import TimelineAdmin from '../TimelineAdmin/TimelineAdmin'
import Header from '../../Header/Header'
import AdminHeader from '../AdminHeader/AdminHeader'

//Menetrend, Szállás, Ülésrend, Vendég lista/felhasználó hozzáadása - szerkesztés
const Admin = ({ accommodations, events }) => {
  const { url, path } = useRouteMatch()

  return (
    <Router>
      <div className='admin'>
        <Route path='/' >
          <AdminHeader url={url} />
        </Route>

        <Switch>
          <Route path={`${path}`} exact>
            <h2>Admin felület</h2>
          </Route>

          <Route path={`${path}/guest-list`}>
            <h3>Vendég lista</h3>

            <h4>Vendég lista (részletezve)</h4>
            <h4>Vendég hozzáadása (profil létrehozása)</h4>
          </Route>

          <Route path={`${path}/accommodations`}>
            <h3>Szállás</h3>

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
          </Route>

          <Route path={`${path}/timeline`}>
            <h3>Menetrend</h3>
            <h4>Menetrend lista</h4>
            {
              events && events.map(event =>
                <div key={uuidv4()}>
                  <Event event={event} />
                  <p>Menetrend szerkesztése</p>
                </div>)
            }
            <TimelineAdmin />
          </Route>

          <Route path={`${path}/seats`}>
            <h3>Ülésrend</h3>
            <h4>Ülésrend</h4>
            <h4>Ülésrend szerkesztése</h4>
            <button>Közzététel</button>
          </Route>
        </Switch>
      </div>
    </Router >
  )
}

export default Admin
