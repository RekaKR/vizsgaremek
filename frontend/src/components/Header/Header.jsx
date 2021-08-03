import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const Header = ({ googleSignIn, user, setUser }) => {
  let history = useHistory()
  const role = user.role

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
        (role === 'couple' || role === 'weddingP' || role === 'photographer' || role === 'guest') &&
        <Link to='/galery'>
          Galéria
        </Link>
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