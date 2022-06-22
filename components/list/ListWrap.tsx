import React from 'react'
import Stack from '@mui/material/Stack'
import ListItem from './listItem'

const ListWrap = () => {
  return (
    <Stack component="form" direction="column" justifyContent="center" alignItems="center" spacing={2} py={2}>
      <ListItem task="Write the assignmet" />
      <ListItem task="dddd" />
      <ListItem task="dddd" />
      <ListItem task="dddd" />
    </Stack>
  )
}

export default ListWrap
