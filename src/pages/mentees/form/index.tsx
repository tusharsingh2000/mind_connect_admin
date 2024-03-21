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
import axios from 'axios'
import authConfig, { BASE_URL } from 'src/configs/auth'
import { toast } from 'react-hot-toast'

const AssignMentorForm = ({ menteeId }: { menteeId: string | string[] }) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [selectedMentor, setSelectedMentor] = useState('0')
  const [mentors, setMentors] = useState<{ email: string; firstName: string; lastName: string; _id: string }[]>([])

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const assignMentor = async () => {
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName)
    if (token) {
      const response = await axios.patch(
        `${BASE_URL}/admin/assign-mentor`,
        { menteeId, mentorId: selectedMentor },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response?.status === 200) {
        toast.success('Mentor assigned successfully.', {
          duration: 2000
        })
      }
    }
  }

  const getMentors = async () => {
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName)
    if (token) {
      const response = await axios.get(`${BASE_URL}/admin/mentors`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response?.status === 200) {
        setMentors(response?.data || [])
      }
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
