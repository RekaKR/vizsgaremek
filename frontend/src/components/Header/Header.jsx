import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProfileContext } from '../../ProfileContext'
import { googleSignIn, autoLogout, logout } from "../../logInOutActions"

import Player from '../elementsCollection/Player/Player'

const Header = ({ user }) => {
  const { setUser } = useContext(ProfileContext)
  const role = user.role

  setTimeout(() => autoLogout(setUser), 3600000)

  return (
    <div className="header">
      {
        (role === 'couple' || role === 'weddingP' || role === 'guest') &&
        <>
          <Link to='/'>
            Meghívó
          </Link>

          <Link to='/profile'>
            Profil
          </Link>

          <Link to='/timeline'>
            Menetrend
          </Link>

          <Link to='/accommodation'>
            Szállás
          </Link>
        </>
      }

      {
        (role === 'couple' || role === 'weddingP') &&
        <Link to='/admin'>
          Admin
        </Link>
      }

      {
        role === 'couple' || role === 'weddingP' || role === 'guest'
          ? <>
            <button className="link-button" onClick={() => logout(setUser)}>Logout</button>
            <Player />
          </>
          : <button className="link-button" id="login" onClick={() => googleSignIn()}>Login</button>
      }
    </div>
  )
}

export default Header