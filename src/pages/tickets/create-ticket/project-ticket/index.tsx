// ** React Imports
import React, { RefAttributes, forwardRef, useEffect } from 'react'

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

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Types
// import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Third Party Imports
import { toast } from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/hooks/useTypedSelector'
import { HTTP_STATUS } from 'src/constants'
import { ThreeDots } from 'react-loading-icons'
import { getProjectTicketLoading, postAsyncProjectTicket } from 'src/store/apps/project-ticket'
import { fetchAsyncProject, getProjectData } from 'src/store/apps/project'
import { getAllUsers } from 'src/store/apps/user'

const CustomInput: React.ForwardRefExoticComponent<RefAttributes<any>> | any = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' />
})

interface UserData {
  title: string
  email: string
  project: string
  assign: string
  priority: string
  incident: string
  startDate: any
  endDate: any
  overview: string
}

const defaultValues: UserData = {
  title: '',
  email: '',
  project: '',
  assign: '',
  priority: '',
  incident: '',
  startDate: '',
  endDate: '',
  overview: ''
}

const FormLayoutsSeparator = () => {
  // ** States
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  // ** Hooks
  const auth = useAuth()
  const dispatch = useDispatch<AppDispatch>()

  const loading = useAppSelector(getProjectTicketLoading)
  const fetchProjectData = useAppSelector(getProjectData)
  const fetchAllUsers = useAppSelector(getAllUsers)

  console.log(fetchProjectData)

  const token = auth.token

  const onSubmit = (data: UserData) => {
    const url = '/tickets'

    const formData = {
      url: url,
      token: token,
      title: data.title,
      incident_type: data.incident,
      email_address: data.email,
      assign_to: data.assign,
      start_date: data.startDate,
      ticket_type: 'project',
      end_date: data.endDate,
      priority: data.priority,
      project: data.project,
      overview: data.overview
    }

    console.log(formData)

    dispatch(postAsyncProjectTicket(formData))
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

  useEffect(() => {
    const userInfo = {
      url: '/projects/read',
      token: token
    }

    dispatch(fetchAsyncProject(userInfo))
      .unwrap()
      .then(originalPromiseResult => {
        console.log(originalPromiseResult)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardHeader title='Project Ticket  Dashboard/Project Ticket' />
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
                  <TextField fullWidth autoFocus value={value} onBlur={onBlur} onChange={onChange} placeholder='' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Who is Responsible?
              </InputLabel>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                  Select{' '}
                </InputLabel>
                <Controller
                  name='assign'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label='Who'
                      placeholder='Select'
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      onChange={onChange}
                      value={value}
                    >
                      {fetchAllUsers &&
                        fetchAllUsers.length > 0 &&
                        fetchAllUsers?.map(user => (
                          <MenuItem key={user.id} value={user.id}>
                            {user.email}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Email address
              </InputLabel>
              <Controller
                name='email'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField fullWidth value={value} onBlur={onBlur} onChange={onChange} placeholder='' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Incident Type{' '}
              </InputLabel>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                  Select{' '}
                </InputLabel>
                <Controller
                  name='incident'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label='Incident'
                      defaultValue=''
                      placeholder='Select'
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      onChange={onChange}
                      value={value}
                    >
                      <MenuItem value='support'>Basic Support</MenuItem>
                      <MenuItem value='projects'>Software Projects</MenuItem>
                      <MenuItem value='architecture'>Solution Architecture</MenuItem>
                      <MenuItem value='certification'>Certifications</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Start Date{' '}
              </InputLabel>
              <Controller
                name='startDate'
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                End Date{' '}
              </InputLabel>
              <Controller
                name='endDate'
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
            </Grid>
            {/*  */}
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Project{' '}
              </InputLabel>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                  Select{' '}
                </InputLabel>
                <Controller
                  name='project'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label='Project'
                      placeholder='Select'
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      onChange={onChange}
                      value={value}
                    >
                      {fetchProjectData &&
                        fetchProjectData.length > 0 &&
                        fetchProjectData?.map(project => (
                          <MenuItem key={project.id} value={project.id}>
                            {project.customer_name}
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

const ProjectTicket = () => {
  return (
    <DatePickerWrapper>
      <Grid item xs={12}>
        <FormLayoutsSeparator />
      </Grid>
    </DatePickerWrapper>
  )
}

export default ProjectTicket
