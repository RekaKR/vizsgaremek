import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './style/css/style.css'

import Header from './components/Header/Header'
import Invitation from "./components/Invitation/Invitation"
import Login from "./components/Login/Login"
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
      .then(data => setAccommodations(data))
      .catch(err => setAccommodations(null))

    fetch('http://localhost:3001/timeline')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => setEvents(null))

    fetch('http://localhost:3001/to-do-list')
      .then(res => res.json())
      .then(data => setToDos(data))
      .catch(err => setToDos(null))
  }, [])


  const googleSignIn = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=select_account&client_id=716515278040-8devcsi8fm1uh0mledpu00oknp3i3kpv.apps.googleusercontent.com&scope=openid%20profile email&&redirect_uri=http://localhost:3000/login"
  }

  return (
    <Router>
      <div className='app'>
        <Route path='/' >
          <Header googleSignIn={googleSignIn} />
        </Route>

        <Switch>
          <Route path='/invitation'>
            <Invitation />
          </Route>

          <Route path='/login'>
            <Login />
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
