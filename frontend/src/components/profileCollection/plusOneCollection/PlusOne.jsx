import React, { useState, useEffect } from 'react'
import PlusOneTrue from './PlusOneTrue'

const PlusOne = ({ profile, resUpdatePlusOneData, setResUpdatePlusOneData, resUpdateIsComing, setResUpdateIsComing }) => {
  const [plusOneIsComing, setPlusOneIsComing] = useState('')
  const [changeUpdate, setChangeUpdate] = useState(false)

  const updatePlusOne = () => {
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
    <div>
      {
        profile.role !== 'couple' && <>
          <input type="checkbox" checked={profile.plusOne.isComing ? true : false} onClick={() => updatePlusOne()} onChange={() => setPlusOneIsComing(!profile.plusOne.isComing)} />

          {profile.plusOne.isComing
            ? <>
              <p>Jön velem +1 fő.</p>
              <PlusOneTrue profile={profile} resUpdatePlusOneData={resUpdatePlusOneData} setResUpdatePlusOneData={setResUpdatePlusOneData} />
            </>
            : <p>Nem jön velem +1 fő.</p>
          }
        </>
      }
    </div>
  )
}

export default PlusOne
