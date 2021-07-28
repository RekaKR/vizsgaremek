import React, { useState } from 'react'

const SeatsAdmin = () => {
  const [publication, setPublication] = useState(true)

  return (
    <div>
      <h3>Ülésrend</h3>

      <h4>Ülésrend</h4>
      <h4>Ülésrend szerkesztése</h4>

      {publication && <button onClick={() => setTimeout(() => setPublication(false), 500)}>Közzététel</button>}
    </div>
  )
}

export default SeatsAdmin
