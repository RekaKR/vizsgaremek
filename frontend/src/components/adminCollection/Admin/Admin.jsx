import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import AccommodationAdmin from '../AccommodationAdmin/AccommodationAdmin'
import TimelineAdmin from '../TimelineAdmin/TimelineAdmin'
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

          <Route path={`${path}/timeline`}>
            <TimelineAdmin events={events} />
          </Route>

          <Route path={`${path}/accommodations`}>
            <AccommodationAdmin accommodations={accommodations} />
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
