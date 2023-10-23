// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
// import Icon from 'src/@core/components/icon'

// ** Third Party
import { useDrop } from 'react-dnd'
import { toast } from 'react-hot-toast'

// ** Store & Actions
import {
  fetchAsynCompletedTasks,
  fetchAsyncOngoingTasks,
  fetchAsyncTasks,
  getCompletedTaskData,
  moveAsyncTasks
} from 'src/store/apps/tasks'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypedSelector'

// ** Custom Components Import
// import OptionsMenu from 'src/@core/components/option-menu'
import Task from './components/Task'

type TicketId = {
  title: string
}

type AssignTo = {
  email: string
}

interface DataType {
  id: string
  ticket_id: TicketId
  milestone: string
  task_name: string
  assign_to: AssignTo
}

// const data: DataType[] = []

const CompletedTask = () => {
  // ** Hooks
  const auth = useAuth()
  const dispatch = useAppDispatch()
  const data = useAppSelector(getCompletedTaskData)

  const token = auth.token

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: string }) => addItemToSection(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addItemToSection = (id: string) => {
    const formData = {
      url: `/tasks/move/${id}`,
      token: token,
      status: 'COMPLETED'
    }

    console.log(formData)

    dispatch(moveAsyncTasks(formData))
      .unwrap()
      .then(originalPromiseResult => {
        originalPromiseResult.status === 'COMPLETED'
          ? toast.success('Progress Status Updated')
          : toast.error('Fail to update')
        const info = {
          url: `/tasks/todo`,
          token: token
        }

        const done = {
          url: `/tasks/complete`,
          token: token
        }
        const ongoing = {
          url: `/tasks/ongoing`,
          token: token
        }
        dispatch(fetchAsyncOngoingTasks(ongoing))
        dispatch(fetchAsyncTasks(info))
        dispatch(fetchAsynCompletedTasks(done))
      })
      .catch(rejectedValueorSerializedError => {
        {
          rejectedValueorSerializedError && toast.error(rejectedValueorSerializedError.message)
        }
      })
  }

  return (
    <div ref={drop} style={isOver ? { backgroundColor: 'red' } : {}}>
      <Card>
        <CardHeader
          sx={{ pb: 2.5 }}
          title='Done'
          subheader='Here are task completed'
          subheaderTypographyProps={{ sx: { color: 'text.disabled' } }}

          // action={<OptionsMenu iconButtonProps={{ size: 'small' }} options={['Share', 'Refresh', 'Edit']} />}
        />
        <CardContent sx={{ mt: 3 }}>
          {data &&
            data?.length > 0 &&
            data.map((item: DataType, index: number) => {
              return <Task key={item.id} item={item} data={data} index={index} />
            })}
        </CardContent>
      </Card>
    </div>
  )
}

export default CompletedTask
