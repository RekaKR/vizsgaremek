import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import GoodWish from './GoodWish'

const GoodWishes = ({ profile }) => {
  const [goodWishes, setGoodWishes] = useState(null)
  const [goodWish, setGoodWish] = useState(null)
  const [resPostGW, setResPostGW] = useState(0)

  useEffect(() => {
    if (profile.role === 'couple') {
      fetch('http://localhost:3001/api/good-wish', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(res => res.json())
        .then(data => setGoodWishes(data))
        .catch(err => setGoodWishes(null))
    }
  }, [resPostGW])

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
