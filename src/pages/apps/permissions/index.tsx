// ** React Imports
import { useState, useEffect, useCallback, FormEvent, useMemo } from 'react'

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
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/apps/permissions/TableHeader'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { PermissionRowType } from 'src/types/apps/permissionTypes'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { fetchAsyncPermissions, getPermissionsData } from 'src/store/apps/permissions'
import DeleteDialog from 'src/views/permission/DeleteDialog'

interface CellType {
  row: PermissionRowType
}

const PermissionsTable = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [editValue, setEditValue] = useState<string>('')
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const auth = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const permissionsData = useSelector(getPermissionsData)
  console.log(permissionsData)
  const token = auth.token

  // ** Delete
  const handleClickOpenDialog = () => setOpenDialog(!openDialog)

  const defaultColumns: GridColDef[] = [
    {
      flex: 0.25,
      field: 'docs.id',
      minWidth: 240,
      headerName: 'Name',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.id}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 215,
      field: 'permission_description',
      headerName: 'Description',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.resource}</Typography>
    }

    // {
    //   flex: 0.15,
    //   minWidth: 115,
    //   sortable: false,
    //   field: 'id',
    //   headerName: 'Actions',
    //   renderCell: ({ row }) => (
    //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //       <IconButton
    //         onClick={e => {
    //           e.preventDefault()

    //           handleClickOpenDialog()
    //           console.log(row.id)
    //         }}
    //       >
    //         <Icon fontSize={20} icon='bx:trash' />
    //       </IconButton>
    //       <DeleteDialog id={row.id} openDialog={openDialog} setOpenDialog={setOpenDialog} />
    //     </Box>
    //   )
    // }
  ]

  // const handleDelete = (id: string) => {
  //   const userInfo = {
  //     url: '/permission/',
  //     token: token,
  //     id: id
  //   }

  //   const userInfos = {
  //     url: url,
  //     token: token
  //   }
  //   dispatch(deleteAsyncPermission(userInfo))
  //     .unwrap()
  //     .then(originalPromiseResult => {
  //       originalPromiseResult && toast.error('Permission deleted successfully')
  //       dispatch(fetchAsyncPermissions(userInfos))
  //     })
  // }

  const url = '/resources'

  const userInfos = {
    url: url,
    token: token
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userInfo = useMemo(() => userInfos, [])

  useEffect(() => {
    dispatch(fetchAsyncPermissions(userInfo))
      .unwrap()
      .then(originalPromiseResult => {
        console.log(originalPromiseResult)
      })
  }, [dispatch, userInfo])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  // const handleEditPermission = (name: string) => {
  //   setEditValue(name)
  //   setEditDialogOpen(true)
  // }

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    setEditDialogOpen(false)
    e.preventDefault()
  }

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
          <IconButton
            onClick={e => {
              e.preventDefault()
              handleClickOpenDialog()
            }}
          >
            <Icon fontSize={20} icon='bx:trash' />
          </IconButton>
          <DeleteDialog id={row.id} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography sx={{ mb: 5, fontSize: '1.375rem', fontWeight: 700 }}>Permissions List</Typography>}
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                Each category (Basic, Professional, and Business) includes the four predefined roles shown below.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} isModal />
            <DataGrid
              autoHeight
              getRowId={row => row.id}
              rows={permissionsData}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
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

export default PermissionsTable
