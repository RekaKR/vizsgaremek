import React, { useState, useEffect } from 'react'

const PlusOne = ({ profile, resUpdatePlusOneData, setResUpdatePlusOneData }) => {
  const [plusOneName, setPlusOneName] = useState(null)
  const [plusOneFoodS, setPlusOneFoodS] = useState(null)

  const [changeUpdate, setChangeUpdate] = useState(false)

  const updatePlusOneDetails = () => {
    setChangeUpdate(!changeUpdate)
  }

  useEffect(() => {
    if (plusOneName !== null || plusOneFoodS !== null) {
      fetch('http://localhost:3001/api/user/plus-one-details', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          isComing: profile.plusOne.isComing,
          name: plusOneName,
          foodSensitivity: plusOneFoodS
        })
      }).then(res => res.json())
        .then(data => setResUpdatePlusOneData(resUpdatePlusOneData + 1))
        .catch(err => setResUpdatePlusOneData(false))
    }
  }, [changeUpdate])

  return (
    <div>
      {
        profile.role !== 'couple' && (profile.plusOne.isComing
          ? <>
            <p>Jön velem +1 fő.</p>

            <div>
              <p>Az ő neve: {profile.plusOne.name}</p>
              <input type="text" onChange={e => setPlusOneName(e.target.value)} placeholder="Neve" />
            </div>

            <div>
              <p>Étel érzékenysége van-e: {profile.plusOne.foodSensitivy}</p>
              <input type="text" onChange={e => setPlusOneFoodS(e.target.value)} placeholder="Food sensitivity" />
            </div>

            <button disabled={!(plusOneName && plusOneFoodS)} onClick={() => updatePlusOneDetails()}>Submit</button>
          </>
          : <p>Nem jön velem +1 fő.</p>)
      }
    </div>
  )
}

export default PlusOne
