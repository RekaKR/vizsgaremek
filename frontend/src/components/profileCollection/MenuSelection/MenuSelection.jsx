import React, { useState, useEffect } from 'react'
import CheckComboBox from '../../CheckComboBox/CheckComboBox'

const MenuSelection = ({ profile, resUpdateUser, setResUpdateUser }) => {
  const options = ['nincs', 'vega', 'vegán', 'laktóz mentes', 'glutén mentes', 'cukor mentes', 'paleo']
  const userFoodS = profile.foodSensitivity

  const [foodS, setFoodS] = useState(null)
  const [changeUpdate, setChangeUpdate] = useState(false)

  const updateUser = () => {
    setChangeUpdate(!changeUpdate)
  }

  useEffect(() => {
    if (foodS !== null) {
      fetch('http://localhost:3001/api/user/food-sensitivity', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          foodSensitivity: foodS
        })
      }).then(res => res.json())
        .then(data => setResUpdateUser(resUpdateUser + 1))
        .catch(err => setResUpdateUser(false))
    }
  }, [changeUpdate])

  return (
    <div>
      {
        profile && profile.role !== 'couple' &&
        <>
          <p>Speciális menü: {userFoodS ? userFoodS : "Nincs"}</p>

          {
            userFoodS && userFoodS.length < 1 &&
            <>
              <CheckComboBox options={options} setValue={setFoodS} />
              <button disabled={!foodS} onClick={() => updateUser()}>Submit</button>
            </>
          }
        </>
      }
    </div>
  )
}

export default MenuSelection
