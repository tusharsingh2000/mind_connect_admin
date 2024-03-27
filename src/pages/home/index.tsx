import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { get } from 'src/utils/AxiosMethods'

type Dashboard = {
  numberOfMentors: number
  numberOfAcceptedMentees: [
    {
      acceptedMentees: number
    }
  ]
  numberOfApplicantMentees: [
    {
      pendingMentees: number
    }
  ]
}

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    mentor: 0,
    mentees: 0,
    applicants: 0
  })

  const cards = [
    {
      label: 'Mentors',
      value: dashboardData?.mentor || '0',
      color: '#ECF5EE'
    },
    {
      label: 'Mentees',
      value: dashboardData?.mentees || '0',
      color: '#FDEBE9'
    },
    {
      label: 'Applicants',
      value: dashboardData?.applicants || '0',
      color: '#E6F1F9'
    },
    {
      label: 'Sessions',
      value: '95',
      color: '#FEF4E6'
    }
  ]

  const getDashboard = async () => {
    try {
      const response = (await get(`/admin/dashboard`)) as Dashboard
      if (response) {
        setDashboardData({
          ...dashboardData,
          applicants: response?.numberOfApplicantMentees?.[0]?.pendingMentees || 0,
          mentees: response?.numberOfAcceptedMentees?.[0]?.acceptedMentees || 0,
          mentor: response?.numberOfMentors || 0
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDashboard()
  }, [])

  return (
    <Grid container spacing={6} p={6}>
      {cards?.map((item, index) => (
        <Grid
          key={index}
          sx={{
            background: item.color,
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          pl={5}
          mx={2}
          mb={4}
          item
          md={2.8}
          xs={12}
        >
          <Typography fontSize={18} fontWeight={400}>
            {item.label}
          </Typography>
          <Typography fontSize={48} fontWeight={900}>
            {item.value}
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default Home
