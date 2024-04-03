import { SyntheticEvent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

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
import { MentorDetail } from 'src/types/Mentors'
import { get } from 'src/utils/AxiosMethods'
import { toast } from 'react-hot-toast'

const Mentees = () => {
  const router = useRouter()

  const [value, setValue] = useState<string>('1')
  const [loading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<null | MentorDetail>(null)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const getMentee = async (mentorId: string) => {
    try {
      setIsLoading(true)
      const response = (await get(`/admin/mentor/${mentorId}`)) as MentorDetail
      setIsLoading(false)
      if (response) {
        setData(response || null)
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || '')
    }
  }

  useEffect(() => {
    if (router?.query?.mentorId) {
      // @ts-ignore
      getMentee(router?.query?.mentorId || '')
    }
  }, [router])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GoBackButton />
      </Grid>
      <Grid item xs={12} md={6} display='flex' alignItems={'center'}>
        <Box>
          <CustomAvatar
            src={data?.user?.avatar_url || `/images/avatars/1.png`}
            sx={{ mr: 3, width: '8rem', height: '8rem' }}
          />
        </Box>
        <Box>
          <Typography position={'relative'} fontSize={26} fontWeight={700}>
            {`${data?.user?.firstName || ''} ${data?.user?.lastName || ''}`}
            <Icon
              fontSize={32}
              style={{ position: 'absolute', top: 2 }}
              color='#EA7A20'
              icon='bitcoin-icons:verify-filled'
            />
          </Typography>
          <Typography fontSize={18} color={'#7A7A7A'}>
            {data?.industryType || ''}
          </Typography>
          <Typography color={'#7A7A7A'}>
            {data?.user?.email || ''} <Icon icon='lucide:dot' /> {data?.user?.email || ''}
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
            <OverView data={data} />
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
