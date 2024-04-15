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

const AssignMentorForm = ({
  menteeId,
  getMentee
}: {
  menteeId: string | string[]
  getMentee: (userId: string) => void
}) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [selectedMentor, setSelectedMentor] = useState('0')
  const [mentors, setMentors] = useState<{ email: string; firstName: string; lastName: string; _id: string }[]>([])

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const assignMentor = async () => {
    try {
      if (selectedMentor === '0') {
        toast.error('Please select a mentor')
        return
      }
      const response = await patch(`${BASE_URL}/admin/assign-mentor`, { menteeId, mentorId: selectedMentor })
      if (response) {
        toast.success('Mentor assigned successfully.', {
          duration: 2000
        })

        // @ts-ignore
        getMentee(menteeId)
      }
    } catch (error: any) {
      handleClose()
      console.log(error)
    }
  }

  const getMentors = async () => {
    try {
      const response = (await get(`${BASE_URL}/admin/mentors`)) as {
        email: string
        firstName: string
        lastName: string
        _id: string
      }[]
      if (response) {
        setMentors(response || [])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (open) {
      getMentors()
    }
  }, [open])

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
              <CustomTextField
                variant='filled'
                fullWidth
                size='small'
                select
                value={selectedMentor}
                id='custom-select'
                onChange={val => {
                  setSelectedMentor(val.target.value)
                }}
              >
                <MenuItem disabled value={'0'}>
                  Select Mentor
                </MenuItem>
                {mentors?.map(item => (
                  <MenuItem key={item?._id || ''} value={item?._id || ''}>
                    {`${item?.firstName || ''} ${item?.lastName || ''}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Box>
            <Box display={'flex'} gap={5}>
              <Button
                onClick={() => {
                  setSelectedMentor('0')
                  setOpen(false)
                }}
                fullWidth
                variant='outlined'
                size='large'
              >
                Cancel
              </Button>
              <Button onClick={assignMentor} fullWidth variant='contained' size='large'>
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
