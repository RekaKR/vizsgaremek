import React, { useState, useEffect } from 'react'
import GoodWishes from './GoodWishes'
import PlusOne from './PlusOne'
//KÜLSŐ API - GOOGLE NAPTÁRBA ADÁS

const Profile = () => {
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [profile, setProfile] = useState(null)
  const [plusOneIsComing, setPlusOneIsComing] = useState('')
  const [changeUpdate, setChangeUpdate] = useState(false)
  const [resUpdateIsComing, setResUpdateIsComing] = useState(0)
  const [resUpdatePlusOneData, setResUpdatePlusOneData] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3001/api/user', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => setProfile(null))
  }, [resUpdateIsComing, resUpdatePlusOneData])

  const updatePlusOne = () => {
    setCheckboxValue(!checkboxValue) //do i need this?!
    setChangeUpdate(!changeUpdate)
  }

  useEffect(() => {
    if (plusOneIsComing !== '') {
      fetch('http://localhost:3001/api/user/plus-one', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          isComing: plusOneIsComing,
        })
      })
        .then(res => res.json())
        .then(data => setResUpdateIsComing(resUpdateIsComing + 1))
        .catch(err => setResUpdateIsComing(false))
    }
  }, [changeUpdate])

  return (
    <div className="profile">
      <h2>Profil</h2>

      {
        profile
          ? <>
            <p>Szia {profile.username}!</p>
            <p>Étel érzékenység: {profile.foodSensitivity ? profile.foodSensitivity : "Nincs"}</p>

            <input type="checkbox" checked={profile.plusOne.isComing ? true : false} onClick={() => updatePlusOne()} onChange={() => setPlusOneIsComing(!profile.plusOne.isComing)} />

            <PlusOne profile={profile} resUpdatePlusOneData={resUpdatePlusOneData} setResUpdatePlusOneData={setResUpdatePlusOneData} />

            <GoodWishes profile={profile} />
          </>
          : "Loading.."
      }

      {/*<p>Add calendar</p>*/}
    </div>
  )
}

export default Profile
