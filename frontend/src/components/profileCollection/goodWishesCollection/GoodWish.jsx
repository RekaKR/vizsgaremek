import React from 'react'

const GoodWish = ({ gWish }) => {
  return (
    <div className="good-wish">
      <br />

      <p>{gWish.goodWish}</p>
      <p>Sok szeretettel: {gWish.from}</p>
      <p>{gWish.email}</p>
    </div>
  )
}

export default GoodWish
