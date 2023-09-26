import React, { FC } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// import MoreVertIcon from '@mui/icons-material/MoreVert';
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party
import { useDrag } from 'react-dnd'
import { IconButton, Menu, MenuItem, Modal, Tooltip } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

// ** Stores and Actions
import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'
import { fetchAsyncTasks, requestAsyncTask } from 'src/store/apps/tasks'
import { toast } from 'react-hot-toast'

type TicketId = {
  title: string
}

type AssignTo = {
  email: string
}
type ItemData = {
  id: string
  ticket_id: TicketId
  milestone: string
  task_name: string
  assign_to: AssignTo
}

interface Item {
  item: ItemData
  data: ItemData[]
  index: number
}

function CustomModal({
  isOpen,
  onClose,
  option,
  id
}: {
  isOpen: boolean
  onClose: () => void
  option: string
  id: string
}) {
  const { control, handleSubmit } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const dispatch = useDispatch<AppDispatch>()

  const auth = useAuth()

  // ** Token
  const token = auth.token

  const onSubmit = (data: any) => {
    console.log(data, id, option)
    const pause = `/tasks/pause/${id}`
    const reject = `/tasks/reject/${id}`
    const url = option === 'Reject task' ? reject : pause

    if (option === 'Pause task') {
      const formData = {
        url: url,
        token: token,
        reason: data.name
      }

      dispatch(requestAsyncTask(formData))
        .unwrap()
        .then(res => {
          if (res.error) {
            toast.error('sorry you cannot pause a task not assigned to you')
            onClose()

            return
          }
          toast.success('Pause request sent!!!')
          onClose()
          const userInfo = {
            url: `/tasks/todo`,
            token: token
          }
          dispatch(fetchAsyncTasks(userInfo))
        })
        .catch(rejectedValueorSerializedError => {
          {
            rejectedValueorSerializedError && toast.error(rejectedValueorSerializedError.message)
          }
        })
    } else if (option === 'Reject task') {
      const formData = {
        url: url,
        token: token,
        rejection_reason: data.name
      }
      dispatch(requestAsyncTask(formData))
        .unwrap()
        .then(res => {
          if (res.error) {
            toast.error(res.error)
            onClose()

            return
          }
          toast.success('Rejected request sent!!!')
          onClose()
          const userInfo = {
            url: `/tasks/todo`,
            token: token
          }
          dispatch(fetchAsyncTasks(userInfo))
        })
        .catch(rejectedValueorSerializedError => {
          {
            rejectedValueorSerializedError && toast.error(rejectedValueorSerializedError.message)

            // setOpen(false)
          }
        })
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby='modal-title' aria-describedby='modal-description'>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography id='modal-title' variant='h6' mb={2} component='h2'>
          {option}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>Kindly state your reasons.</Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              mt: 4,
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
                  label='Reason'
                  placeholder={`Enter why you want to ${option}`}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />

            <Box className='demo-space-x' sx={{ '& > :last-child': { mr: '0 !important' } }}>
              <Button size='large' type='submit' variant='contained' sx={{ mr: 5 }}>
                Submit
              </Button>
              <Button type='reset' size='large' onClick={onClose} variant='outlined' color='secondary'>
                Discard
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

const options = ['Pause task', 'Reject task']

const ITEM_HEIGHT = 48

const defaultValues = {
  name: ''
}

const Task: FC<Item> = ({ item, data, index }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    handleClose() // Close the menu when an option is selected
  }

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'task',
      item: { id: item.id },
      collect: (monitor: { isDragging: () => any }) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  return (
    <Box
      ref={dragRef}
      key={item.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: index !== data.length - 1 ? 5.5 : undefined
      }}
      style={{ opacity }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={item?.assign_to?.email}>
            <Box sx={{ width: 30, height: 30, borderRadius: 100, backgroundColor: 'gray' }} mr={2}></Box>
          </Tooltip>
          <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 500 }}>{item.ticket_id?.title}</Typography>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              {item.task_name}
            </Typography>
          </Box>

          <Menu
            id='long-menu'
            MenuListProps={{
              'aria-labelledby': 'long-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch'
              }
            }}
          >
            {options.map(option => (
              <MenuItem key={option} selected={option === selectedOption} onClick={() => handleOptionClick(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
          {selectedOption && (
            <CustomModal
              isOpen={Boolean(selectedOption)}
              onClose={() => setSelectedOption(null)}
              option={selectedOption}
              id={item.id}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {item.milestone}
          </Typography>
          <IconButton
            aria-label='more'
            id='long-button'
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
          >
            <Icon icon='bx:dots-vertical-rounded' />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Task
