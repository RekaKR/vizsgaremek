import React, { useState, useEffect } from 'react'
import useFetchPatch from '../../../customHooks/useFetchPatch'
import CheckComboBox from '../../CheckComboBox/CheckComboBox'

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
    <div>
      {
        name || nextInp
          ? <>
            <p>A neve: {name || plusOneName}</p>

            <p>Speciális menü: {foodS}</p>

            {
              foodS && foodS.length < 1 &&
              <>
                <CheckComboBox options={options} setValue={setPlusOneFoodS} />
                <button disabled={!plusOneFoodS} onClick={() => updatePlusOneDetails()}>Submit</button>
              </>
            }
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
