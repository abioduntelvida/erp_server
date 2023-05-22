// ** React Imports
import React, { RefAttributes, forwardRef } from 'react'

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

// ** Types

// ** Third Party Imports
// import moment from 'moment'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
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
import { getProjectLoading, postAsyncProject } from 'src/store/apps/project'

interface UserData {
  name: string
  a_date: any
  s_date: any
  e_date: any
  summary: string
  demo: string
  site: string
  solution: string
}

const CustomInput: React.ForwardRefExoticComponent<RefAttributes<any>> | any = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  // const dateString = '2023-05-21'
  // const dateObject = moment(dateString).toDate()

  const defaultValues: UserData = {
    name: '',
    a_date: '',
    s_date: '',
    e_date: '',
    summary: '',
    demo: '',
    site: '',
    solution: ''
  }

  // ** States
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  //
  const loading = useAppSelector(getProjectLoading)

  // ** Hooks
  const auth = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const token = auth.token

  const onSubmit = (data: UserData) => {
    const url = '/task/project/create'

    const formData = {
      url: url,
      token: token,
      customer_name: data.name,
      award_date: data.a_date,
      start_date: data.s_date,
      end_date: data.e_date,
      order_summary: data.summary,
      is_demo: data.demo,
      is_site_survey: data.site,
      is_solution_document: data.solution
    }

    dispatch(postAsyncProject(formData))
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
            <Grid item xs={12} sm={12}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Customer Name
              </InputLabel>
              <Controller
                name='name'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField fullWidth autoFocus value={value} onBlur={onBlur} onChange={onChange} placeholder='' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Assign Date{' '}
              </InputLabel>
              <Controller
                name='a_date'
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
                Start Date{' '}
              </InputLabel>
              <Controller
                name='s_date'
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
                name='e_date'
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
            <Grid item xs={12} sm={12}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Order Summary
              </InputLabel>
              <Controller
                name='summary'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    placeholder='order summary'
                    multiline
                    minRows={3}
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Was there a demo{' '}
              </InputLabel>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                  Select{' '}
                </InputLabel>
                <Controller
                  name='demo'
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
                      <MenuItem value='false'>No</MenuItem>
                      <MenuItem value='true'>Yes</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/*  */}
            <Grid item xs={12} sm={6}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Was there a site survey?{' '}
              </InputLabel>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                  Select{' '}
                </InputLabel>
                <Controller
                  name='site'
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
                      <MenuItem value='false'>No</MenuItem>
                      <MenuItem value='true'>Yes</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                Is there a solution document?{' '}
              </InputLabel>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                  Select{' '}
                </InputLabel>
                <Controller
                  name='solution'
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
                      <MenuItem value='false'>No</MenuItem>
                      <MenuItem value='true'>Yes</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
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

const ProjectForm = () => {
  return (
    <DatePickerWrapper>
      <Grid item xs={12}>
        <FormLayoutsSeparator />
      </Grid>
    </DatePickerWrapper>
  )
}

export default ProjectForm
