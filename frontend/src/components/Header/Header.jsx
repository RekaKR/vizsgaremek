import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//import '../../style/css/style.css'

const Header = ({ googleSignIn, user, logout }) => {
  const role = user.role

  return (
    <div className="header">
      <Link to="/">
        Meghívó
      </Link>

      {
        (role === 'couple' || role === 'weddingP' || role === 'guest' || role === 'admin') &&
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

      {
        (role === 'couple' || role === 'weddingP' || role === 'photographer' || role === 'guest')
          ? <button onClick={() => googleSignIn()}>Login</button>
          : <button onClick={() => logout()}>Logout</button>
      }
    </div>
  )
}

export default Header