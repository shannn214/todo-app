import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import { useStateContext, TaskContextType } from '../../contexts/ContextProvider'

const InputWrap = () => {
  const { addTask } = useStateContext() as TaskContextType
  const [value, setValue] = useState<string>('')

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const taskWrap = {
      id: Date.now() + Math.random(),
      task: value,
      date: Date.now(),
    }
    addTask(taskWrap)
    setValue('')
    console.log(value)
  }

  const isDisabled = value.trim() === ''

  return (
    <Stack component="form" onSubmit={handleOnSubmit} noValidate direction="row" justifyContent="center" alignItems="center" spacing={2} py={2}>
      <OutlinedInput id="task-input" type="text" placeholder="Any task?" size="small" fullWidth value={value} onChange={handleOnChange} />
      <Button disabled={isDisabled} type="submit" variant="contained">
        Add
      </Button>
    </Stack>
  )
}

export default InputWrap
