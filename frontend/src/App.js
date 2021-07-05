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

//import Api from "./components/Api/Api"
//import AdminAccommodation from "./components/AdminAccommodation/AdminAccommodation"

const App = () => {
  const [accommodations, setAccommodations] = useState(null)
  const [timeline, setTimeline] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/admin-accommodation')
      .then(response => response.json())
      .then(data => setAccommodations(data))
      .catch(error => setAccommodations(null))

    fetch('http://localhost:3001/timeline')
      .then(response => response.json())
      .then(data => setTimeline(data))
      .catch(error => setTimeline(null))
  }, [])

  return (
    <Router>
      <div className='app'>

        <Route path='/' >
          <Header />
        </Route>

        <Switch>
          {/*
          <Route path='/api'>
            <Api />
          </Route>

          <Route path='/admin-accommodation'>
            <AdminAccommodation />
          </Route>
          */}

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
            <Timeline timeline={timeline} />
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
            <Admin accommodations={accommodations} />
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
