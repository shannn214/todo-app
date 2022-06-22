import React from 'react'
import Container from '@mui/material/Container'

type ContainerProps = { children: React.ReactNode }

const ContainerWrap = ({ children }: ContainerProps) => {
  return (
    <Container sx={{ py: 4 }} maxWidth="sm">
      {children}
    </Container>
  )
}

export default ContainerWrap
