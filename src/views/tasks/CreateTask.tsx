import React, { Dispatch, FC, RefAttributes, SetStateAction, forwardRef } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { CardContent } from '@mui/material'
import Select from '@mui/material/Select'
import CardActions from '@mui/material/CardActions'

// ** Third
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'

// ** Store & Actions
import { getTicketAllData } from 'src/store/apps/tickets'
import { getAllUsers } from 'src/store/apps/user'
import { fetchAsyncTasks, postAsyncTask } from 'src/store/apps/tasks'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypedSelector'

// import { HTTP_STATUS } from 'src/constants'

// ** Components
import SidebarDrawer from 'src/pages/components/drawer/SidebarDrawer'

const CustomInput: React.ForwardRefExoticComponent<RefAttributes<any>> | any = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' />
})

interface ICreateTaskDrawerProps {
  id: string | string[]
  taskOpen: boolean
  setTaskOpen: Dispatch<SetStateAction<boolean>>
  toggleTaskDrawer: () => void
}

interface ITaskProps {
  name: string
  milestone: string
  project: string
  assign: string
  sdate: any
  edate: any
  priority: string
}

const defaultValues: ITaskProps = {
  name: '',
  milestone: '',
  project: '',
  assign: '',
  sdate: '',
  edate: '',
  priority: ''
}

const CreateTaskDrawer: FC<ICreateTaskDrawerProps> = ({ taskOpen, setTaskOpen, toggleTaskDrawer }) => {
  const { control, reset, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues
  })

  // ** Hooks
  const auth = useAuth()
  const dispatch = useAppDispatch()
  const token = auth.token

  const fetchAllUsers = useAppSelector(getAllUsers)
  const fetchAllTicketsData = useAppSelector(getTicketAllData)
  console.log(fetchAllTicketsData)
  const onSubmit = (data: ITaskProps) => {
    // setEditDialogOpen(false)
    // console.log(data, id)
    // setTaskOpen(false)

    const formData = {
      token: token,
      url: '/tasks',
      task_name: data.name,
      milestone: data.milestone,
      assign_to: data.assign,
      start_dat: data.sdate,
      end_date: data.edate,
      priority: data.priority,
      ticket_id: data.project
    }
    console.log(formData)

    const userInfo = {
      url: `/tasks/todo`,
      token: token
    }

    dispatch(postAsyncTask(formData))
      .unwrap()
      .then(originalPromiseResult => {
        console.log(originalPromiseResult)
        toast.success(originalPromiseResult.message)

        dispatch(fetchAsyncTasks(userInfo))
        setTaskOpen(false)
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
    <SidebarDrawer title='Create Task' open={taskOpen} toggle={toggleTaskDrawer}>
      <DatePickerWrapper>
        <Grid item xs={12}>
          {/* i can still divide the form into a seperate component */}
          {/* <FormLayoutsSeparator /> */}
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                    Task Name
                  </InputLabel>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField fullWidth autoFocus value={value} onBlur={onBlur} onChange={onChange} placeholder='' />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                    Project
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
                          label='Who'
                          placeholder='Select'
                          id='form-layouts-separator-select'
                          labelId='form-layouts-separator-select-label'
                          onChange={onChange}
                          value={value}
                        >
                          {fetchAllTicketsData &&
                            fetchAllTicketsData.length > 0 &&
                            fetchAllTicketsData?.map(tick => (
                              <MenuItem key={tick.id} value={tick.id}>
                                {tick.title}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
                {/*  */}
                <Grid item xs={12} sm={12}>
                  <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                    Milestone
                  </InputLabel>
                  <Controller
                    name='milestone'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        minRows={3}
                        sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                    Assign to
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
                <Grid item xs={12}>
                  <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                    Start Date{' '}
                  </InputLabel>
                  <Controller
                    name='sdate'
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
                <Grid item xs={12}>
                  <InputLabel id='form-layouts-separator-select-label' sx={{ mb: 3 }}>
                    End Date{' '}
                  </InputLabel>
                  <Controller
                    name='edate'
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
                <Grid item xs={12}>
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
              </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                {/* {loading === HTTP_STATUS.PENDING ? <ThreeDots width={40} className='loading-circle' /> : 'Submit'} */}
                Submit
              </Button>
            </CardActions>
          </form>
        </Grid>
      </DatePickerWrapper>
    </SidebarDrawer>
  )
}

export default CreateTaskDrawer
