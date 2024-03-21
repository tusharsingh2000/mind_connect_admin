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
import OverView from './tabs/overview'
import Admin from './tabs/admin'
import AssignMenteeForm from '../assign'
import Link from 'next/link'

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
      <Grid item xs={12} md={6} display='flex' alignItems={'center'}>
        <Box>
          <CustomAvatar src={`/images/avatars/1.png`} sx={{ mr: 3, width: '8rem', height: '8rem' }} />
        </Box>
        <Box>
          <Typography position={'relative'} fontSize={26} fontWeight={700}>
            Prof. Peter Virdee
            <Icon
              fontSize={32}
              style={{ position: 'absolute', top: 2 }}
              color='#EA7A20'
              icon='bitcoin-icons:verify-filled'
            />
          </Typography>
          <Typography fontSize={18} color={'#7A7A7A'}>
            Entrepreneur | Business Man | Mentor
          </Typography>
          <Typography color={'#7A7A7A'}>
            petervirdee@business.com <Icon icon='lucide:dot' /> +12 123 12345678
          </Typography>
          <Link href={'/mentors/profile/1'}>
            <Button>Edit Profile</Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} display='flex' alignItems={'center'}>
        <Box>
          <Typography ml={2.5} color={'#7A7A7A'}>
            Matched with
          </Typography>
          <Typography ml={2.5} fontSize={26} fontWeight={700}>
            Oliver John
          </Typography>
          <AssignMenteeForm />
        </Box>
      </Grid>
      <Grid item xs={12} md={2} display='flex' flexDirection='column' gap={5}>
        <Button color='success' size='large' variant='contained'>
          Publish
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Box mt={10} ml={6} sx={{ width: '100%' }}>
        <TabContext value={value}>
          <TabList sx={{ maxWidth: 200 }} onChange={handleChange} aria-label='simple tabs example'>
            <Tab value='1' label='Overview' />
            <Tab value='2' label='Admin' />
          </TabList>
          <TabPanel value='1'>
            <OverView />
          </TabPanel>
          <TabPanel value='2'>
            <Admin />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  )
}

export default Mentees
