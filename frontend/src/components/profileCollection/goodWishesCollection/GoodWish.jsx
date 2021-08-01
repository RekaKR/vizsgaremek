import React from 'react'

const GoodWish = ({ gWish }) => {
  return (
    <div>
      <br />

      <p>{gWish.goodWish}</p>
      <p>Üdvözlettel: {gWish.from}</p>
      <p>{gWish.email}</p>
    </div>
  )
}

export default GoodWish
