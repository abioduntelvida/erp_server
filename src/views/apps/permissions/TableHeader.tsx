// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { fetchAsyncPermissions, getPermissionsLoading, postAsyncPermissions } from 'src/store/apps/permissions'
import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { useAppSelector } from 'src/hooks/useTypedSelector'
import { HTTP_STATUS } from 'src/constants'
import { ThreeDots } from 'react-loading-icons'

interface TableHeaderProps {
  value: string
  isModal?: boolean
  handleFilter: (val: string) => void
}

const defaultValues = {
  name: '',
  description: ''
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, isModal, handleFilter } = props

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useAppSelector(getPermissionsLoading)

  const token = auth.token
  const handleDialogToggle = () => setOpen(!open)

  const { control, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit = (data: any) => {
    const url = '/permission'

    const formData = {
      url: url,
      token: token,
      permission: data.name,
      permission_description: data.description
    }

    dispatch(postAsyncPermissions(formData))
      .unwrap()
      .then(originalPromiseResult => {
        toast.success(originalPromiseResult.message)
        setOpen(false)
        const userInfo = {
          url: '/permission/20/2',
          token: token
        }
        dispatch(fetchAsyncPermissions(userInfo))
      })
      .catch(rejectedValueorSerializedError => {
        {
          rejectedValueorSerializedError && toast.error(rejectedValueorSerializedError.message)
          setOpen(false)
        }
      })
  }

  return (
    <>
      <Box
        sx={{
          p: 5,
          pb: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'flex-end' }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ mr: 2, color: 'text.secondary' }}>Search</Typography>
          <TextField
            size='small'
            value={value}
            sx={{ mr: 4, mb: 2 }}
            placeholder='Search Ticket'
            onChange={e => handleFilter(e.target.value)}
          />
        </Box>
        {isModal ? (
          <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
            Create Permission
          </Button>
        ) : (
          <>
            <Link href='/tickets/create-ticket/'>
              <Button sx={{ mb: 2 }} variant='contained'>
                Create Ticket
              </Button>
            </Link>
          </>
        )}
      </Box>
      <Dialog
        fullWidth
        maxWidth='sm'
        onClose={handleDialogToggle}
        open={open}
        sx={{
          '& .MuiDialogTitle-root + .MuiDialogContent-root': {
            pt: theme => `${theme.spacing(4)} !important`
          }
        }}
      >
        <DialogTitle sx={{ pt: 16, mx: 'auto', textAlign: 'center', fontSize: '1.625rem !important' }}>
          Add New Permission
        </DialogTitle>
        <DialogContent sx={{ pb: 18, px: 18 }}>
          <Typography sx={{ color: 'text.secondary' }}>Permissions you may use and assign to your users.</Typography>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                mt: 7,
                mx: 'auto',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Controller
                name='name'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    fullWidth
                    sx={{ mb: 4 }}
                    label='Permission Name'
                    placeholder='Enter Permission Name'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
              <Box sx={{ width: '100%', display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} label='Set as core permission' />
              </Box>
              <Controller
                name='description'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    fullWidth
                    sx={{ mb: 4 }}
                    label='Permission Description'
                    placeholder='Enter Permission Name'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
              <Box className='demo-space-x' sx={{ '& > :last-child': { mr: '0 !important' } }}>
                <Button size='large' type='submit' variant='contained' sx={{ mr: 5 }}>
                  {loading === HTTP_STATUS.PENDING ? (
                    <ThreeDots width={40} className='loading-circle' />
                  ) : (
                    'Create Permission'
                  )}
                </Button>
                <Button type='reset' size='large' variant='outlined' color='secondary' onClick={handleDialogToggle}>
                  Discard
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableHeader
