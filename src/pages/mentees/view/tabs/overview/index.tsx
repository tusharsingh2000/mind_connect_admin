import { Icon } from '@iconify/react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { format } from 'date-fns'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Mentee } from 'src/types/Mentees'
import Questions from './Questions'

const Document = ({ title }: { title: string }) => {
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
          {title}
        </Typography>
      </Box>
    </Box>
  )
}

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

const OverView = ({ data }: { data: Mentee | null }) => {
  const [cards, setCards] = useState<
    {
      label: string
      value: string
      color: string
    }[]
  >([])

  useEffect(() => {
    setCards([
      {
        label: 'Revenue',
        value: data?.companyInfo?.turnOver || '',
        color: '#ECF5EE'
      },
      {
        label: 'Companies',
        value: '1',
        color: '#FDEBE9'
      },
      {
        label: 'Employees',
        value: data?.companyInfo?.noOfEmployee || '0',
        color: '#E6F1F9'
      },
      {
        label: 'AI Rate',
        value: '0%',
        color: '#FEF4E6'
      }
    ])
  }, [data])

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
          <CardContent>
            <Grid container>
              <Grid item md={6} sm={12}>
                <Typography sx={{ color: 'text.primary' }} fontSize={18} mb={5}>
                  Personal Info
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>DOB</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${
                  data?.userId?.dob ? format(new Date(data?.userId?.dob), 'dd MMMM yyyy') : ''
                }`}</Typography>
                <Typography sx={{ color: 'text.primary' }}>Address</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${data?.location?.address || ''}`}</Typography>
                <Typography sx={{ color: 'text.primary' }}>City</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${data?.location?.city || ''}`}</Typography>
                <Typography sx={{ color: 'text.primary' }}>State</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${data?.location?.state || ''}`}</Typography>
                <Typography sx={{ color: 'text.primary' }}>Country</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${data?.location?.country || ''}`}</Typography>
              </Grid>
              <Grid item md={6} sm={12}>
                <Typography sx={{ color: 'text.primary' }} fontSize={18} mb={5}>
                  Company Info
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>DOE</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${
                  data?.companyInfo?.doe ? format(new Date(data?.companyInfo?.doe), 'dd MMMM yyyy') : ''
                }`}</Typography>
                <Typography sx={{ color: 'text.primary' }}>Address</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${data?.companyLocation?.address || ''}`}</Typography>
                <Typography sx={{ color: 'text.primary' }}>City</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${data?.companyLocation?.city || ''}`}</Typography>
                <Typography sx={{ color: 'text.primary' }}>State</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${data?.companyLocation?.state || ''}`}</Typography>
                <Typography sx={{ color: 'text.primary' }}>Country</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${data?.companyLocation?.country || ''}`}</Typography>
              </Grid>
            </Grid>
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
        <Card sx={{ margin: 0 }}>
          <CardHeader title='Documents' />
          <CardContent>
            <Box display={'flex'} flexWrap='wrap'>
              <Document title='CV' />
              <Document title='Bussiness Plan' />
              <Document title='E-Sign' />
              <Document title='Vat Return' />
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
            <Social socials={data?.social || []} />
          </CardContent>
        </Card>
        <Card sx={{ marginTop: 6 }}>
          <CardHeader title='Languages Known' />
          <CardContent>
            <Typography sx={{ color: 'text.secondary' }}>{data?.userId?.language?.join(', ')}</Typography>
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
        <Card sx={{ margin: 0 }}>
          <CardContent>
            <Questions questions={data?.aboutYou || []} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OverView
