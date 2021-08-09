import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useFetchGetWAuth from '../../../customHooks/useFetchGet'
import useFetchPost from '../../../customHooks/useFetchPost'

import GoodWish from './GoodWish'

const GoodWishes = ({ profile }) => {
  const [goodWish, setGoodWish] = useState(null)
  const [resPostGW, setResPostGW] = useState(0)
  const [submit, setSubmit] = useState(true)

  const postBody = {
    goodWish: goodWish,
    from: profile.name,
    email: profile.email
  }

  const { data: goodWishes } = useFetchGetWAuth((profile.role === 'couple'), 'http://localhost:3001/api/good-wish', [resPostGW])
  const { data } = useFetchPost('http://localhost:3001/api/good-wish', postBody, [submit])

  useEffect(() => {
    setResPostGW(data)
  }, [submit])

  return (
    <div>
      <h3>Jókívánságok a párnak</h3>

      {
        profile.role !== 'couple'
          ? <>
            <textarea name="ds" id="sds" cols="30" rows="10" onChange={e => setGoodWish(e.target.value)} />
            <button disabled={!goodWish} onClick={() => setSubmit(!submit)}>Submit</button>
          </>
          : goodWishes
            ? goodWishes.map(gWish => <GoodWish key={uuidv4()} gWish={gWish} />)
            : "Loading..."
      }
    </div>
  )
}

export default GoodWishes
