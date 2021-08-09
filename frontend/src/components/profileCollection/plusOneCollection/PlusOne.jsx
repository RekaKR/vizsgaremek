import React, { useState, useEffect, useContext } from 'react'
import { ProfileContext } from '../../../ProfileContext'
import useFetchPatch from '../../../customHooks/useFetchPatch'

import PlusOneTrue from './PlusOneTrue'

const PlusOne = () => {
  const { profile, setResUpdatePlusOneData, setResUpdateIsComing } = useContext(ProfileContext)
  const isComing = profile.plusOne.isComing

  const [plusOneIsComing, setPlusOneIsComing] = useState('')
  const [changeUpdate, setChangeUpdate] = useState(false)

  const patchBody = { isComing: plusOneIsComing }

  const { data } = useFetchPatch((plusOneIsComing !== ''), 'http://localhost:3001/api/user/plus-one', patchBody, [changeUpdate])

  useEffect(() => {
    setResUpdateIsComing(data)
  }, [data])

  const updatePlusOne = () => {
    setChangeUpdate(!changeUpdate)
  }

  return (
    <div>
      {
        profile.role !== 'couple' &&
        <>
          <input type="checkbox" checked={isComing} onClick={() => updatePlusOne()} onChange={() => setPlusOneIsComing(!isComing)} />

          {isComing
            ? <>
              <p>Jön velem +1 fő.</p>
              <PlusOneTrue profile={profile} setResUpdatePlusOneData={setResUpdatePlusOneData} />
            </>
            : <p>Nem jön velem +1 fő.</p>
          }
        </>
      }
    </div>
  )
}

export default PlusOne
