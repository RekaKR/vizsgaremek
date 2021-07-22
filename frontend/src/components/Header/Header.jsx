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
        <>
          <Link to="/to-do-list">
            Teendők
          </Link>

          <Link to="/admin">
            Admin
          </Link>
        </>
      }


      <button onClick={() => googleSignIn()}>Login</button>


      <button onClick={() => logout()}>Logout</button>


    </div>
  )
}

export default Header


/*//Eng version
<div className="header">

  <Link to="/">
  Invitation
  </Link>

  {(!couple && !weddingP && !photographer && !guest) && <Link to="/login">
  LogInOut
  </Link>}

  {
    (couple || weddingP || guest) &&
    <>
      <Link to="/profile">
      Profile
      </Link>
      <Link to="/timeline">
      Timeline
      </Link>
      <Link to="/accommodation">
      Accommodation
      </Link>
    </>
  }

  {(couple || weddingP || photographer || guest) && <Link to="/galery">
  Galery
  </Link>}

  {
    (couple || weddingP) &&
    <>
      <Link to="/to-do-list">
      ToDoList
      </Link>
      <Link to="/admin">
      Admin
      </Link>
    </>
  }
</div>
*/
