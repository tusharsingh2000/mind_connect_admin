// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const cards = [
  {
    label: 'Mentors',
    value: '10',
    color: '#ECF5EE'
  },
  {
    label: 'Mentees',
    value: '30',
    color: '#FDEBE9'
  },
  {
    label: 'Applicants',
    value: '1341',
    color: '#E6F1F9'
  },
  {
    label: 'Sessions',
    value: '95',
    color: '#FEF4E6'
  }
]

const Home = () => {
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
