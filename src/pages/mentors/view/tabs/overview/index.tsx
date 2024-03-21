import { Icon } from '@iconify/react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'

const cards = [
  {
    label: 'Revenue',
    value: '1250 M+',
    color: '#ECF5EE'
  },
  {
    label: 'Companies',
    value: '51',
    color: '#FDEBE9'
  },
  {
    label: 'Employees',
    value: '450+',
    color: '#E6F1F9'
  }
]

const Document = () => {
  return (
    <Box width={'50%'} display='flex' alignItems={'center'} gap={2} my={3} borderBottom='0.5px solid #7A7A7A' pb={5}>
      <Box
        sx={{
          background: '#FFF3EA',
          borderRadius: 100,
          height: 40,
          width: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon fontSize={24} color='#EA7A20' icon='system-uicons:document' />
      </Box>
      <Box>
        <Typography fontSize={14} mb={1}>
          Business Plan.pdf
        </Typography>
        <Typography fontSize={12}>200 KB</Typography>
      </Box>
    </Box>
  )
}

const Social = () => (
  <Box display={'flex'} flexWrap='wrap'>
    <Button sx={{ display: 'flex', flexDirection: 'column' }}>
      <Icon fontSize={32} icon='skill-icons:linkedin' />
      <Typography mt={2} color={'#000'} fontWeight={300}>
        Linkedin
      </Typography>
    </Button>
    <Button sx={{ display: 'flex', flexDirection: 'column' }}>
      <Icon fontSize={32} icon='skill-icons:instagram' />
      <Typography mt={2} color={'#000'} fontWeight={300}>
        Instagram
      </Typography>
    </Button>
    <Button sx={{ display: 'flex', flexDirection: 'column' }}>
      <Icon fontSize={32} icon='logos:facebook' />
      <Typography mt={2} color={'#000'} fontWeight={300}>
        Facebook
      </Typography>
    </Button>
    <Button sx={{ display: 'flex', flexDirection: 'column' }}>
      <Icon fontSize={34} icon='logos:whatsapp-icon' />
      <Typography mt={2} color={'#000'} fontWeight={300}>
        Whatsapp
      </Typography>
    </Button>
    <Button sx={{ display: 'flex', flexDirection: 'column' }}>
      <Icon fontSize={32} icon='devicon:twitter' />
      <Typography mt={2} color={'#000'} fontWeight={300}>
        Twitter
      </Typography>
    </Button>
  </Box>
)

const OverView = () => {
  return (
    <Grid container spacing={6} mt={4}>
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
          mr={4.4}
          mb={4}
          item
          md={3.8}
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
      <Grid
        sx={{
          paddingLeft: '0px !important',
          marginRight: 4
        }}
        item
        xs={12}
        md={5.8}
      >
        <Card sx={{ margin: 0 }}>
          <CardHeader title='About' />
          <CardContent>
            <Typography sx={{ color: 'text.secondary' }}>
              Mr. Oliver, born and raised in Birmingham, brings his Sikh faith to his commitment to business and
              philanthropy in Britain. For Prof. Peter Virdee, the attraction of successful business is all about
              engaging leadership around central human con...
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Mr. Oliver, born and raised in Birmingham, brings his Sikh faith to his commitment to business and
              philanthropy in Britain. For Prof. Peter Virdee, the attraction of successful business is all about
              engaging leadership around central human con...
            </Typography>
          </CardContent>
          <CardActions className='card-action-dense'>
            <Button>Read More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid
        sx={{
          paddingLeft: '0px !important'
        }}
        item
        xs={12}
        md={5.8}
      >
        <Card sx={{ margin: 0 }}>
          <CardHeader title='Documents' />
          <CardContent>
            <Box display={'flex'} flexWrap='wrap'>
              <Document />
              <Document />
              <Document />
              <Document />
            </Box>
          </CardContent>
          <CardActions className='card-action-dense'>
            <Button>View All</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid
        sx={{
          paddingLeft: '0px !important'
        }}
        item
        xs={12}
        md={5.8}
        mr={4}
      >
        <Card sx={{ margin: 0 }}>
          <CardHeader title='Social' />
          <CardContent>
            <Social />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        sx={{
          paddingLeft: '0px !important'
        }}
        item
        xs={12}
        md={5.8}
      >
        <Card sx={{ marginTop: 6 }}>
          <CardHeader title='Languages Known' />
          <CardContent>
            <Typography sx={{ color: 'text.secondary' }}>German, English</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OverView
