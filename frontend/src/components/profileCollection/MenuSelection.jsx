import React, { useState, useEffect } from 'react'
import CheckComboBox from '../CheckComboBox/CheckComboBox'

const MenuSelection = ({ profile, resUpdateUser, setResUpdateUser }) => {
  const options = ['nincs', 'vega', 'vegán', 'laktóz mentes', 'glutén mentes', 'cukor mentes', 'paleo']
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
      <p>Speciális menü: {profile.foodSensitivity ? profile.foodSensitivity : "Nincs"}</p>

      <CheckComboBox options={options} setValue={setFoodS} />
      <button onClick={() => updateUser()}>Submit</button>
    </div>
  )
}

export default MenuSelection
