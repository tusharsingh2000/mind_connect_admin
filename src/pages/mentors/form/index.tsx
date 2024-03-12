// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import { Box } from '@mui/system'
import { Input, Typography } from '@mui/material'

const AsiignMenteeForm = () => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Button variant='outlined' size='medium' onClick={handleClickOpen}>
        + Add new Mentor
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Add Mentor
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display={'flex'} gap={5} flexDirection='column'>
            <Box>
              <label style={{ fontSize: 12, color: '#858585' }}>Mentor Name</label>
              <Input fullWidth placeholder='Amandeep Singh' />
            </Box>
            <Box>
              <label style={{ fontSize: 12, color: '#858585' }}>Email</label>
              <Input fullWidth type='email' placeholder='amandeep@gmail.com' />
            </Box>

            <Button variant='contained'>Get Link</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AsiignMenteeForm
