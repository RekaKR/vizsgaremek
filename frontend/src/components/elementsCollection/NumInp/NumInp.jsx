import React from 'react'
import TextField from '@material-ui/core/TextField'

const NumInp = ({ classN, label, value, setValue }) => {
  return (
    <form noValidate autoComplete="off">
      <TextField className={classN} id="outlined-number" label={label} type="number" variant="outlined"
        value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
}

export default NumInp