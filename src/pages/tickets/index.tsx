// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardSnippet from 'src/@core/components/card-snippet'

// ** Demo Components Imports
import { TickketTabsNav } from 'src/views/components/tabs/TabsNav'

// ** Source code imports
import * as source from 'src/views/components/tabs/TabsSourceCode'

const Tabs = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <CardSnippet
          title='Nav Tabs'
          sx={{ boxShadow: 0, backgroundColor: 'transparent', border: theme => `1px solid ${theme.palette.divider}` }}
          code={{
            tsx: source.TabsNavTSXCode,
            jsx: source.TabsNavJSXCode
          }}
        >
          <TickketTabsNav />
        </CardSnippet>
      </Grid>
    </Grid>
  )
}

export default Tabs
