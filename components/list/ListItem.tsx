import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

interface ListItemProps {
  task: string
}

const ListItem: React.FC<ListItemProps> = ({ task }) => {
  return (
    <Paper elevation={0} sx={{ width: '100%', height: '50px', bgcolor: '#f5f5f5', p: 1 }}>
      <Typography variant="subtitle1">{task}</Typography>
    </Paper>
  )
}

export default ListItem
