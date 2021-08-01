import React, { useState } from 'react'
import { Checkbox, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const CheckComboBox = ({ options, setValue }) => {
  return (
    <div>
      <Autocomplete id="checkboxes-tags-demo" multiple disableCloseOnSelect
        onChange={(e, newValue) => setValue(newValue)}
        options={options} renderInput={(params) => <TextField {...params} variant="outlined" label="Speciális menü (többet is lehet választani)" placeholder="választott specializáció" />}
        getOptionLabel={option => option} renderOption={(option, { selected }) =>
          <>
            <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
            {option}
          </>
        }
      />
    </div>
  )
}

export default CheckComboBox