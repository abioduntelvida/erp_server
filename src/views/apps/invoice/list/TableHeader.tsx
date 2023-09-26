// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
  toggleTaskDrawer: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, handleFilter, toggleTaskDrawer } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'end'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'end' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Task'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button onClick={toggleTaskDrawer} sx={{ mb: 2 }}>
          Create Task
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
