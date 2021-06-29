import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './style/css/style.css'

import Header from './components/Header/Header'
import Invitation from "./components/Invitation/Invitation"
import LogInOut from "./components/LogInOut/LogInOut"
import Profile from "./components/Profile/Profile"
import Timeline from './components/Timeline/Timeline'
import Accommodation from "./components/Accommodation/Accommodation"
import Galery from "./components/Feature/Galery/Galery"
import ToDoList from "./components/Feature/ToDoList/ToDoList"
import Admin from "./components/Admin/Admin"

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Header />

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
            <Timeline />
          </Route>

          <Route path='/accommodation'>
            <Accommodation />
          </Route>

          <Route path='/galery'>
            <Galery />
          </Route>

          <Route path='/to-do-list'>
            <ToDoList />
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
  );
}

export default App
