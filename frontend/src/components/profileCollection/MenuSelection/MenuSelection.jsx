import React, { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ProfileContext } from '../../../ProfileContext'
import useFetchPatch from '../../../customHooks/useFetchPatch'

import CheckComboBox from '../../elementsCollection/CheckComboBox/CheckComboBox'

const MenuSelection = () => {
  const { profile, setResUpdateUser } = useContext(ProfileContext)

  const userFoodS = profile.foodSensitivity
  const options = ['nincs', 'vega', 'vegán', 'laktóz mentes', 'glutén mentes', 'cukor mentes', 'paleo']

  const [foodS, setFoodS] = useState(null)
  const [changeUpdate, setChangeUpdate] = useState(false)

  const patchBody = { foodSensitivity: foodS }

  const { data } = useFetchPatch((foodS !== null), 'http://localhost:3001/api/user/food-sensitivity', patchBody, [changeUpdate])

  useEffect(() => {
    setResUpdateUser(data)
  }, [data])

  const updateUser = () => {
    setChangeUpdate(!changeUpdate)
  }

  return (
    <div className="menu-selection">
      <p>Speciális menü: {userFoodS ? userFoodS.map(food => <span key={uuidv4()}>{food}, </span>) : "Nincs"}</p>

      {userFoodS && userFoodS.length < 1 &&
        <>
          <CheckComboBox options={options} setValue={setFoodS} />
          <button disabled={!foodS} onClick={() => updateUser()}>Küldés</button>
        </>
      }
    </div>
  )
}

export default MenuSelection
