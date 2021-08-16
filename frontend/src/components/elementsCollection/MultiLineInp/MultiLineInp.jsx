import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

const MultiLineInp = ({ classN, label, value, setValue }) => {
  return (
    <form noValidate autoComplete="off">
      <TextField className={classN} id="outlined-multiline-flexible" label={label} variant="outlined"
        multiline rowsMax={4}
        value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
}

export default MultiLineInp