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

      {
        profile
          ? <>
            <p>Szia {profile.username}!</p>

            {profile.role !== 'couple' &&
              <>
                <MenuSelection />
                <PlusOne />
              </>
            }

            <GoodWishes />
          </>
          : "Loading.."
      }
    </div>
  )
}

export default Profile
