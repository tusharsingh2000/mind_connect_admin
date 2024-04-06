import { Icon } from '@iconify/react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { MentorDetail } from 'src/types/Mentors'
import AboutView from '../../popups/About'
import SpecialityView from '../../popups/Speciality'

const showIcon = (socialType: string) => {
  switch (socialType) {
    case 'FACEBOOK':
      return 'logos:facebook'

    case 'INSTAGRAM':
      return 'skill-icons:instagram'

    case 'LINKEDIN':
      return 'skill-icons:linkedin'

    case 'TWITTER':
      return 'devicon:twitter'

    default:
      return 'logos:facebook'
  }
}

const Social = ({
  socials
}: {
  socials: {
    type: string
    link: string
  }[]
}) => (
  <Box display={'flex'} flexWrap='wrap'>
    {socials?.map((item, index) => (
      <Link
        href={item?.link.startsWith('http') ? item?.link : `https://${item?.link}`}
        style={{ textDecoration: 'none' }}
        key={index}
      >
        <Button sx={{ display: 'flex', flexDirection: 'column' }}>
          <Icon fontSize={32} icon={showIcon(item?.type || '')} />
          <Typography textTransform={'lowercase'} mt={2} color={'#000'} fontWeight={300}>
            {item?.type || ''}
          </Typography>
        </Button>
      </Link>
    ))}
  </Box>
)

const SpecialistCard = ({ image, name }: { image: string; name: string }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box>
        <img
          src={image}
          style={{
            height: 180,
            width: 200,
            borderRadius: 10
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '140px',
          width: '200px',
          padding: '9px',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '0px 0px 10px 10px',
          color: 'white',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {name || ''}
      </Box>
    </Box>
  )
}

const OverView = ({ data }: { data: null | MentorDetail }) => {
  const cards = [
    {
      label: 'Revenue',
      value: data?.revenue || '',
      color: '#ECF5EE'
    },
    {
      label: 'Companies',
      value: data?.companies || '',
      color: '#FDEBE9'
    },
    {
      label: 'Employees',
      value: data?.noOfEmployee || '',
      color: '#E6F1F9'
    }
  ]

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
          <CardContent style={{ height: 200, overflow: 'hidden' }}>
            <Typography
              sx={{
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {data?.about || ''}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ visibility: data?.about?.length && data?.about?.length > 660 ? 'visible' : 'hidden' }}
            className='card-action-dense'
          >
            <AboutView about={data?.about || ''} />
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
          <CardHeader title='Specialities' />
          <CardContent sx={{ display: 'flex', gap: 10 }}>
            {data?.topics?.map(item => (
              <SpecialistCard image={item?.image || ''} name={item?.name || ''} key={item?._id} />
            ))}
          </CardContent>
          <CardActions className='card-action-dense'>
            <SpecialityView specialities={data?.topics || undefined} />
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
            <Social socials={data?.social || []} />
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
        <Card>
          <CardHeader title='Languages Known' />
          <CardContent style={{ height: 100 }}>
            <Typography sx={{ color: 'text.secondary' }}>German, English</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OverView
