import { useState } from 'react'

// ** MUI Imports
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import RechartsLineChart from 'src/@core/components/dashboard-chart'
import { get } from 'src/utils/AxiosMethods'

type Dashboard = {
  notificationCount: number
  numberOfAcceptedMentees: number
  numberOfApplicantMentees: number
  numberOfMentors: number
  numberOfSessions: number
}

const Home = () => {
  const router = useRouter()

  const [dashboardData, setDashboardData] = useState({
    mentor: 0,
    mentees: 0,
    sessions: 0,
    applicants: 0
  })

  const [graphData, setGraphData] = useState([])
  const [active, setActive] = useState('WEEK')

  const cards = [
    {
      label: 'Mentors',
      value: dashboardData?.mentor || '0',
      color: '#ECF5EE',
      navigateTo: '/mentors'
    },
    {
      label: 'Mentees',
      value: dashboardData?.mentees || '0',
      color: '#FDEBE9',
      navigateTo: '/mentees'
    },
    {
      label: 'Applicants',
      value: dashboardData?.applicants || '0',
      color: '#E6F1F9',
      navigateTo: '/mentees'
    },
    {
      label: 'Sessions',
      value: '95',
      color: '#FEF4E6',
      navigateTo: '/sessions'
    }
  ]

  const getDashboard = async () => {
    try {
      const response = (await get(`/admin/dashboard`)) as Dashboard
      if (response) {
        setDashboardData({
          ...dashboardData,
          applicants: response?.numberOfApplicantMentees || 0,
          mentees: response?.numberOfAcceptedMentees || 0,
          mentor: response?.numberOfMentors || 0,
          sessions: response?.numberOfSessions || 0
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getGraphData = async () => {
    try {
      const response = (await get(`/admin/graph-data?type=${active}`)) as any
      if (response) {
        setGraphData(
          response?.map((item: any) => {
            const key = Object.keys(item)[0] as any
            const value = Object.values(item)[0] as any

            return {
              name: key,
              canceled: value.canceled,
              completed: value.completed,
              rescheduled: value.rescheduled
            }
          })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   getDashboard()
  // }, [])
  // useEffect(() => {
  //   getGraphData()
  // }, [active])

  return (
    <Box>
      <Grid container spacing={6} p={6}>
        {cards?.map((item, index) => (
          <Grid
            key={index}
            sx={{
              background: item.color,
              height: 150,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            pl={5}
            mx={2}
            mb={4}
            item
            md={2.8}
            xs={12}
            onClick={() => router.push(item.navigateTo)}
          >
            <Typography color={'rgba(47, 43, 61, 0.78)'} fontSize={18} fontWeight={400}>
              {item.label}
            </Typography>
            <Typography color={'rgba(47, 43, 61, 0.78)'} fontSize={48} fontWeight={900}>
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <RechartsLineChart active={active} setActive={setActive} data={graphData} />
    </Box>
  )
}

export default Home
