import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'

const InputWrap = () => {
  return (
    <Stack component="form" direction="row" justifyContent="center" alignItems="center" spacing={2} py={2}>
      <OutlinedInput id="outlined-input" placeholder="Any task?" size="small" fullWidth />
      <Button variant="contained">Add</Button>
    </Stack>
  )
}

export default InputWrap
