import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import AdminHeader from '../AdminHeader/AdminHeader'
import GuestListAdmin from '../GuestListAdmin/GuestListAdmin'
import TimelineAdmin from '../TimelineAdmin/TimelineAdmin'
import AccommodationAdmin from '../AccommodationAdmin/AccommodationAdmin'
import ToDoAdmin from '../toDoCollection/ToDoAdmin/ToDoAdmin'
import SeatsAdmin from '../SeatsAdmin/SeatsAdmin'

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
            <GuestListAdmin />
          </Route>

          <Route path={`${path}/timeline`}>
            <TimelineAdmin events={events} />
          </Route>

          <Route path={`${path}/accommodations`}>
            <AccommodationAdmin accommodations={accommodations} />
          </Route>

          <Route path={`${path}/to-do-list`}>
            <ToDoAdmin />
          </Route>

          <Route path={`${path}/seats`}>
            <SeatsAdmin />
          </Route>
        </Switch>
      </div>
    </Router >
  )
}

export default Admin
