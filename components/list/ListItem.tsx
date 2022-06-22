import React from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

interface ListItemProps {
  task: string
}

const ListItem: React.FC<ListItemProps> = ({ task = '' }) => {
  return (
    <Card
      sx={{ width: '100%', minHeight: '50px', bgcolor: '#f5f5f5', px: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <CardContent>
        <Typography variant="subtitle1">{task}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="edit">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteOutlined />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ListItem
