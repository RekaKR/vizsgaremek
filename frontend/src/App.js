import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { ProfileContext } from './ProfileContext'
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
  const [profile, setProfile] = useState(null)
  const [resPostAcc, setResPostAcc] = useState(0)
  const [resDeleteAcc, setResDeleteAcc] = useState(0)
  const [resPostTime, setResPostTime] = useState(0)
  const [resDeleteTime, setResDeleteTime] = useState(0)
  const [resUpdateIsComing, setResUpdateIsComing] = useState(0)
  const [resUpdatePlusOneData, setResUpdatePlusOneData] = useState(0)
  const [resUpdateUser, setResUpdateUser] = useState(0)

  const { data: accommodations } = useFetchGet(true, 'http://localhost:3001/api/accommodation', [resPostAcc, resDeleteAcc])
  const { data: events } = useFetchGet(true, 'http://localhost:3001/api/timeline', [resPostTime, resDeleteTime])
  const { data } = useFetchGet(localStorage.getItem('token'), 'http://localhost:3001/api/user', [resUpdateIsComing, resUpdatePlusOneData, resUpdateUser, localStorage.getItem('token')])

  const checkToken = () => {
    const token = localStorage.getItem('token')
    if (token) setUser(jwt_decode(token))
  }

  useEffect(() => {
    checkToken()
  }, [])

  useEffect(() => {
    setProfile(data)
  }, [data])

  return (
    <ProfileContext.Provider value={{ profile, events, accommodations, setResUpdateUser, setResUpdatePlusOneData, setResUpdateIsComing, setResPostAcc, setResDeleteAcc, setResPostTime, setResDeleteTime }}>
      <Router>
        <div className="app">
          <Route path='/' >
            <Header user={user} setUser={setUser} />
          </Route>

          <Switch>
            <Route path='/login'>
              <Login checkToken={checkToken} />
            </Route>

            <Route path='/profile'>
              <Profile />
            </Route>

            <Route path='/timeline'>
              <Timeline />
            </Route>

            <Route path='/accommodation'>
              <Accommodations />
            </Route>

            <Route path='/galery'>
              <Galery />
            </Route>

            <Route path='/admin'>
              <Admin />
            </Route>

            <Route path='/'>
              <Invitation />
            </Route>
          </Switch>
        </div>
      </Router >
    </ProfileContext.Provider>
  )
}

export default App
