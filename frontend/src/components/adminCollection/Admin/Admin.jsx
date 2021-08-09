import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'

import AdminHeader from '../AdminHeader/AdminHeader'
import GuestListAdmin from '../guestListCollection/GuestListAdmin'
import TimelineAdmin from '../timelineCollection/TimelineAdmin'
import AccommodationAdmin from '../accommodationCollection/AccommodationAdmin'
import ToDoAdmin from '../toDoCollection/ToDoAdmin'
import SeatsAdmin from '../seatsCollection/SeatsAdmin'

const Admin = (props) => {
  const { url, path } = useRouteMatch()
  const { accommodations, events, setResDeleteAcc, setResPostAcc, resPostTime, setResPostTime, setResDeleteTime } = props

  return (
    <Router>
      <div className='admin'>
        <Route path='/' >
          <AdminHeader url={url} />
        </Route>

        <Switch>
          <Route path={path} exact>
            <h2>Admin felület</h2>
          </Route>

          <Route path={`${path}/guest-list`}>
            <GuestListAdmin />
          </Route>

          <Route path={`${path}/timeline`}>
            <TimelineAdmin events={events} resPostTime={resPostTime} setResPostTime={setResPostTime} setResDeleteTime={setResDeleteTime} />
          </Route>

          <Route path={`${path}/accommodations`}>
            <AccommodationAdmin accommodations={accommodations} setResPostAcc={setResPostAcc} setResDeleteAcc={setResDeleteAcc} />
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
