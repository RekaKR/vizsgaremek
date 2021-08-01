import React, { useState, useEffect } from 'react'
import CheckComboBox from '../CheckComboBox/CheckComboBox'

const MenuSelection = ({ profile }) => {
  const options = ['nincs', 'vega', 'vegán', 'laktóz mentes', 'glutén mentes', 'cukor mentes', 'paleo']
  const [value, setValue] = useState(options[0])

  return (
    <div>
      <p>Speciális menü: {profile.foodSensitivity ? profile.foodSensitivity : "Nincs"}</p>

      <CheckComboBox options={options} setValue={setValue} />

      {/*EL KELL KÜLDENI A BACKENDRE*/}
    </div>
  )
}

export default MenuSelection
