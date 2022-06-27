import React, { useState } from 'react'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckIcon from '@mui/icons-material/Check'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { ITodo } from '../../contexts/TodoContextProvider'
import { updateTodo, deleteTodo, checkTodo } from '../../utils/todoDatabaseHelper'

interface TodoItemProps {
  todo: ITodo
  isEdit: boolean
  setEditItem: React.Dispatch<React.SetStateAction<number | null>>
  handleSetTodo: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, isEdit, setEditItem, handleSetTodo }) => {
  const { id, title, date } = todo
  const [value, setValue] = useState<string>(title)
  const [inputError, setInputError] = useState<string | null>(null)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    inputError && setInputError(null)
  }

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    const taskWrap = {
      id,
      title: value.trim(),
      date: Date.now(),
    }

    const checkIsExist = await checkTodo(taskWrap.title)
    if (checkIsExist !== undefined) return setInputError('Task has existed.')

    const res = await updateTodo(taskWrap)
    if (!res) return console.log('update failed')
    handleSetTodo()
    setEditItem(null)
    setInputError(null)
  }

  const handleDeleteTodo = async (id: number) => {
    const res = await deleteTodo(id)
    if (!res) return console.log('delete failed')
    handleSetTodo()
  }

  const handleToggleEdit = (id: number | null) => {
    setValue(title)
    setEditItem(id)
  }

  const hasError = inputError !== null

  return (
    <Card
      sx={{ width: '100%', minHeight: '50px', bgcolor: '#f5f5f5', px: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <CardContent sx={{ p: 1 }}>
        {isEdit ? (
          <FormControl error={hasError} fullWidth>
            <OutlinedInput id="task-input" type="text" size="small" fullWidth autoFocus value={value} onChange={handleOnChange} />
            <FormHelperText>{inputError}</FormHelperText>
          </FormControl>
        ) : (
          <>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle2" color="#525252">
              {dayjs(date).format('YYYY-MM-DD HH:mm')}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {isEdit ? (
          <>
            <IconButton aria-label="check" onClick={handleUpdateTodo}>
              <CheckIcon />
            </IconButton>
            <IconButton aria-label="cancel" onClick={() => handleToggleEdit(null)}>
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton aria-label="edit" onClick={() => handleToggleEdit(id)}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDeleteTodo(id)}>
              <DeleteOutlined />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  )
}

const areEqual = (prevProps: any, nextProps: any) => {
  return (
    prevProps.isEdit === nextProps.isEdit &&
    prevProps.todo.id === nextProps.todo.id &&
    prevProps.todo.title === nextProps.todo.title &&
    prevProps.todo.date === nextProps.todo.date
  )
}

export default React.memo(TodoItem, areEqual)
