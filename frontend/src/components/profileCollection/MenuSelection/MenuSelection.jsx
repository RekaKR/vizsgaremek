import React, { useState, useEffect } from 'react'
import useFetchPatch from '../../../useFetchPatch'
import CheckComboBox from '../../CheckComboBox/CheckComboBox'

const MenuSelection = ({ profile, setResUpdateUser }) => {
  const options = ['nincs', 'vega', 'vegán', 'laktóz mentes', 'glutén mentes', 'cukor mentes', 'paleo']
  const userFoodS = profile.foodSensitivity

  const [foodS, setFoodS] = useState(null)
  const [changeUpdate, setChangeUpdate] = useState(false)

  const body = { foodSensitivity: foodS }

  const { data } = useFetchPatch((foodS !== null), 'http://localhost:3001/api/user/food-sensitivity', body, [changeUpdate])

  useEffect(() => {
    setResUpdateUser(data)
  }, [data])

  const updateUser = () => {
    setChangeUpdate(!changeUpdate)
  }

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
