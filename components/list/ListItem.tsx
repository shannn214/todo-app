import React, { useState, useMemo } from 'react'
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
import { useStateContext, TaskContextType } from '../../contexts/ContextProvider'

interface ListItemProps {
  id: number
  task: string
  date: number
  isEdit: boolean
  setEditItem: React.Dispatch<React.SetStateAction<number | null>>
}

const ListItem: React.FC<ListItemProps> = ({ id, task, date, isEdit, setEditItem }) => {
  const { updateTask } = useStateContext() as TaskContextType
  const [value, setValue] = useState<string>(task)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault()
    const taskWrap = {
      id,
      task: value,
      date: Date.now(),
    }
    updateTask(taskWrap)
    setEditItem(null)
    // console.log(value)
  }
  console.log(id)
  return (
    <Card
      sx={{ width: '100%', minHeight: '50px', bgcolor: '#f5f5f5', px: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <CardContent sx={{ p: 1 }}>
        {isEdit ? (
          <OutlinedInput id="task-input" type="text" size="small" fullWidth autoFocus value={value} onChange={handleOnChange} />
        ) : (
          <>
            <Typography variant="h6">{task}</Typography>
            <Typography variant="subtitle2" color="#525252">
              {dayjs(date).format('YYYY-MM-DD HH:mm')}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {isEdit ? (
          <>
            <IconButton aria-label="check" onClick={handleUpdateTask}>
              <CheckIcon />
            </IconButton>
            <IconButton aria-label="cancel" onClick={() => setEditItem(null)}>
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton aria-label="edit" onClick={() => setEditItem(id)}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteOutlined />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default React.memo(ListItem)
