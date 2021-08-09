import React, { useContext } from 'react'
import { ProfileContext } from '../../../ProfileContext'

const AdminPage = () => {
  const { profile } = useContext(ProfileContext)

  console.log(profile)
  return (
    <div>
      <h2>Admin felület</h2>

    </div>
  )
}

export default AdminPage
