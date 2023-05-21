// ** React Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypedSelector'

// ** Hooks
import { toast } from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import { getSupportLoading, postAsyncSupportTicket } from 'src/store/apps/support-ticket'
import { HTTP_STATUS } from 'src/constants'
import { ThreeDots } from 'react-loading-icons'

const defaultValues = {
  title: '',
  name: '',
  email: '',
  phone: '',
  assignee: [],
  priority: '',
  overview: ''
}

const names = ['Senetor', 'Chidozie', 'Olamide', 'Steve', 'Abiodun', 'Ayo', 'Zaniab']

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

const FormLayoutsSeparator = () => {
  const { control, reset, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  // ** Hooks
  const auth = useAuth()
  const dispatch = useAppDispatch()

  // ** Token
  const token = auth.token
  const loading = useAppSelector(getSupportLoading)

  const onSubmit = (data: any) => {
    const url = '/ticket/support/create'

    const formData = {
      url: url,
      token: token,
      title: data.title,
      support_staff: data.assignee,
      priority: data.priority,
      client_name: data.name,
      client_email: data.email,
      client_number: data.phone
    }

    dispatch(postAsyncSupportTicket(formData))
      .unwrap()
      .then(originalPromiseResult => {
        console.log(originalPromiseResult)
        toast.success(originalPromiseResult.message)
        reset()
      })
      .catch(rejectedValueorSerializedError => {
        {
          rejectedValueorSerializedError && toast.error(rejectedValueorSerializedError.message)
          reset()
        }
      })
  }

  return (
    <Card>
      <CardHeader title='Support Ticket  Dashboard/Support Ticket' />
      <Divider sx={{ m: '0 !important' }} />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Subject
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Title
              </InputLabel>
              <Controller
                name='title'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField fullWidth placeholder='' value={value} onBlur={onBlur} onChange={onChange} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Reporter’s Name
              </InputLabel>
              <Controller
                name='name'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField fullWidth placeholder='' value={value} onBlur={onBlur} onChange={onChange} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Reporter’s Email
              </InputLabel>
              <Controller
                name='email'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField type='email' fullWidth placeholder='' value={value} onBlur={onBlur} onChange={onChange} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Reporter’s Phone Number
              </InputLabel>
              <Controller
                name='phone'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField fullWidth placeholder='' value={value} onBlur={onBlur} onChange={onChange} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Who is Responsible?
              </InputLabel>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                  Select
                </InputLabel>
                <Controller
                  name='assignee'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      multiple
                      label='Chip'
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Priority{' '}
              </InputLabel>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                  Select{' '}
                </InputLabel>
                <Controller
                  name='priority'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label='Priority'
                      placeholder='Select'
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      onChange={onChange}
                      value={value}
                    >
                      <MenuItem value='low'>LOW</MenuItem>
                      <MenuItem value='medium'>MEDIUM</MenuItem>
                      <MenuItem value='high'>HIGH</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Overview
              </InputLabel>
              <Controller
                name='overview'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            {loading === HTTP_STATUS.PENDING ? <ThreeDots width={40} className='loading-circle' /> : 'Submit'}
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

const SupportTicket = () => {
  return (
    <DatePickerWrapper>
      <Grid item xs={12}>
        <FormLayoutsSeparator />
      </Grid>
    </DatePickerWrapper>
  )
}

export default SupportTicket
