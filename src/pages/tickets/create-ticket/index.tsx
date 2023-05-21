// ** Next Import
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import List, { ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Image Imports
import Avatar1 from '../../../../public/images/avatars/21.png'

const StyledList = styled(List)<ListProps>(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(5),
    height: 150,
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(1),
      '& .MuiTypography-root': {
        color: theme.palette.text.secondary
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const CreateTicket = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Create Ticket   Dashboard/Create Ticket  ' sx={{ color: 'common.white', fontWeight: 500 }} />
        <CardContent sx={{ pb: theme => `${theme.spacing(3.75)} !important` }}>
          <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
            Select Ticket Type
          </Typography>
          <StyledList sx={{ mt: 4 }}>
            <Box href='/tickets/create-ticket/help-desk' component={Link} sx={{ textDecoration: 'none' }}>
              <ListItem
                sx={{
                  justifyContent: 'space-between',
                  '& svg': { color: 'text.secondary' },
                  py: theme => `${theme.spacing(2.5)} !important`
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src={Avatar1} alt='' width={100} height={100} />
                  <Box sx={{ marginLeft: 5 }}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      Helpdesk
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: 600 }}>
                      Demonstrations, Proof of Concepts, and other office-related tasks.
                    </Typography>
                  </Box>
                </Box>
                <Icon icon='bx:chevron-right' />
              </ListItem>
            </Box>
          </StyledList>
          <StyledList sx={{ mt: 4 }}>
            <Box href='/tickets/create-ticket/project-ticket' component={Link} sx={{ textDecoration: 'none' }}>
              <ListItem
                sx={{
                  justifyContent: 'space-between',
                  '& svg': { color: 'text.secondary' },
                  py: theme => `${theme.spacing(2.5)} !important`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src={Avatar1} alt='' width={100} height={100} />
                  <Box sx={{ marginLeft: 5, color: 'text.secondary', textDecoration: 'none' }}>
                    <Typography variant='body2' sx={{ fontWeight: 600, textDecoration: 'none' }}>
                      Project
                    </Typography>
                    <Typography variant='body1'>For Fresh deployments and new projects</Typography>
                  </Box>
                </div>
                <Icon icon='bx:chevron-right' />
              </ListItem>
            </Box>
          </StyledList>
          <StyledList sx={{ mt: 4 }}>
            <Box href='/tickets/create-ticket/support-ticket' component={Link} sx={{ textDecoration: 'none' }}>
              <ListItem
                sx={{
                  justifyContent: 'space-between',
                  '& svg': { color: 'text.secondary' },
                  py: theme => `${theme.spacing(2.5)} !important`
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src={Avatar1} alt='' width={100} height={100} />
                  <Box sx={{ marginLeft: 5 }}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      Support
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: 600 }}>
                      Support for customers and other issues reported
                    </Typography>
                  </Box>
                </Box>
                <Icon icon='bx:chevron-right' />
              </ListItem>
            </Box>
          </StyledList>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default CreateTicket
