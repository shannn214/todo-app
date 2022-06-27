import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { useTodoContext, TodoContextType } from '../../contexts/TodoContextProvider'
import { updateTodo, checkTodo } from '../../utils/todoDatabaseHelper'

const TodoInput = () => {
  const { handleSetTodo } = useTodoContext() as TodoContextType
  const [value, setValue] = useState<string>('')
  const [inputError, setInputError] = useState<string | null>(null)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    inputError && setInputError(null)
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const taskWrap = {
      id: Date.now() + Math.random(),
      title: value.trim(),
      date: Date.now(),
    }

    const checkIsExist = await checkTodo(taskWrap.title)
    if (checkIsExist !== undefined) return setInputError('Task has existed.')

    const res = await updateTodo(taskWrap)
    if (!res) return console.log('add failed')
    handleSetTodo()
    setValue('')
    setInputError(null)
  }

  const isDisabled = value.trim() === ''
  const hasError = inputError !== null

  return (
    <Stack component="form" onSubmit={handleOnSubmit} noValidate direction="row" justifyContent="center" alignItems="start" spacing={2} py={2}>
      <FormControl error={hasError} fullWidth>
        <OutlinedInput id="task-input" type="text" placeholder="Any task?" fullWidth sx={{ height: 45 }} value={value} onChange={handleOnChange} />
        <FormHelperText>{inputError}</FormHelperText>
      </FormControl>
      <Button disabled={isDisabled} type="submit" variant="contained" sx={{ height: 45 }}>
        Add
      </Button>
    </Stack>
  )
}

export default TodoInput
