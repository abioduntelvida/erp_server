// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import { useTheme } from '@mui/material/styles'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppSelector } from 'src/hooks/useTypedSelector'
import { getPermissionsData } from 'src/store/apps/permissions'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { postAsyncRoles } from 'src/store/apps/roles'

interface CardDataType {
  title: string
  totalUsers: number
  avatars: { src: string; name: string }[]
}

const cardData: CardDataType[] = [
  {
    totalUsers: 4,
    title: 'Administrator',
    avatars: [
      { src: '1.png', name: 'Vinnie Mostowy' },
      { src: '2.png', name: 'Allen Rieske' },
      { src: '3.png', name: 'Julee Rossignol' },
      { src: '4.png', name: "Kaith D'souza" }
    ]
  },
  {
    totalUsers: 7,
    title: 'Manager',
    avatars: [
      { src: '5.png', name: 'John Doe' },
      { src: '6.png', name: 'Jimmy Ressula' },
      { src: '7.png', name: 'Kristi Lawker' },
      { src: '8.png', name: "Kaith D'souza" },
      { src: '1.png', name: 'Danny Paul' },
      { src: '2.png', name: 'Andrew Tye' },
      { src: '3.png', name: 'Rishi Swaat' }
    ]
  },
  {
    totalUsers: 5,
    title: 'Users',
    avatars: [
      { src: '4.png', name: 'Rossie Kim' },
      { src: '5.png', name: 'Kim Merchent' },
      { src: '6.png', name: "Sam D'souza" },
      { src: '7.png', name: 'Kim Karlos' },
      { src: '8.png', name: 'Peter Adward' }
    ]
  },
  {
    totalUsers: 3,
    title: 'Support',
    avatars: [
      { src: '1.png', name: "Kaith D'souza" },
      { src: '2.png', name: 'John Parker' },
      { src: '3.png', name: 'Kim Merchent' }
    ]
  },
  {
    totalUsers: 2,
    title: 'Restricted User',
    avatars: [
      { src: '4.png', name: 'Nurvi Karlos' },
      { src: '5.png', name: 'Rossie Kim' }
    ]
  }
]

const rolesArr: string[] = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const defaultValues = {
  name: '',
  description: ''
}

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)

  const { control, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  // ** Hook
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const auth = useAuth()
  const token = auth.token

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
  }

  const permissionsData = useAppSelector(getPermissionsData)
  console.log(permissionsData)

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const formattedData = selectedCheckbox.map(id => {
    const [resource, action] = id.split('-')

    return { resource, action }
  })

  console.log(formattedData)

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      rolesArr.forEach(row => {
        const id = row.toLowerCase().split(' ').join('-')
        togglePermission(`${id}-read`)
        togglePermission(`${id}-write`)
        togglePermission(`${id}-create`)
      })
    }
  }

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  const onSubmit = (data: any) => {
    console.log(data)

    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)

    const url = '/access_controls'

    const formData = {
      url: url,
      token: token,
      role_name: data.name,
      permission: formattedData
    }

    console.log(formData)

    dispatch(postAsyncRoles(formData))
      .unwrap()
      .then(() => {
        // toast.success(originalPromiseResult.message)
        setOpen(false)
      })
      .catch(rejectedValueorSerializedError => {
        {
          rejectedValueorSerializedError && toast.error(rejectedValueorSerializedError.message)
          setOpen(false)
        }
      })
  }

  console.log(selectedCheckbox)

  const renderCards = () =>
    cardData.map((item, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent sx={{ p: `${theme.spacing(5)} !important` }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'text.secondary' }}>{`Total ${item.totalUsers} users`}</Typography>
              <AvatarGroup
                max={4}
                className='pull-up'
                sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.875rem' } }}
              >
                {item.avatars.map((item, index: number) => (
                  <Tooltip key={index} title={item.name}>
                    <Avatar key={index} alt={item.name} src={`/images/avatars/${item.src}`} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h5' sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography
                  href='/'
                  variant='body2'
                  component={Link}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                  onClick={e => {
                    e.preventDefault()
                    handleClickOpen()
                    setDialogTitle('Edit')
                  }}
                >
                  Edit Role
                </Typography>
              </Box>
              <IconButton sx={{ color: 'text.primary' }}>
                <Icon fontSize={20} icon='bx:copy' />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={4}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img
                  width={88}
                  height={105}
                  alt='add-role'
                  src={`/images/pages/add-role-illustration-${theme.palette.mode}.png`}
                />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add Role
                  </Button>
                  <Typography>Add role, if it doesn't exist.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span'>
            {`${dialogTitle} Role`}
          </Typography>
          <Typography variant='body2'>Set Role Permissions</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label='Role Name'
                      placeholder='Enter Role Name'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      sx={{ mb: 4 }}
                    />
                  )}
                />

                {/* <Controller
                  name='description'
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label='Role Description'
                      placeholder='Enter Role Description'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  )}
                /> */}
              </FormControl>
            </Box>
            <Typography variant='h6'>Role Permissions</Typography>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: '0 !important' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                          '& svg': { ml: 1, cursor: 'pointer' }
                        }}
                      >
                        Administrator Access
                        <Tooltip placement='top' title='Allows a full access to the system'>
                          <Box sx={{ ml: 1, display: 'flex', color: 'text.secondary' }}>
                            <Icon icon='bx:info-circle' fontSize='1rem' />
                          </Box>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControlLabel
                        label='Select All'
                        sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                        control={
                          <Checkbox
                            onChange={handleSelectAllCheckbox}
                            indeterminate={isIndeterminateCheckbox}
                            checked={selectedCheckbox.length === rolesArr.length * 3}
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissionsData &&
                    permissionsData?.length > 0 &&
                    permissionsData?.map((permissions, index: number) => {
                      const id = permissions?.resource || 'none'.toLowerCase().split(' ').join('-') || 'none'
                      console.log(permissions?.resource || 'none')

                      return (
                        <>
                          <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                color: `${theme.palette.text.primary} !important`
                              }}
                            >
                              {permissions?.resource || 'none'}
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                label='Read'
                                sx={{ my: -1 }}
                                control={
                                  <Checkbox
                                    id={`${id}-read`}
                                    onChange={() => togglePermission(`${id}-read`)}
                                    checked={selectedCheckbox.includes(`${id}-read`)}
                                  />
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                label='Write'
                                sx={{ my: -1 }}
                                control={
                                  <Checkbox
                                    id={`${id}-write`}
                                    onChange={() => togglePermission(`${id}-write`)}
                                    checked={selectedCheckbox.includes(`${id}-write`)}
                                  />
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                label='Create'
                                sx={{ my: -1 }}
                                control={
                                  <Checkbox
                                    id={`${id}-create`}
                                    onChange={() => togglePermission(`${id}-create`)}
                                    checked={selectedCheckbox.includes(`${id}-create`)}
                                  />
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <DialogActions
              sx={{
                display: 'flex',
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Box className='demo-space-x'>
                <Button size='large' type='submit' variant='contained' onClick={handleClose}>
                  Submit
                </Button>
                <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default RolesCards
