/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useEffect, useCallback, useState, useMemo } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData } from 'src/store/apps/user'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { RolesType } from 'src/types/apps/userTypes'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import { useAuth } from 'src/hooks/useAuth'
import { fetchAsyncRoles, getRolesData } from 'src/store/apps/roles'

interface UserRoleType {
  [key: string]: { icon: string; color: ThemeColor }
}

interface UserRowColorType {
  [key: string]: ThemeColor
}

interface CellType {
  row: RolesType
}

interface Colors {
  [key: string]: ThemeColor
}

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'bx:mobile-alt', color: 'error' },
  author: { icon: 'bx:cog', color: 'warning' },
  maintainer: { icon: 'bx:pie-chart-alt', color: 'success' },
  editor: { icon: 'bx:edit', color: 'info' },
  subscriber: { icon: 'bx:user', color: 'primary' }
}

const userStatusObj: UserRowColorType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** renders client column
// const renderClient = (row: UsersType) => {
//   if (row.avatar.length) {
//     return <CustomAvatar src={row.avatar} sx={{ mr: 4, width: 30, height: 30 }} />
//   } else {
//     return (
//       <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 4, width: 30, height: 30, fontSize: '0.875rem' }}>
//         {getInitials(row.fullName ? row.fullName : 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }

const colors: Colors = {
  read: 'info',
  create: 'success',
  write: 'primary'
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    field: 'id',
    minWidth: 240,
    headerName: 'Role ID',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.id}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'role_name',
    headerName: 'Role Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.role_name}
        </Typography>
      )
    }
  },
  {
    flex: 0.35,
    minWidth: 280,
    field: 'assignedTo',
    headerName: 'Controls',
    renderCell: ({ row }: CellType) => {
      return row.permission.map((access: any, index: number) => (
        <CustomChip
          rounded
          size='small'
          key={index}
          skin='light'
          color={colors[access?.action]}
          label={access?.action?.replace('-', ' ')}
          sx={{ '&:not(:last-of-type)': { mr: 2 } }}
        />
      ))
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: () => (
      <IconButton>
        <Icon fontSize={20} icon='bx:trash' />
      </IconButton>
    )
  }
]

const UserList = () => {
  // ** State
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const auth = useAuth()
  const token = auth.token
  const fetchRolesData = useSelector(getRolesData)

  console.log(fetchRolesData)

  // useEffect(() => {
  //   dispatch(
  //     fetchData({
  //       role: '',
  //       q: value,
  //       status: '',
  //       currentPlan: plan
  //     })
  //   )
  // }, [dispatch, plan, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value)
  }, [])

  const url = '/access_controls'

  const userInfos = {
    url: url,
    token: token
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userInfo = useMemo(() => userInfos, [])

  useEffect(() => {
    dispatch(fetchAsyncRoles(userInfo))
      .unwrap()
      .then(originalPromiseResult => {
        console.log(originalPromiseResult)
      })
  }, [dispatch, userInfo])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
          <DataGrid
            autoHeight
            rows={fetchRolesData?.length > 0 && fetchRolesData ? fetchRolesData : []}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
