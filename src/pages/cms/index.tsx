import { useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Button, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { toast } from 'react-hot-toast'
import EditText from 'src/@core/components/editor'
import { BASE_URL } from 'src/configs/auth'
import { get, put } from 'src/utils/AxiosMethods'

const DosNDons = () => {
  const [privacy, setPrivacy] = useState('')
  const [about, setAbout] = useState('')
  const [tnc, setTnc] = useState('')
  const [cmsId, setCmsId] = useState('')

  const updateCms = async () => {
    try {
      const response = await put(`${BASE_URL}cms/${cmsId}`, { privacyPolicy: privacy, tnc, about })
      if (response) {
        toast.success('CMS updated successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCms = async () => {
    try {
      const response = (await get(`${BASE_URL}cms`)) as {
        data: { privacyPolicy: string; tnc: string; about: string; _id: string }[]
      }
      if (response?.data?.length) {
        setPrivacy(response?.data?.[0]?.privacyPolicy || ' ')
        setTnc(response?.data?.[0]?.tnc || ' ')
        setAbout(response?.data?.[0]?.about || ' ')
        setCmsId(response?.data?.[0]?._id || ' ')
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
          About
        </Typography>
        <Box sx={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)' }} mb={10}>
          {about?.length ? <EditText content={about} setContent={setAbout} /> : null}
        </Box>
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
