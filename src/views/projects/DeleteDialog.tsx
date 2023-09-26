// ** React Imports
import { Dispatch, FC, SetStateAction } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Types
import { useAppDispatch } from 'src/hooks/useTypedSelector'
import { deleteAsyncProject, fetchAsyncProject } from 'src/store/apps/project'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

interface IDeleteDialogProps {
  id: number
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const DeleteDialog: FC<IDeleteDialogProps> = ({ id, openDialog, setOpenDialog }) => {
  // ** Hooks
  const dispatch = useAppDispatch()
  const auth = useAuth()

  // ** Token
  const token = auth.token

  const handleDeleteProject = (id: number) => {
    const formData = {
      url: `/projects/${id}`,
      token: token
    }

    dispatch(deleteAsyncProject(formData))
      .unwrap()
      .then(response => {
        const userInfo = {
          url: '/projects/read',
          token: token
        }
        if (response) {
          dispatch(fetchAsyncProject(userInfo))
            .unwrap()
            .then(response => {
              if (response) {
                setOpenDialog(false)
              }
            })

          console.log(userInfo)
        }
      })
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <Dialog fullWidth maxWidth='xs' scroll='body' open={openDialog}>
      <DialogTitle
        sx={{
          textAlign: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Typography variant='h5' component='span'>
          Delete?
        </Typography>
        <Typography variant='body2'>This action cannot be undone.</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(5)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box className='demo-space-x'>
            <Button size='large' variant='contained' onClick={() => handleDeleteProject(id)}>
              Delete
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={handleCloseDialog}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
