'use clients'

// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import { Icon } from '@iconify/react'
import { Divider, Typography } from '@mui/material'

interface SidebarAddUserType {
  title: string
  children: ReactNode
  open: boolean
  toggle: () => void
  reset?: any
  header?: boolean
  clearName?: boolean
  closeButton?: boolean
  closeNested?: boolean
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, title, children } = props

  const handleClose = () => {
    toggle()
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <Header>
          <Typography variant='h6'>{title}</Typography>
          <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
            <Icon icon='bx:x' fontSize={20} />
          </IconButton>
        </Header>
        <Divider sx={{ backgroundColor: '#210590', height: 2, width: { xs: '100%', sm: '100%' } }} />

        <Box sx={{ p: { xs: 1, sm: 1 } }}>{children}</Box>
      </Drawer>
    </>
  )
}

export default SidebarDrawer
