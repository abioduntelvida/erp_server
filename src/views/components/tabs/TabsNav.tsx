// ** React Imports
import { MouseEvent, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'
import HelpDeskTable from 'src/views/apps/tickets/HelpDesk'
import SupportTicketTable from 'src/views/apps/tickets/SupportTicket'

export const TickketTabsNav = () => {
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
            label='Help Desk'
            href='/drafts'
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
          />
          <Tab
            value='2'
            component='a'
            label='Support Ticket'
            href='/trash'
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
          />
          <Tab
            value='3'
            component='a'
            label='Project Ticket'
            href='/spam'
            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
          />
        </TabList>
        <TabPanel value='1'>
          <HelpDeskTable />
        </TabPanel>
        <TabPanel value='2'>
          <Typography>
            <SupportTicketTable />
          </Typography>
        </TabPanel>
        <TabPanel value='3'>
          <SupportTicketTable />
        </TabPanel>
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
