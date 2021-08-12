import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const Header = ({ user, setUser }) => {
  let history = useHistory()
  const role = user.role

  const googleSignIn = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=select_account&client_id=716515278040-8devcsi8fm1uh0mledpu00oknp3i3kpv.apps.googleusercontent.com&scope=openid%20profile email&redirect_uri=http://localhost:3000/login"
  }

  const logout = () => {
    localStorage.removeItem('token')
    history.push('/')
    setUser('')
  }

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
        role === 'couple' || role === 'weddingP' || role === 'photographer' || role === 'guest'
          ? <button onClick={() => logout()}>Logout</button>
          : <button onClick={() => googleSignIn()}>Login</button>
      }
    </div>
  )
}

export default Header