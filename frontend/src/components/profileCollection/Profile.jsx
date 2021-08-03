import React, { useState, useEffect } from 'react'
import GoodWishes from './goodWishesCollection/GoodWishes'
import MenuSelection from './MenuSelection'
import PlusOne from './plusOneCollection/PlusOne'
//KÜLSŐ API - GOOGLE NAPTÁRBA ADÁS

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [resUpdateIsComing, setResUpdateIsComing] = useState(0)
  const [resUpdatePlusOneData, setResUpdatePlusOneData] = useState(0)
  const [resUpdateUser, setResUpdateUser] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3001/api/user', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => setProfile(null))
  }, [resUpdateIsComing, resUpdatePlusOneData, resUpdateUser])

  return (
    <div className="profile">
      <h2>Profil</h2>

      {
        profile
          ? <>
            <p>Szia {profile.username}!</p>

            <MenuSelection profile={profile} resUpdateUser={resUpdateUser} setResUpdateUser={setResUpdateUser} />
            <PlusOne profile={profile} resUpdatePlusOneData={resUpdatePlusOneData} setResUpdatePlusOneData={setResUpdatePlusOneData} resUpdateIsComing={resUpdateIsComing} setResUpdateIsComing={setResUpdateIsComing} />
            <GoodWishes profile={profile} />
          </>
          : "Loading.."
      }

      {/*<p>Add calendar</p>*/}
    </div>
  )
}

export default Profile
