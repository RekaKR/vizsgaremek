import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useFetchGetWAuth from '../../../useFetchGet'
import GoodWish from './GoodWish'

const GoodWishes = ({ profile }) => {
  const [goodWish, setGoodWish] = useState(null)
  const [resPostGW, setResPostGW] = useState(0)

  const { data: goodWishes } = useFetchGetWAuth((profile.role === 'couple'), 'http://localhost:3001/api/good-wish', [resPostGW])

  const submit = () => {
    fetch('http://localhost:3001/api/good-wish', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        goodWish: goodWish,
        from: profile.name,
        email: profile.email
      })
    }).then(res => res.json())
      .then(res => setResPostGW(resPostGW + 1))
      .catch(err => setResPostGW(false))
  }

  return (
    <div>
      <h3>Jókívánságok a párnak</h3>

      {
        profile.role !== 'couple'
          ? <>
            <textarea name="ds" id="sds" cols="30" rows="10" onChange={e => setGoodWish(e.target.value)} />
            <button disabled={!goodWish} onClick={() => submit()}>Submit</button>
          </>
          : goodWishes
            ? goodWishes.map(gWish => <GoodWish key={uuidv4()} gWish={gWish} />)
            : "Loading..."
      }
    </div>
  )
}

export default GoodWishes
