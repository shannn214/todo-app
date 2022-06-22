import React, { useState, useMemo } from 'react'
import Stack from '@mui/material/Stack'
import ListItem from './ListItem'
import { useStateContext, TaskContextType } from '../../contexts/ContextProvider'

const ListWrap = () => {
  const { tasks } = useStateContext() as TaskContextType
  const [editId, setEditId] = useState<number | null>(null)

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} py={2}>
      {tasks.map((item) => (
        <ListItem key={item.id} id={item.id} task={item.task} date={item.date} isEdit={editId === item.id} setEditItem={setEditId} />
      ))}
    </Stack>
  )
}

export default ListWrap
