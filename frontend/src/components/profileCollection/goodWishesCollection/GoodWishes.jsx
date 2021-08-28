import React, { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ProfileContext } from '../../../ProfileContext'
import useFetchGet from '../../../customHooks/useFetchGet'
import useFetchPost from '../../../customHooks/useFetchPost'

import GoodWish from './GoodWish'

const GoodWishes = () => {
  const { profile } = useContext(ProfileContext)

  const [goodWish, setGoodWish] = useState(null)
  const [resPostGW, setResPostGW] = useState(0)
  const [submit, setSubmit] = useState(true)

  const postBody = {
    goodWish: goodWish,
    from: profile.name,
    email: profile.email
  }

  const { data: goodWishes } = useFetchGet((profile.role === 'couple'), 'http://localhost:3001/api/good-wish', [resPostGW])
  const { data } = useFetchPost(goodWish, 'http://localhost:3001/api/good-wish', postBody, [submit])

  useEffect(() => {
    setResPostGW(data)
  }, [data])

  return (
    <div className="good-wish-container">
      <h3>Jókívánságok a párnak</h3>

      {
        profile.role !== 'couple'
          ? <>
            <textarea name="textarea" onChange={e => setGoodWish(e.target.value)} />
            <button className="admin-button" disabled={!goodWish} onClick={() => setSubmit(!submit)}>Küldés</button>
          </>
          : goodWishes
            ? goodWishes.map(gWish => <GoodWish key={uuidv4()} gWish={gWish} />)
            : "Loading..."
      }
    </div>
  )
}

export default GoodWishes
