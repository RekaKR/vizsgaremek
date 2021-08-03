import React, { useState, useEffect } from 'react'
import CheckComboBox from '../../CheckComboBox/CheckComboBox'

const PlusOneTrue = ({ profile, resUpdatePlusOneData, setResUpdatePlusOneData }) => {
  const options = ['nincs', 'vega', 'vegán', 'laktóz mentes', 'glutén mentes', 'cukor mentes', 'paleo']

  const [nextInp, setNextInp] = useState(false)
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
        profile.plusOne.name || nextInp
          ? <>
            <p>A neve: {profile.plusOne.name || plusOneName}</p>

            <p>Étel érzékenysége van-e: {profile.plusOne.foodSensitivy || plusOneFoodS}</p>
            <CheckComboBox options={options} setValue={setPlusOneFoodS} />

            <button disabled={!(plusOneName && plusOneFoodS)} onClick={() => updatePlusOneDetails()}>Submit</button>
          </>
          : <>
            <input type="text" onChange={e => setPlusOneName(e.target.value)} placeholder="Neve" />
            <button onClick={() => setNextInp(!nextInp)}>Next</button>
          </>
      }
    </div>
  )
}

export default PlusOneTrue
