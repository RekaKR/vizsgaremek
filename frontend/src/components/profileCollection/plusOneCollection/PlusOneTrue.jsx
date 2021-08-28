import React, { useState, useEffect } from 'react'
import useFetchPatch from '../../../customHooks/useFetchPatch'
import CheckComboBox from '../../elementsCollection/CheckComboBox/CheckComboBox'
import Inp from '../../elementsCollection/Inp/Inp'

const PlusOneTrue = ({ profile, setResUpdatePlusOneData }) => {
  const options = ['nincs', 'vega', 'vegán', 'laktóz mentes', 'glutén mentes', 'cukor mentes', 'paleo']
  const name = profile.plusOne.name
  const foodS = profile.plusOne.foodSensitivity

  const [nextInp, setNextInp] = useState(false)
  const [plusOneName, setPlusOneName] = useState(null)
  const [plusOneFoodS, setPlusOneFoodS] = useState(null)
  const [changeUpdate, setChangeUpdate] = useState(false)

  const patchBody = {
    isComing: profile.plusOne.isComing,
    name: plusOneName,
    foodSensitivity: plusOneFoodS
  }

  const { data } = useFetchPatch((plusOneName !== null || plusOneFoodS !== null), 'http://localhost:3001/api/user/plus-one-details', patchBody, [changeUpdate])

  useEffect(() => {
    setResUpdatePlusOneData(data)
  }, [data])

  const updatePlusOneDetails = () => {
    setChangeUpdate(!changeUpdate)
  }

  return (
    <>
      {name || nextInp
        ? <>
          <p>A neve {name || plusOneName}.</p>

          <p>Speciális menü: {foodS && foodS.map(food => <span>{food}, </span>)}</p>

          {
            foodS && foodS.length < 1 &&
            <>
              <CheckComboBox options={options} setValue={setPlusOneFoodS} />
              <button disabled={!plusOneFoodS} onClick={() => updatePlusOneDetails()}>Küldés</button>
            </>
          }
        </>
        : <>
          <Inp classN="profile-i" label="Név" value={plusOneName} setValue={setPlusOneName} />
          <button onClick={() => setNextInp(!nextInp)}>Tovább</button>
        </>
      }
    </>
  )
}

export default PlusOneTrue
