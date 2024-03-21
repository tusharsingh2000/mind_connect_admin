import { SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Box, Button, CircularProgress, Divider, Tab, Typography } from '@mui/material'
import GoBackButton from 'src/@core/components/buttons/goBackButton'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { Icon } from '@iconify/react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import AssignMentorForm from '../form'
import OverView from './tabs/overview'
import Registration from './tabs/registeration'
import authConfig, { BASE_URL } from 'src/configs/auth'
import axios from 'axios'
import { Mentee } from 'src/types/Mentees'
import AlertDialog from 'src/@core/components/dialog'
import { toast } from 'react-hot-toast'

const Mentees = () => {
  const [value, setValue] = useState<string>('1')
  const [data, setData] = useState<Mentee | null>(null)
  const [loading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [statusToUpdate, setStatusToUpdate] = useState(-1)

  const router = useRouter()

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const updateMenteeStatus = async () => {
    setOpen(false)
    try {
      const token = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (token) {
        setIsLoading(true)
        const response = await axios.patch(
          `${BASE_URL}/admin/mentee-status`,
          { status: statusToUpdate, userId: router?.query?.menteeId || '' },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setIsLoading(false)
        if (response?.status === 200) {
          if (data) {
            setData({
              ...data,
              status: statusToUpdate
            })
          }
          toast.success(`User ${statusToUpdate === 1 ? 'approved' : 'declined'}`)
        }
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || '')
    }
  }

  const getMentee = async (menteeId: string) => {
    try {
      const token = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (token) {
        setIsLoading(true)
        const response = await axios.get(`${BASE_URL}/admin/mentee/${menteeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setIsLoading(false)
        if (response?.status === 200) {
          setData(response?.data || null)
        }
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || '')
    }
  }

  useEffect(() => {
    if (router?.query?.menteeId) {
      // @ts-ignore
      getMentee(router?.query?.menteeId || '')
    }
  }, [router])

  if (loading) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GoBackButton />
      </Grid>
      <Grid item xs={12} md={5} display='flex' alignItems={'center'}>
        <Box>
          <CustomAvatar
            src={data?.userId?.avatar_url || `/images/avatars/1.png`}
            sx={{ mr: 3, width: '8rem', height: '8rem' }}
          />
        </Box>
        <Box>
          <Typography position={'relative'} fontSize={26} fontWeight={700}>
            {`${data?.userId?.firstName || ''} ${data?.userId?.lastName || ''}`}
            <Icon
              fontSize={32}
              style={{ position: 'absolute', top: 2 }}
              color='#EA7A20'
              icon='bitcoin-icons:verify-filled'
            />
          </Typography>
          <Typography fontSize={18} color={'#7A7A7A'}>
            {data?.companyInfo?.industryType || ''}
          </Typography>
          <Typography color={'#7A7A7A'}>{data?.userId?.email || ''}</Typography>
          <Typography color={'#7A7A7A'}>{`${data?.userId?.countryCode || ''} ${data?.userId?.phone || ''}`}</Typography>
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
            0%
          </Typography>
        </Box>
        <Box>
          {data?.userId?.mentor ? (
            <Box>
              <Typography color={'#7A7A7A'}>Assigned Mentor</Typography>
              <Typography fontSize={26} fontWeight={700}>
                {`${data?.userId?.mentor?.firstName || ''} ${data?.userId?.mentor?.lastName || ''}`}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography color={'#7A7A7A'}>Recommended Mentor</Typography>
              <Typography fontSize={26} fontWeight={700}>
                Not Found
              </Typography>
            </Box>
          )}
          {data?.userId?.mentor ? null : (
            <AssignMentorForm getMentee={getMentee} menteeId={router?.query?.menteeId || ''} />
          )}
        </Box>
      </Grid>
      {data?.status === 1 ? (
        <Grid item xs={12} md={2} display='flex' flexDirection='column' gap={5}>
          <Button color='success' size='large' variant='contained'>
            APPROVED
          </Button>
          <Button sx={{ visibility: 'hidden' }} color='success' size='large' variant='contained'>
            APPROVED
          </Button>
        </Grid>
      ) : data?.status === 2 ? (
        <Grid item xs={12} md={2} display='flex' flexDirection='column' gap={5}>
          <Button sx={{ visibility: 'hidden' }} color='success' size='large' variant='contained'>
            APPROVED
          </Button>
          <Button color='error' size='large' variant='outlined'>
            DECLINED
          </Button>
        </Grid>
      ) : (
        <Grid item xs={12} md={2} display='flex' flexDirection='column' gap={5}>
          <Button
            onClick={() => {
              if (!data?.userId?.mentor) {
                toast.error('Please assign a mentor first')
                return
              }
              setStatusToUpdate(1)
              setOpen(true)
            }}
            color='success'
            size='large'
            variant='contained'
          >
            APPROVE
          </Button>
          <Button
            onClick={() => {
              setStatusToUpdate(2)
              setOpen(true)
            }}
            color='error'
            size='large'
            variant='outlined'
          >
            DECLINE
          </Button>
        </Grid>
      )}
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
            <OverView data={data} />
          </TabPanel>
          <TabPanel value='2'>
            <Registration />
          </TabPanel>
        </TabContext>
      </Box>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        title='Hold On'
        description={`Are you sure you want to ${statusToUpdate === 1 ? 'approve' : 'reject'} this user?`}
        onOk={updateMenteeStatus}
      />
    </Grid>
  )
}

export default Mentees
