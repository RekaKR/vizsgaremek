import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import useFetchGet from "./customHooks/useFetchGet"
import './style/css/style.css'

import Header from './components/Header/Header'
import Invitation from "./components/Invitation/Invitation"
import Login from "./components/Login/Login"
import Profile from "./components/profileCollection/Profile/Profile"
import Timeline from './components/timelineCollection/Timeline'
import Accommodations from "./components/accommodationCollection/Accommodations"
import Galery from "./components/Feature/Galery/Galery"
import Admin from "./components/adminCollection/Admin/Admin"

const App = () => {
  const [user, setUser] = useState('')
  const [resPostAcc, setResPostAcc] = useState(0)
  const [resDeleteAcc, setResDeleteAcc] = useState(0)
  const [resPostTime, setResPostTime] = useState(0)
  const [resDeleteTime, setResDeleteTime] = useState(0)

  const { data: accommodations } = useFetchGet(true, 'http://localhost:3001/api/accommodation', [resPostAcc, resDeleteAcc])
  const { data: events } = useFetchGet(true, 'http://localhost:3001/api/timeline', [resPostTime, resDeleteTime])

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

  return (
    <Router>
      <div className="app">
        <Route path='/' >
          <Header googleSignIn={googleSignIn} user={user} setUser={setUser} />
        </Route>

        <Switch>
          <Route path='/login'>
            <Login checkToken={checkToken} />
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

          <Route path='/admin'>
            <Admin events={events} accommodations={accommodations} setResPostAcc={setResPostAcc} resDeleteAcc={resDeleteAcc} setResDeleteAcc={setResDeleteAcc} resPostTime={resPostTime} setResPostTime={setResPostTime} resDeleteTime={resDeleteTime} setResDeleteTime={setResDeleteTime} />
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
