import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//import '../../style/css/style.css'

const Header = ({ googleSignIn, user, logout }) => {
  const [couple, setCouple] = useState(true)
  const [weddingP, setWeddingP] = useState(false)
  const [photographer, setPhotographer] = useState(false)
  const [guest, setGuest] = useState(false)

  return (
    <div className="header">
      <Link to="/">
        Meghívó
      </Link>

      {
        (!couple && !weddingP && !photographer && !guest) &&
        <Link to="/login">
          LogInOut
        </Link>
      }

      {
        (couple || weddingP || guest) &&
        <>
          <Link to="/profile">
            Profil
          </Link>

          <Link to="/timeline">
            Menetrend
          </Link>

          <Link to="/accommodation">
            Szállás
          </Link>
        </>
      }

      {
        (couple || weddingP || photographer || guest) &&
        <Link to="/galery">
          Galéria
        </Link>
      }

      {
        (couple || weddingP) &&
        <Link to="/admin">
          Admin
        </Link>
      }

      {/*
        (couple || weddingP || photographer || guest)

          ? <button onClick={() => logout()}>Logout</button>
          : <button onClick={() => googleSignIn()}>Login</button>
        */}

      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => googleSignIn()}>Login</button>

    </div>
  )
}

export default Header