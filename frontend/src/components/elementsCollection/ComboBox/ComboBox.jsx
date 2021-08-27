import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const ComboBox = ({ classN, options, value, setValue, label }) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Autocomplete className={classN} id="controllable-states-demo"
      value={value} onChange={(e, newValue) => setValue(newValue)}
      inputValue={inputValue} onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
      options={options} renderInput={params => <TextField {...params} label={label} variant="outlined" />}
      getOptionSelected={(option, value) => option.params === value.params}
    />
  )
}

export default ComboBox