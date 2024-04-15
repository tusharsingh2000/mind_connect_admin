// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { Box } from '@mui/system'
import { MenuItem, Typography } from '@mui/material'
import { BASE_URL } from 'src/configs/auth'
import { toast } from 'react-hot-toast'
import { get, patch } from 'src/utils/AxiosMethods'

const AssignMenteeForm = ({
  mentorId,
  getMentor
}: {
  mentorId: string | string[]
  getMentor: (userId: string) => void
}) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [selectedMentee, setSelectedMentee] = useState('0')
  const [mentees, setMentees] = useState<{ email: string; firstName: string; lastName: string; _id: string }[]>([])

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const assignMentee = async () => {
    if (selectedMentee === '0') {
      toast.error('Please select a mentor')

      return
    }
    try {
      const response = await patch(`${BASE_URL}/admin/assign-mentor`, { mentorId, menteeId: selectedMentee })
      if (response) {
        toast.success('Mentee assigned successfully.', {
          duration: 2000
        })

        // @ts-ignore
        getMentor(mentorId)
      }
    } catch (error: any) {
      handleClose()
      console.log(error)
    }
  }

  const getMentees = async () => {
    try {
      const response = (await get(`${BASE_URL}/admin/new-mentee`)) as {
        email: string
        firstName: string
        lastName: string
        _id: string
      }[]
      if (response) {
        setMentees(response || [])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (open) {
      getMentees()
    }
  }, [open])

  return (
    <Fragment>
      <Button size='medium' onClick={handleClickOpen}>
        Assign Mentee
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Assign Mentee
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display={'flex'} gap={5} flexDirection='column'>
            <Box>
              <CustomTextField
                variant='filled'
                fullWidth
                size='small'
                select
                value={selectedMentee}
                id='custom-select'
                onChange={val => {
                  setSelectedMentee(val.target.value)
                }}
              >
                <MenuItem disabled value={'0'}>
                  Select Mentee
                </MenuItem>
                {mentees?.map(item => (
                  <MenuItem key={item?._id || ''} value={item?._id || ''}>
                    {`${item?.firstName || ''} ${item?.lastName || ''}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Box>
            <Box display={'flex'} gap={5}>
              <Button
                onClick={() => {
                  setSelectedMentee('0')
                  setOpen(false)
                }}
                fullWidth
                variant='outlined'
                size='large'
              >
                Cancel
              </Button>
              <Button onClick={assignMentee} fullWidth variant='contained' size='large'>
                Assign
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AssignMenteeForm
