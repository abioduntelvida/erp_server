// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Import
import OptionsMenu from 'src/@core/components/option-menu'

// ** Store and Actions
import { useAppSelector } from 'src/hooks/useTypedSelector'
import { getTaskData } from 'src/store/apps/tasks'
import Task from './components/Task'

type AssignTo = {
  email: string
}
type TicketId = {
  assign_to: AssignTo
  title: string
}

interface DataType {
  id: string
  ticket_id: TicketId
  milestone: string
  task_name: string
  assign_to: AssignTo
}

const TodoTask = () => {
  const data = useAppSelector(getTaskData)

  return (
    <Card>
      <CardHeader
        sx={{ pb: 2.5 }}
        title='Todo'
        subheader='Here are the list of todo task'
        subheaderTypographyProps={{ sx: { color: 'text.disabled' } }}
        action={<OptionsMenu iconButtonProps={{ size: 'small' }} options={['Reject all task']} />}
      />
      <CardContent sx={{ mt: 3 }}>
        {data &&
          data?.length > 0 &&
          data?.map((item: DataType, index: number) => {
            return <Task key={item.id} item={item} data={data} index={index} />
          })}
      </CardContent>
    </Card>
  )
}

export default TodoTask
