import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import ListItem from './ListItem'
import { useStateContext, TaskContextType } from '../../contexts/ContextProvider'

const ListWrap = () => {
  const { tasks } = useStateContext() as TaskContextType

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} py={2}>
      {tasks.map((item) => (
        <ListItem key={item.id} task={item.task} />
      ))}
    </Stack>
  )
}

export default ListWrap
