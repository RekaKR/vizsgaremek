import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './style/css/style.css'

import Header from './components/Header/Header'
import Invitation from "./components/Invitation/Invitation"
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import Timeline from './components/timelineCollection/Timeline/Timeline'
import Accommodations from "./components/accommodationCollection/Accommodations/Accommodations"
import Galery from "./components/Feature/Galery/Galery"
import Admin from "./components/adminCollection/Admin/Admin"

const App = () => {
  const [accommodations, setAccommodations] = useState(null)
  const [events, setEvents] = useState(null)
  const [user, setUser] = useState('')

  const [resPostAcc, setResPostAcc] = useState(0)
  const [resDeleteAcc, setResDeleteAcc] = useState(0)

  const [resPostTime, setResPostTime] = useState(0)
  const [resDeleteTime, setResDeleteTime] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3001/accommodation')
      .then(res => res.json())
      .then(data => setAccommodations(data))
      .catch(err => setAccommodations(null))
  }, [resPostAcc, resDeleteAcc])

  useEffect(() => {
    fetch('http://localhost:3001/timeline')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => setEvents(null))
  }, [resPostTime, resDeleteTime])

  const checkToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser(jwt_decode(token))
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  const googleSignIn = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=select_account&client_id=716515278040-8devcsi8fm1uh0mledpu00oknp3i3kpv.apps.googleusercontent.com&scope=openid%20profile email&redirect_uri=http://localhost:3000/login"
  }


  //HISTORY-VAL NEM MEGY. OK?
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = "http://localhost:3000/"
    setUser("")
  }

  return (
    <Router>
      <div className='app'>
        <Route path='/' >
          <Header googleSignIn={googleSignIn} user={user} logout={logout} />
        </Route>

        <Switch>
          <Route path='/invitation'>
            <Invitation />
          </Route>

          <Route path='/login'>
            <Login checkToken={checkToken} />
          </Route>

          <Route path='/profile'>
            <Profile user={user} />
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

          <Route path='/admin'>
            <Admin events={events} accommodations={accommodations} resPostAcc={resPostAcc} setResPostAcc={setResPostAcc} resDeleteAcc={resDeleteAcc} setResDeleteAcc={setResDeleteAcc} resPostTime={resPostTime} setResPostTime={setResPostTime} resDeleteTime={resDeleteTime} setResDeleteTime={setResDeleteTime} />
          </Route>

          <Route path='/'>
            <Invitation />
          </Route>
        </Switch>
      </div>
    </Router >
  )
}

export default App
