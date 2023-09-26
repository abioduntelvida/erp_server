import React, { Dispatch, FC, RefAttributes, SetStateAction, forwardRef } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
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

// ** Types
// import { useAppDispatch, useAppSelector } from 'src/hooks/useTypedSelector'
// import { MyData } from 'src/store/apps/project-ticket'

// ** Hooks
// import { useAuth } from 'src/hooks/useAuth'
import SidebarDrawer from 'src/pages/components/drawer/SidebarDrawer'

// import { HTTP_STATUS } from 'src/constants'

const CustomInput: React.ForwardRefExoticComponent<RefAttributes<any>> | any = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' />
})

interface IUpdateProjectProps {
  id: number
  updateProjectOpen: boolean
  
  // token: string
  setUpdateProjectOpen: Dispatch<SetStateAction<boolean>>
  toggleUpdateUserDrawer: () => void
}

const UpdateProjectDrawer: FC<IUpdateProjectProps> = ({
  id,
  updateProjectOpen,
  setUpdateProjectOpen,
  toggleUpdateUserDrawer
}) => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange'
  })

  const onSubmit = (data: any) => {
    // setEditDialogOpen(false)
    console.log(data, id)
    setUpdateProjectOpen(false)
  }

  return (
    <SidebarDrawer title='Update Project' open={updateProjectOpen} toggle={toggleUpdateUserDrawer}>
      <DatePickerWrapper>
        <Grid item xs={12}>
          {/* i can still divide the form into a seperate component */}
          {/* <FormLayoutsSeparator /> */}
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
              </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                {/* {loading === HTTP_STATUS.PENDING ? <ThreeDots width={40} className='loading-circle' /> : 'Submit'} */}
                Update
              </Button>
            </CardActions>
          </form>
        </Grid>
      </DatePickerWrapper>
    </SidebarDrawer>
  )
}

export default UpdateProjectDrawer
