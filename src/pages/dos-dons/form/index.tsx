// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import { Box } from '@mui/system'
import { Input, MenuItem, Typography } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

const AddDosForm = () => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Button variant='outlined' size='medium' onClick={handleClickOpen}>
        + Add Do's & Don's
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Do's & Don's
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display={'flex'} gap={5} flexDirection='column'>
            <Box>
              <CustomTextField variant='filled' fullWidth size='small' select value={'no'} id='custom-select'>
                <MenuItem disabled value={'no'}>
                  Select
                </MenuItem>
                <MenuItem value={'dos'}>Do's</MenuItem>
                <MenuItem value={'dons'}>Don's</MenuItem>
              </CustomTextField>
            </Box>
            <Box>
              <label style={{ fontSize: 12, color: '#858585' }}>Add Heading</label>
              <Input fullWidth placeholder='Heading' />
            </Box>
            <Box>
              <label style={{ fontSize: 12, color: '#858585' }}>Add Description</label>
              <Input fullWidth type='email' placeholder='Description' />
            </Box>

            <Box display={'flex'} gap={5}>
              <Button fullWidth variant='outlined' size='large'>
                Cancel
              </Button>
              <Button fullWidth variant='contained' size='large'>
                Add
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AddDosForm
