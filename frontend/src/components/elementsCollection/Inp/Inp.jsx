import React from 'react'
import TextField from '@material-ui/core/TextField'

const MultiLineInp = ({ classN, label, value, setValue }) => {
  return (
    <form noValidate autoComplete="off">
      <TextField className={classN} label={label} id="outlined-size-normal" variant="outlined"
        value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
}

export default MultiLineInp