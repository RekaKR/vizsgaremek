import React, { useState } from 'react'

const Header = () => {
  const [couple, setCouple] = useState(true)
  const [weddingP, setWeddingP] = useState(false)
  const [photographer, setPhotographer] = useState(false)
  const [guest, setGuest] = useState(false)

  return (
    <div>
      {
        (couple || weddingP || guest) &&
        <>
          <h2>Profile</h2>
          <h2>Timeline</h2>
          <h2>Accommodation</h2>
        </>
      }

      {(couple || weddingP || photographer || guest) && <h2>Pictures</h2>}

      {
        (couple || weddingP) &&
        <>
          <h2>ToDoList</h2>
          <h2>Admin</h2>
        </>
      }
    </div>
  )
}

export default Header

