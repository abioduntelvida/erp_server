// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import CircularProgress from '@mui/material/CircularProgress'
import { IconButton } from '@mui/material'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// import TableHeader from 'src/views/apps/permissions/TableHeader'

// ** Third
import moment from 'moment'

// ** Types
import { ProjectRowType } from 'src/types/apps/ticketTypes'
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypedSelector'

// import { MyData } from 'src/store/apps/project-ticket'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { Icon } from '@iconify/react'

// ** Constants
import { HTTP_STATUS } from 'src/constants'

// ** Component
import DeleteDialog from 'src/views/projects/DeleteDialog'
import UpdateProjectDrawer from 'src/views/projects/UpdateProjectDrawer'
import { fetchAsyncPausedTasks, getPausedTaskData, getTaskLoading } from 'src/store/apps/tasks'

interface CellType {
  row: ProjectRowType
}

const formatDate = (dateString: string): string => {
  const formattedDate: string = moment(dateString).format('MM/DD/YY')

  return formattedDate
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.45,
    field: 'id',
    minWidth: 140,
    headerName: 'ID',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.id}</Typography>
  },
  {
    flex: 0.45,
    field: 'customer_name',
    minWidth: 140,
    headerName: 'Customer Name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.customer_name}</Typography>
  },
  {
    flex: 0.25,
    field: 'Start Date',
    minWidth: 240,
    headerName: 'Project Date',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{formatDate(row.po_award_date)}</Typography>
    )
  },
  {
    flex: 0.25,
    field: 'End Date',
    minWidth: 240,
    headerName: 'Site Survey',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.site_survey}</Typography>
  }
]

const ProejecTable = () => {
  // ** State
  // const [value, setValue] = useState<string>('')
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [updateProjectOpen, setUpdateProjectOpen] = useState<boolean>(false)

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useAppDispatch()
  const fetchPausedTaskData = useAppSelector(getPausedTaskData)
  const loadingTask = useAppSelector(getTaskLoading)

  // const isLoading = useAppSelector(getTicketLoading)
  const auth = useAuth()

  // ** Token
  const token = auth.token

  const toggleUpdateUserDrawer = () => setUpdateProjectOpen(!updateProjectOpen)
  const handleClickOpenDialog = () => setOpenDialog(!openDialog)

  const userInfo = {
    url: '/tasks/pause',
    token: token
  }

  useEffect(() => {
    dispatch(fetchAsyncPausedTasks(userInfo))
      .unwrap()
      .then(originalPromiseResult => {
        console.log(originalPromiseResult)
      })
      .catch(rejectedValueorSerializedError => {
        {
          rejectedValueorSerializedError
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleFilter = useCallback((val: string) => {
  //   setValue(val)
  // }, [])

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 115,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleUpdateUserDrawer}>
            <Icon fontSize={20} icon='bx:edit' />
          </IconButton>
          <IconButton
            onClick={e => {
              e.preventDefault()
              handleClickOpenDialog()
            }}
          >
            <Icon fontSize={20} icon='bx:trash' />
          </IconButton>
          <DeleteDialog id={row.id} openDialog={openDialog} setOpenDialog={setOpenDialog} />
          <UpdateProjectDrawer
            id={row.id}
            updateProjectOpen={updateProjectOpen}
            setUpdateProjectOpen={setUpdateProjectOpen}
            toggleUpdateUserDrawer={toggleUpdateUserDrawer}
          />
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography sx={{ mb: 3, fontSize: '1.375rem', fontWeight: 700 }}>Pause task</Typography>}
            subtitle={<Typography sx={{ color: 'text.secondary' }}>You have total 10 Pause Task</Typography>}
          />
        </Grid>

        <Grid item xs={12}>
          {loadingTask === HTTP_STATUS.PENDING ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Card>
              {/* <TableHeader value={value} handleFilter={handleFilter} /> */}
              {fetchPausedTaskData && fetchPausedTaskData.length > 0 ? (
                <DataGrid
                  autoHeight
                  getRowId={row => row.id}
                  rows={fetchPausedTaskData}
                  columns={columns}
                  disableRowSelectionOnClick
                  pageSizeOptions={[10, 25, 50]}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                />
              ) : (
                <Typography sx={{ mb: 3, fontSize: '1.375rem', fontWeight: 700 }}>No Paused Task</Typography>
              )}
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default ProejecTable
