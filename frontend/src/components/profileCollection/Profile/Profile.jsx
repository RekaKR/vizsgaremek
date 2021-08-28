import React, { useContext } from 'react'
import { ProfileContext } from '../../../ProfileContext'

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
            <div className="plus-one-container">
              <p className="name">Szia {profile.username}!</p>
              <p>Szerettel meghívünk az esküvőnkre, melyet Május 10-én tartunk, Budapesten.</p>
              <p>A következőkben meg tudod adni, hogy kísérővel érkezel-e az esküvőre, valamint speciális menü elképzelésedet is tudod nekünk jelezni.</p>

              <MenuSelection />
              <PlusOne />
            </div>
          }

          <GoodWishes />
        </div>
        : "Loading.."

      }
    </div >
  )
}

export default Profile
