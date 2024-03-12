// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { Box } from '@mui/system'
import { Input, MenuItem, Typography } from '@mui/material'

const AssignMentorForm = () => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Button size='medium' onClick={handleClickOpen}>
        Assign Mentor
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Assign Mentor
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display={'flex'} gap={5} flexDirection='column'>
            <Box>
              <CustomTextField variant='filled' fullWidth size='small' select value={0} id='custom-select'>
                <MenuItem disabled value={0}>
                  Select Mentor
                </MenuItem>
                <MenuItem value={10}>Mentor A</MenuItem>
                <MenuItem value={20}>Mentor B</MenuItem>
                <MenuItem value={30}>Mentor C</MenuItem>
              </CustomTextField>
            </Box>
            <Box display={'flex'} gap={5}>
              <Button fullWidth variant='outlined' size='large'>
                Cancel
              </Button>
              <Button fullWidth variant='contained' size='large'>
                Assign
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AssignMentorForm
