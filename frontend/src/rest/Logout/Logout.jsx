import React, { useContext } from 'react'
import { ProfileContext } from '../../ProfileContext'
import { logout } from "../../logInOutActions"

const Logout = () => {
  const { setUser } = useContext(ProfileContext)

  return (
    <button onClick={() => logout(setUser)}>Logout</button>
  )
}

export default Logout
