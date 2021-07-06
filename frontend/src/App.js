import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './style/css/style.css'

import Header from './components/Header/Header'
import Invitation from "./components/Invitation/Invitation"
import LogInOut from "./components/LogInOut/LogInOut"
import Profile from "./components/Profile/Profile"
import Timeline from './components/Timeline/Timeline'
import Accommodations from "./components/Accommodations/Accommodations"
import Galery from "./components/Feature/Galery/Galery"
import ToDoList from "./components/Feature/ToDoList/ToDoList"
import Admin from "./components/adminCollection/Admin/Admin"

import Api from "./components/Api/Api"

const App = () => {
  const [accommodations, setAccommodations] = useState(null)
  const [events, setEvents] = useState(null)

  useEffect( /*async*/() => {
    fetch('http://localhost:3001/accommodation')
      .then(response => response.json())
      .then(data => setAccommodations(data))
      .catch(error => setAccommodations(null))

    fetch('http://localhost:3001/timeline')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => setEvents(null))

    /*
    const response = await fetch('http://localhost:3001/accommodation')
    const data = await response.json()
    setAccommodations(data)
    */
  }, [])

  return (
    <Router>
      <div className='app'>
        <Route path='/' >
          <Header />
        </Route>

        <Switch>
          <Route path='/api'>
            <Api />
          </Route>


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
            <ToDoList />
          </Route>

          <Route path='/admin'>
            <Admin events={events} accommodations={accommodations} />
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
