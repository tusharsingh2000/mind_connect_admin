import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button, Divider } from '@mui/material'
import { get, post } from 'src/utils/AxiosMethods'
import { BASE_URL } from 'src/configs/auth'
import EditText from 'src/@core/components/editor'
import { toast } from 'react-hot-toast'

const DosNDons = () => {
  const [privacy, setPrivacy] = useState('')
  const [tnc, setTnc] = useState('')

  const updateCms = async () => {
    try {
      const response = await post(`${BASE_URL}/admin/cms`, { privacyPolicy: privacy, termsAndConditions: tnc })
      if (response) {
        toast.success('CMS updated successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCms = async () => {
    try {
      const response = (await get(`${BASE_URL}/common/cms`)) as { privacyPolicy: string; termsAndConditions: string }
      if (response) {
        setPrivacy(response?.privacyPolicy || '')
        setTnc(response?.termsAndConditions || '')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCms()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box display={'flex'} justifyContent='space-between' alignItems='center'>
          <Typography fontSize={32} fontWeight={700}>
            CMS
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight={600} fontSize={18} mb={2}>
          Privacy Policy
        </Typography>
        <Box sx={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)' }} mb={10}>
          {privacy?.length ? <EditText content={privacy} setContent={setPrivacy} /> : null}
        </Box>
        <Typography fontWeight={600} fontSize={18} mb={2}>
          Terms And Conditions
        </Typography>
        <Box sx={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)' }} mb={10}>
          {tnc?.length ? <EditText content={tnc} setContent={setTnc} /> : null}
        </Box>
        <Button variant='contained' onClick={updateCms}>
          Update
        </Button>
      </Grid>
    </Grid>
  )
}

export default DosNDons
