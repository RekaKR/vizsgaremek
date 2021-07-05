import React, { useState } from 'react'
//import '../../style/css/style.css'

const Header = () => {
  const [couple, setCouple] = useState(true)
  const [weddingP, setWeddingP] = useState(false)
  const [photographer, setPhotographer] = useState(false)
  const [guest, setGuest] = useState(false)

  return (
    <div className="header">
      <a href="/">Invitation</a>

      {(!couple && !weddingP && !photographer && !guest) && <a href="/login">LogInOut</a>}

      {
        (couple || weddingP || guest) &&
        <>
          <a href="/profile">Profile</a>
          <a href="/timeline">Timeline</a>
          <a href="/accommodation">Accommodation</a>
        </>
      }

      {(couple || weddingP || photographer || guest) && <a href="/galery">Galery</a>}

      {
        (couple || weddingP) &&
        <>
          <a href="/to-do-list">ToDoList</a>
          <a href="/admin">Admin</a>
        </>
      }
    </div>
  )
}

export default Header

