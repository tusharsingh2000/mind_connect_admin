import { SyntheticEvent, useState } from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Box, Button, Divider, Tab, Typography } from '@mui/material'
import GoBackButton from 'src/@core/components/buttons/goBackButton'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { Icon } from '@iconify/react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { OverView, Registeration } from './tabs'
import AssignMentorForm from '../form'

const Mentees = () => {
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GoBackButton />
      </Grid>
      <Grid item xs={12} md={5} display='flex' alignItems={'center'}>
        <Box>
          <CustomAvatar src={`/images/avatars/1.png`} sx={{ mr: 3, width: '8rem', height: '8rem' }} />
        </Box>
        <Box>
          <Typography position={'relative'} fontSize={26} fontWeight={700}>
            Mr. Oliver
            <Icon
              fontSize={32}
              style={{ position: 'absolute', top: 2 }}
              color='#EA7A20'
              icon='bitcoin-icons:verify-filled'
            />
          </Typography>
          <Typography fontSize={18} color={'#7A7A7A'}>
            Entrepreneur | Business Man
          </Typography>
          <Typography color={'#7A7A7A'}>Oliver@business.com</Typography>
          <Typography color={'#7A7A7A'}>+12 123 12345678</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={5} display='flex' alignItems={'center'}>
        <Box
          p={8}
          sx={{ background: '#FFF3EA' }}
          display={'flex'}
          gap={2}
          alignItems={'center'}
          flexDirection={'column'}
          mr={5}
        >
          <Typography fontSize={16} fontWeight={500}>
            AI Rate
          </Typography>
          <Typography fontSize={32} fontWeight={800}>
            95%
          </Typography>
        </Box>
        <Box>
          <Typography color={'#7A7A7A'}>Recommended Mentor</Typography>
          <Typography fontSize={26} fontWeight={700}>
            Prof. Peter Virdee
          </Typography>
          <AssignMentorForm />
        </Box>
      </Grid>
      <Grid item xs={12} md={2} display='flex' flexDirection='column' gap={5}>
        <Button color='success' size='large' variant='contained'>
          APPROVE
        </Button>
        <Button color='error' size='large' variant='outlined'>
          DECLINE
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Box mt={10} ml={6} sx={{ width: '100%' }}>
        <TabContext value={value}>
          <TabList sx={{ maxWidth: 305 }} onChange={handleChange} aria-label='simple tabs example'>
            <Tab value='1' label='Overview' />
            <Tab value='2' label='Registration Process' />
          </TabList>
          <TabPanel value='1'>
            <OverView />
          </TabPanel>
          <TabPanel value='2'>
            <Registeration />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  )
}

export default Mentees
