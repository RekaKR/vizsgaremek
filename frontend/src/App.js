import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './style/css/style.css'

import Header from './components/Header/Header'
import Invitation from "./components/Invitation/Invitation"
import LogInOut from "./components/LogInOut/LogInOut"
import Profile from "./components/Profile/Profile"
import Timeline from './components/timelineCollection/Timeline/Timeline'
import Accommodations from "./components/accommodationCollection/Accommodations/Accommodations"
import Galery from "./components/Feature/Galery/Galery"
import ToDos from "./components/toDoCollection/ToDos/ToDos"
import Admin from "./components/adminCollection/Admin/Admin"

const App = () => {
  const [accommodations, setAccommodations] = useState(null)
  const [events, setEvents] = useState(null)
  const [toDos, setToDos] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/accommodation')
      .then(res => res.json())
      .then(data => setAccommodations(data.accommodation))
      .catch(err => setAccommodations(null))

    fetch('http://localhost:3001/timeline')
      .then(res => res.json())
      .then(data => setEvents(data.timelines))
      .catch(err => setEvents(null))

    fetch('http://localhost:3001/to-do-list')
      .then(res => res.json())
      .then(data => setToDos(data.toDos))
      .catch(err => setToDos(null))
  }, [])

  return (
    <Router>
      <div className='app'>
        <Route path='/' >
          <Header />
        </Route>

        <Switch>
          <Route path='/invitation'>
            <Invitation />
          </Route>

          <Route path='/login'>
            <LogInOut />
          </Route>

          <Route path='/profile'>
            <Profile />
          </Route>

          <Route path='/timeline'>
            <Timeline events={events} />
          </Route>

          <Route path='/accommodation'>
            <Accommodations accommodations={accommodations} />
          </Route>

          <Route path='/galery'>
            <Galery />
          </Route>

          <Route path='/to-do-list'>
            <ToDos toDos={toDos} />
          </Route>

          <Route path='/admin'>
            <Admin events={events} accommodations={accommodations} toDos={toDos} />
          </Route>

          <Route path='/'>
            <Invitation />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App
