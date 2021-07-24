import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//import '../../style/css/style.css'

const Header = ({ googleSignIn, user, logout }) => {
  const role = user.role

  return (
    <div className="header">
      {
        (role === 'couple' || role === 'weddingP' || role === 'guest') &&
        <>
          <Link to="/">
            Meghívó
          </Link>

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
        (role === 'couple' || role === 'weddingP' || role === 'photographer' || role === 'guest') &&
        <Link to="/galery">
          Galéria
        </Link>
      }

      {
        (role === 'couple' || role === 'weddingP') &&
        <Link to="/admin">
          Admin
        </Link>
      }
      <button onClick={() => googleSignIn()}>Login</button>
      {
        role === 'couple' || role === 'weddingP' || role === 'photographer' || role === 'guest'
          ? <button onClick={() => logout()}>Logout</button>
          : <button onClick={() => googleSignIn()}>Login</button>
      }
    </div>
  )
}

export default Header