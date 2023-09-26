// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Icon Imports

// ** Store & Actions Imports
import { useDispatch } from 'react-redux'
import { fetchAsynCompletedTasks, fetchAsyncOngoingTasks, fetchAsyncTasks, getTaskData } from 'src/store/apps/tasks'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Utils Import

// ** Custom Components Imports

import TableHeader from 'src/views/apps/invoice/list/TableHeader'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CreateTaskDrawer from 'src/views/tasks/CreateTask'
import { useAppSelector } from 'src/hooks/useTypedSelector'
import TodoTask from 'src/views/dashboards/analytics/TodoTask'
import ProgressTask from 'src/views/dashboards/analytics/ProgressTask'
import CompletedTask from 'src/views/dashboards/analytics/CompletedTask'
import { fetchAsyncTicketsAll } from 'src/store/apps/tickets'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const OpenTask = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [taskOpen, setTaskOpen] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const fetchTaskData = useAppSelector(getTaskData)

  console.log(fetchTaskData)

  // console.log(fetchAllTicketsData)
  const router = useRouter()
  const auth = useAuth()

  // ** Token
  const token = auth.token

  const userId = router.query.openTaskId || ''

  // const store = useSelector((state: RootState) => state.invoice)

  // ** Func
  const toggleTaskDrawer = () => setTaskOpen(!taskOpen)

  useEffect(() => {
    const info = {
      url: `/tasks/todo`,
      token: token
    }
    dispatch(fetchAsyncTasks(info))
      .unwrap()
      .then(originalPromiseResult => {
        console.log(originalPromiseResult)
      })
      .catch(rejectedValueorSerializedError => {
        {
          rejectedValueorSerializedError
        }
      })

    const ongoing = {
      url: `/tasks/ongoing`,
      token: token
    }
    dispatch(fetchAsyncOngoingTasks(ongoing))
    const done = {
      url: `/tasks/complete`,
      token: token
    }
    dispatch(fetchAsynCompletedTasks(done))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const userInfo = {
      url: '/tickets/all',
      token: token
    }

    dispatch(fetchAsyncTicketsAll(userInfo))
      .unwrap()
      .then(originalPromiseResult => {
        console.log(originalPromiseResult)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} toggleTaskDrawer={toggleTaskDrawer} />
            <CreateTaskDrawer
              id={userId}
              taskOpen={taskOpen}
              setTaskOpen={setTaskOpen}
              toggleTaskDrawer={toggleTaskDrawer}
            />

            <Grid container spacing={6} pb={5} px={5}>
              <Grid item xs={12} sm={6} md={4}>
                <TodoTask />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ProgressTask />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CompletedTask />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default OpenTask
