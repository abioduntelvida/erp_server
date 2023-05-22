// ** React Imports
import { useState, useEffect, useCallback, FormEvent } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/apps/permissions/TableHeader'

// ** Actions Imports

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { TicketRowType } from 'src/types/apps/ticketTypes'
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypedSelector'
import { fetchAsyncTickets, getTicketData } from 'src/store/apps/tickets'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// import { HTTP_STATUS } from 'src/constants'

interface Colors {
  [key: string]: ThemeColor
}

interface CellType {
  row: TicketRowType
}

const colors: Colors = {
  support: 'info',
  users: 'success',
  ongoing: 'warning',
  administrator: 'primary',
  'restricted-user': 'error'
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.45,
    field: 'ticket',
    minWidth: 140,
    headerName: 'Ticket No.',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.ticket_no}</Typography>
  },
  {
    flex: 0.25,
    field: 'title',
    minWidth: 240,
    headerName: 'Title',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.title}</Typography>
  },
  {
    flex: 0.35,
    minWidth: 130,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => (
      <CustomChip
        rounded
        size='small'
        skin='light'
        color={colors[row.status]}
        label={row.status}
        sx={{ '&:not(:last-of-type)': { mr: 2 } }}
      />
    )
  },
  {
    flex: 0.25,
    field: 'priority',
    minWidth: 100,
    headerName: 'Priority',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.priority}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'startDate',
    headerName: 'Start Date',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.start_date}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'createdDate',
    headerName: 'End Date',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.end_date}</Typography>
  }
]

const HelpDeskTable = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [editValue, setEditValue] = useState<string>('')

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const router = useRouter()
  const dispatch = useAppDispatch()
  const ticketData = useAppSelector(getTicketData)

  // const isLoading = useAppSelector(getTicketLoading)

  const auth = useAuth()

  // ** Token
  const token = auth.token

  // const store = useSelector((state: RootState) => state.permissions)

  const userInfo = {
    url: '/ticket/helpdesk/all',
    token: token
  }

  const tdata = ticketData?.data

  console.log(tdata)

  useEffect(() => {
    dispatch(fetchAsyncTickets(userInfo))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  // const handleEditPermission = (name: string) => {
  //   setEditValue(name)
  //   setEditDialogOpen(true)
  // }
  const handleCellClick = (params: any) => {
    // Access the row data from params.row
    const rowData = params.row

    console.log(rowData)

    // Navigate to the desired page with the row data
    router.push(`tickets/help-desk/${rowData._id}`)
  }

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    setEditDialogOpen(false)
    e.preventDefault()
  }

  const columns: GridColDef[] = [
    ...defaultColumns

    // {
    //   flex: 0.15,
    //   minWidth: 115,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: ({ row }: CellType) => (
    //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //       <IconButton onClick={() => handleEditPermission(row.name)}>
    //         <Icon fontSize={20} icon='bx:edit' />
    //       </IconButton>
    //       <IconButton>
    //         <Icon fontSize={20} icon='bx:trash' />
    //       </IconButton>
    //     </Box>
    //   )
    // }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography sx={{ mb: 3, fontSize: '1.375rem', fontWeight: 700 }}>My Ticket</Typography>}
            subtitle={<Typography sx={{ color: 'text.secondary' }}>You have total 10 My Ticket List</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          {tdata === undefined ? (
            <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CircularProgress sx={{ mb: 4 }} />
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            <Card>
              <TableHeader value={value} handleFilter={handleFilter} />
              <DataGrid
                autoHeight
                getRowId={row => row._id}
                rows={tdata}
                columns={columns}
                disableRowSelectionOnClick
                onCellClick={handleCellClick}
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            </Card>
          )}
        </Grid>
      </Grid>
      <Dialog
        maxWidth='sm'
        fullWidth
        onClose={handleDialogToggle}
        open={editDialogOpen}
        sx={{
          '& .MuiDialogTitle-root + .MuiDialogContent-root': {
            pt: theme => `${theme.spacing(1.5)} !important`
          }
        }}
      >
        <DialogTitle sx={{ pt: 16, mx: 'auto', textAlign: 'center', fontSize: '1.625rem !important' }}>
          Edit Permission
        </DialogTitle>
        <DialogContent sx={{ pb: 16, px: 18 }}>
          <Typography sx={{ mb: 6, textAlign: 'center', color: 'text.secondary' }}>
            Edit permission as per your requirements.
          </Typography>
          <Alert severity='warning' sx={{ maxWidth: '500px' }} icon={false}>
            <AlertTitle>Warning!</AlertTitle>
            By editing the permission name, you might break the system permissions functionality. Please ensure you're
            absolutely certain before proceeding.
          </Alert>

          <Box component='form' sx={{ mt: 5 }} onSubmit={onSubmit}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
              <TextField
                fullWidth
                size='small'
                value={editValue}
                label='Permission Name'
                sx={{ mr: [0, 4], mb: [3, 0] }}
                placeholder='Enter Permission Name'
                onChange={e => setEditValue(e.target.value)}
              />

              <Button type='submit' variant='contained'>
                Update
              </Button>
            </FormGroup>
            <FormControlLabel control={<Checkbox />} label='Set as core permission' />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default HelpDeskTable
