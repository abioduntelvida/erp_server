// ** React Imports
import { RefAttributes, forwardRef } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
// import * as yup from 'yup'
import DatePicker from 'react-datepicker'

// import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { ThreeDots } from 'react-loading-icons'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
// import { addUser } from 'src/store/apps/users'

// ** Types Imports
// import { RootState, AppDispatch } from 'src/store'
// import { UsersType } from 'src/types/apps/userTypes'
import { useAuth } from 'src/hooks/useAuth'
import { getUserLoading, postAsyncUser } from 'src/store/apps/user'
import { toast } from 'react-hot-toast'

// import { Grid } from '@mui/material'

// ** Hooks
import { useAppSelector } from 'src/hooks/useTypedSelector'
import { HTTP_STATUS } from 'src/constants'
import { AppDispatch } from 'src/store'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  first_name: string
  last_name: string
  dob: any
  email: string
  company: string
  password: string
  confirm: string
  role: string
  permission: string[]
}

// const showErrors = (field: string, valueLen: number, min: number) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
//   }
// }

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

// const schema = yup.object().shape({
//   email: yup.string().email().required(),
//   firstName: yup
//     .string()
//     .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
//     .required(),
//   lastName: yup
//     .string()
//     .min(3, obj => showErrors('LastName Name', obj.value.length, obj.min))
//     .required(),
//   password: yup
//     .string()
//     .min(4, obj => showErrors('Password', obj.value.length, obj.min))
//     .required(),
//   confirm: yup
//     .string()
//     .min(4, obj => showErrors('Confirm', obj.value.length, obj.min))
//     .required(),
//   company: yup
//     .string()
//     .min(3, obj => showErrors('Company', obj.value.length, obj.min))
//     .required()
// })

const CustomInput: React.ForwardRefExoticComponent<RefAttributes<any>> | any = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const defaultValues: UserData = {
  first_name: '',
  last_name: '',
  dob: '',
  email: '',
  password: '',
  confirm: '',
  company: '',
  role: '',
  permission: []
}

const names = [
  'create-task',
  'update-task',
  'update-ticket',
  'create-ticket',
  'update_project',
  'create_project',
  'delete-project'
]

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State

  // ** Hooks
  const auth = useAuth()
  const dispatch = useDispatch<AppDispatch>()

  const loading = useAppSelector(getUserLoading)

  const token = auth.token

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange'

    // resolver: yupResolver(schema)
  })

  const onSubmit = (data: UserData) => {
    console.log(data)

    const url = '/user/signup'

    const formData = {
      url: url,
      token: token,
      last_name: data.last_name,
      first_name: data.first_name,
      date_of_birth: data.dob,
      email: data.email,
      mobile_number: '09012345678',
      password: data.password,
      password_confirmation: data.confirm,
      company: data.company,
      role: data.role,
      permission: data.permission
    }

    dispatch(postAsyncUser(formData))
      .unwrap()
      .then(originalPromiseResult => {
        console.log(originalPromiseResult)
        originalPromiseResult.message && toast.success('User Created Successfully')

        // reset()
      })
      .catch(rejectedValueorSerializedError => {
        {
          rejectedValueorSerializedError && toast.error(rejectedValueorSerializedError.message)

          // reset()
        }
      })

    // if (store.allData.some((u: UsersType) => u.email === data.email || u.username === data.username)) {
    //   store.allData.forEach((u: UsersType) => {
    //     if (u.email === data.email) {
    //       setError('email', {
    //         message: 'Email already exists!'
    //       })
    //     }
    //     if (u.username === data.username) {
    //       setError('username', {
    //         message: 'Username already exists!'
    //       })
    //     }
    //   })
    // } else {
    //   dispatch(addUser({ ...data, role, currentPlan: plan }))
    //   toggle()
    //   reset()
    // }
  }

  const handleClose = () => {
    // setValue('contact', Number(''))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </Header>
      <DatePickerWrapper>
        <Box sx={{ p: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='first_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='First Name'
                    onChange={onChange}
                    placeholder='John Doe'
                    error={Boolean(errors.first_name)}
                  />
                )}
              />
              {errors.first_name && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.first_name.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='last_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Last Name'
                    onChange={onChange}
                    placeholder='John Doe'
                    error={Boolean(errors.last_name)}
                  />
                )}
              />
              {errors.last_name && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.last_name.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='email'
                    value={value}
                    label='Email'
                    onChange={onChange}
                    placeholder='johndoe@email.com'
                    error={Boolean(errors.email)}
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='company'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Company'
                    onChange={onChange}
                    placeholder='Telvida'
                    error={Boolean(errors.company)}
                  />
                )}
              />
              {errors.company && <FormHelperText sx={{ color: 'error.main' }}>{errors.company.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              {/* <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                  Start Date{' '}
                </InputLabel> */}
              <Controller
                name='dob'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    placeholderText='MM-DD-YYYY'
                    customInput={<CustomInput label='Pick Date' />}
                    id='form-layouts-separator-date'
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Password'
                    onChange={onChange}
                    placeholder='***************'
                    error={Boolean(errors.password)}
                  />
                )}
              />
              {errors.confirm && <FormHelperText sx={{ color: 'error.main' }}>{errors.confirm.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='confirm'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Confirm Password'
                    onChange={onChange}
                    placeholder='***************'
                    error={Boolean(errors.confirm)}
                  />
                )}
              />
              {errors.confirm && <FormHelperText sx={{ color: 'error.main' }}>{errors.confirm.message}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='role-select'>Select Role</InputLabel>
              <Controller
                name='role'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    fullWidth
                    value={value}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={onChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='author'>Author</MenuItem>
                    <MenuItem value='editor'>Editor</MenuItem>
                    <MenuItem value='maintainer'>Maintainer</MenuItem>
                    <MenuItem value='subscriber'>Subscriber</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Select
              </InputLabel>
              <Controller
                name='permission'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    multiple
                    label='Permission'
                    value={value}
                    MenuProps={MenuProps}
                    id='demo-multiple-chip'
                    onChange={onChange}
                    labelId='demo-multiple-chip-label'
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {(selected as unknown as string[]).map(value => (
                          <Chip key={value} label={value} sx={{ m: 0.75 }} />
                        ))}
                      </Box>
                    )}
                  >
                    {names.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                {loading === HTTP_STATUS.PENDING ? <ThreeDots width={40} className='loading-circle' /> : 'Submit'}
              </Button>
              <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </DatePickerWrapper>
    </Drawer>
  )
}

export default SidebarAddUser
