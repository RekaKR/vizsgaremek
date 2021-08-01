import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const ComboBox = ({ options, value, setValue, label }) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <div>
      <Autocomplete id="controllable-states-demo"
        value={value} onChange={(e, newValue) => setValue(newValue)}
        inputValue={inputValue} onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        options={options} renderInput={params => <TextField {...params} label={label} variant="outlined" />}
      />
    </div>
  )
}

export default ComboBox