import React, { useState } from 'react'
import useFetchGet from '../../../customHooks/useFetchGet'

import GoodWishes from '../goodWishesCollection/GoodWishes'
import MenuSelection from '../MenuSelection/MenuSelection'
import PlusOne from '../plusOneCollection/PlusOne'

const Profile = () => {
  const [resUpdateIsComing, setResUpdateIsComing] = useState(0)
  const [resUpdatePlusOneData, setResUpdatePlusOneData] = useState(0)
  const [resUpdateUser, setResUpdateUser] = useState(0)

  const { data: profile } = useFetchGet(true, 'http://localhost:3001/api/user', [resUpdateIsComing, resUpdatePlusOneData, resUpdateUser])

  return (
    <div className="profile">
      <h2>Profil</h2>

      {
        profile
          ? <>
            <p>Szia {profile.username}!</p>

            <MenuSelection profile={profile} setResUpdateUser={setResUpdateUser} />
            <PlusOne profile={profile} setResUpdatePlusOneData={setResUpdatePlusOneData} setResUpdateIsComing={setResUpdateIsComing} />
            <GoodWishes profile={profile} />
          </>
          : "Loading.."
      }

      {/*<p>Add calendar</p>*/}
    </div>
  )
}

export default Profile
