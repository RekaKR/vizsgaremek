import React, { useState, useEffect } from 'react'
import GoodWish from './GoodWish'
//KÜLSŐ API - GOOGLE NAPTÁRBA ADÁS

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [plusOneIsComing, setPlusOneIsComing] = useState(false)

  const [plusOneName, setPlusOneName] = useState(null)
  const [plusOneFoodS, setPlusOneFoodS] = useState(null)

  const [changeUpdate, setChangeUpdate] = useState(false)
  const [resPatchIsComing, setResPatchIsComing] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3001/api/user', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => setProfile(null))
  }, [resPatchIsComing])

  const updatePlusOne = () => {
    setChangeUpdate(!changeUpdate)
  }

  useEffect(() => {
    fetch('http://localhost:3001/api/user', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        isComing: plusOneIsComing,
      })
    }).then(res => res.json())
      .then(data => setResPatchIsComing(resPatchIsComing + 1))
      .catch(err => setResPatchIsComing(false))
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

            {
              profile.plusOne.isComing && profile.role !== 'couple'
                ? <>
                  <p>Hozol +1 főt? - Igen</p>

                  <div>
                    <p>Név: {profile.plusOne.name}</p>
                    <input type="text" onChange={e => setPlusOneName(e.target.value)} placeholder="Neve" />
                  </div>

                  <div>
                    <p>Étel érzékenysége van-e: {profile.plusOne.foodSensitivy}</p>
                    <input type="text" onChange={e => setPlusOneFoodS(e.target.value)} placeholder="Food sensitivity" />
                  </div>

                  {/*<button disabled={!(plusOneName)} onClick={() => submit()}>Submit</button>*/}
                </>
                : <>
                  <p>Hozol +1 főt? - Nem</p>
                </>
            }

            <GoodWish profile={profile} />
          </>
          : "Loading.."
      }

      {/*<p>Add calendar</p>*/}
    </div>
  )
}

export default Profile
