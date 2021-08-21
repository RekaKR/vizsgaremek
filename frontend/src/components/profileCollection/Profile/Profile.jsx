import React, { useContext } from 'react'
import { ProfileContext } from '../../../ProfileContext'
import '../../../style/css/profile.css'

import GoodWishes from '../goodWishesCollection/GoodWishes'
import MenuSelection from '../MenuSelection/MenuSelection'
import PlusOne from '../plusOneCollection/PlusOne'

const Profile = () => {
  const { profile } = useContext(ProfileContext)

  return (
    <div className="profile">
      <h2>Profil</h2>

      {profile
        ? <div className="profile-container">
          {profile.role !== 'couple' &&
            <>
              <p>Szia {profile.username}!</p>
              <MenuSelection />
              <PlusOne />
            </>
          }

          <GoodWishes />
        </div>
        : "Loading.."

      }
    </div >
  )
}

export default Profile
