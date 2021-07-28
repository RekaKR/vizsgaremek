import React, { useState, useEffect } from 'react'
//Listázza a személyes dolgokat
//KÜLSŐ API - GOOGLE NAPTÁRBA ADÁS

const Profile = ({ user }) => {
  const google = user.google

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/user', {
      headers: {
        'authorization': localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => setProfile(null))
  }, [])

  return (
    <div className="profile">
      <h2>Profil</h2>

      <p>Szia {profile && profile.username}!</p>
      <p>{profile && profile.name} nem kell ide || {profile && profile.role} nem kell ide</p>

      {
        profile && profile.plusOne.isComing
          ? <>
            <p>+1 főt: Igen</p>
            <p>Név: {profile && profile.plusOne.name}</p>
            <p>Étel érzékenysége van-e: {profile && profile.plusOne.foodSensitivy}</p>
          </>
          : <p>+1 főt: Nem</p>
      }

      <p>Étel érzékenység: {profile && profile.foodSensitivity}</p>

      <p>Add calendar</p>


      
    </div>
  )
}

export default Profile
