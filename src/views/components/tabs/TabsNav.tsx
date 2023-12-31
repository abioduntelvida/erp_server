// ** React Imports
import { MouseEvent, SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'
import SupportTicketTable from 'src/views/apps/tickets/SupportTicket'

// import ProjectTicketTable from 'src/views/apps/tickets/ProjectTicket'
import HelpDeskTable from 'src/views/apps/tickets/help-desk/HelpDesk'
import { fetchAsyncAllUsers } from 'src/store/apps/user'

// ** Hooks
// import { useAuth } from 'src/hooks/useAuth'
import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'

// import { getHelpDeskLoading, postAsyncHelpDesk } from 'src/store/apps/help-desk'
// import { useAppSelector } from 'src/hooks/useTypedSelector'
// import { HTTP_STATUS } from 'src/constants'
// import { getAllUsers } from 'src/store/apps/user'
import { useAuth } from 'src/hooks/useAuth'

export const TickketTabsNav = () => {
  // ** State
  const [value, setValue] = useState<string>('1')

  // ** Hooks
  const auth = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const token = auth.token

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    const formData = {
      url: '/users',
      token: token
    }
    dispatch(fetchAsyncAllUsers(formData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper panelTopRound='right'>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='nav tabs example'>
          <Tab
            value='1'
            component='a'
            label='My Tickets'
            href='/drafts'
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
          />
          <Tab
            value='2'
            component='a'
            label='Assigned Ticket'
            href='/trash'
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
          />

          {/* <Tab
            value='3'
            component='a'
            label='Project Ticket'
            href='/spam'
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
          /> */}
        </TabList>
        <TabPanel value='1'>
          <HelpDeskTable />
        </TabPanel>
        <TabPanel value='2'>
          <Typography>
            <SupportTicketTable />
          </Typography>
        </TabPanel>
        {/* <TabPanel value='3'>
          <ProjectTicketTable />
        </TabPanel> */}
      </TabContext>
    </TabsWrapper>
  )
}

const TabsNav = () => {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabsWrapper panelTopRound='right'>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='nav tabs example'>
          <Tab
            value='1'
            component='a'
            label='Tab 1'
            href='/drafts'
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
          />
          <Tab
            value='2'
            component='a'
            label='Tab 2'
            href='/trash'
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
          />
          <Tab
            value='3'
            component='a'
            label='Tab 3'
            href='/spam'
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
          />
        </TabList>
        <TabPanel value='1'>
          <Typography>
            Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer
            jelly cake caramels brownie gummies.
          </Typography>
        </TabPanel>
        <TabPanel value='2'>
          <Typography>
            Chocolate bar carrot cake candy canes sesame snaps. Cupcake pie gummi bears jujubes candy canes. Chupa chups
            sesame snaps halvah.
          </Typography>
        </TabPanel>
        <TabPanel value='3'>
          <Typography>
            Danish tiramisu jujubes cupcake chocolate bar cake cheesecake chupa chups. Macaroon ice cream tootsie roll
            carrot cake gummi bears.
          </Typography>
        </TabPanel>
      </TabContext>
    </TabsWrapper>
  )
}

export default TabsNav
