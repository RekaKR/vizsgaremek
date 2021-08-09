import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'

import AdminHeader from '../AdminHeader/AdminHeader'
import GuestListAdmin from '../guestListCollection/GuestListAdmin'
import TimelineAdmin from '../timelineCollection/TimelineAdmin'
import AccommodationAdmin from '../accommodationCollection/AccommodationAdmin'
import ToDoAdmin from '../toDoCollection/ToDoAdmin'
import SeatsAdmin from '../seatsCollection/SeatsAdmin'
import AdminPage from '../AdminPage/AdminPage'

const Admin = () => {
  const { url, path } = useRouteMatch()

  return (
    <Router>
      <div className='admin'>
        <Route path='/' >
          <AdminHeader url={url} />
        </Route>

        <Switch>
          <Route path={`${path}/guest-list`}>
            <GuestListAdmin />
          </Route>

          <Route path={`${path}/timeline`}>
            <TimelineAdmin />
          </Route>

          <Route path={`${path}/accommodations`}>
            <AccommodationAdmin />
          </Route>

          <Route path={`${path}/to-do-list`}>
            <ToDoAdmin />
          </Route>

          <Route path={`${path}/seats`}>
            <SeatsAdmin />
          </Route>

          <Route path={path}>
            <AdminPage />
          </Route>
        </Switch>
      </div>
    </Router >
  )
}

export default Admin
