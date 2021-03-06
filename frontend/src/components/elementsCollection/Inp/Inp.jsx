import React from 'react'
import TextField from '@material-ui/core/TextField'

const Inp = ({ classN, label, value, setValue }) => {
  return (
    <form noValidate autoComplete="off">
      <TextField className={classN} id="outlined-size-normal" label={label} variant="outlined"
        value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
}

export default Inp