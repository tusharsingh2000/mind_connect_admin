import { useState } from 'react'
import { Box, Button } from '@mui/material'
import AlertDialog from 'src/@core/components/dialog'
import { ChangePasswordForm, SetEmailForm } from '../../popups'
import { post } from 'src/utils/AxiosMethods'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

const Registration = () => {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const logoutMentor = async () => {
    try {
      const response = await post(`/admin/logout-all-devices/${router?.query?.mentorId}`, {})
      if (response) {
        toast('Logged out successfully')
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Box maxWidth={300} my={5}>
        <ChangePasswordForm />
      </Box>
      <Box maxWidth={300} my={5}>
        <SetEmailForm />
      </Box>
      <Box maxWidth={300} my={5}>
        <Button fullWidth size='large' variant='outlined'>
          SET NEW MENTEE
        </Button>
      </Box>
      <Box maxWidth={300} my={5}>
        <Button onClick={() => setOpen(true)} fullWidth size='large' variant='outlined'>
          LOGOUT FROM ALL DEVICES
        </Button>
      </Box>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        title='Hold On'
        description={`Are you sure you want to logout this user form all devices?`}
        onOk={logoutMentor}
      />
    </Box>
  )
}

export default Registration
