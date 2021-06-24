import React, { useState, useEffect } from "react"
import Invitation from "./components/Invitation/Invitation"
import Profile from "./components/Profile/Profile"
import Timeline from "./components/Timeline/Timeline"
import Accommodation from "./components/Accommodation/Accommodation"
import Pictures from "./components/Feature/Pictures/Pictures"
import ToDoList from "./components/Feature/ToDoList/ToDoList"
import Admin from "./components/Admin/Admin"

const App = () => {
  const [couple, setCouple] = useState(true)
  const [weddingP, setWeddingP] = useState(false)
  const [photographer, setPhotographer] = useState(false)
  const [guest, setGuest] = useState(false)

  /*const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setData(data.message))
  }, [])*/

  return (
    <div className="app">
      {/*<p>{!data ? "Loading..." : data}</p>*/}

      <Invitation />

      {
        (couple || weddingP || guest) &&
        <>
          <Profile />
          <Timeline />
          <Accommodation />
        </>
      }

      {(couple || weddingP || photographer || guest) && <Pictures />}

      {
        (couple || weddingP) &&
        <>
          <ToDoList />
          <Admin />
        </>
      }
    </div>
  );
}

export default App
