'use client'
import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { format } from 'date-fns'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import PDFViewer from 'src/@core/components/pdf-viewer'
import { Mentee } from 'src/types/Mentees'
import Questions from './Questions'

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
  const [open, setOpen] = useState(false)
  const [openDoc, setOpenDoc] = useState(false)
  const [activeUrl, setActiveUrl] = useState('')
  const [docTitle, setDocTitle] = useState('')

  const Document = ({ title, url }: { title: string; url: string }) => {
    return (
      <Box
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          setActiveUrl(url)
          setDocTitle(title)
          setOpenDoc(true)
        }}
        width={'50%'}
        display='flex'
        alignItems={'center'}
        gap={2}
        my={3}
        borderBottom='0.5px solid #7A7A7A'
        pb={5}
      >
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
          <Icon fontSize={24} color='#3460AE' icon='system-uicons:document' />
        </Box>
        <Box>
          <Typography fontSize={14} mb={1}>
            {title}
          </Typography>
        </Box>
      </Box>
    )
  }

  useEffect(() => {
    setCards([
      {
        label: 'Turn Over',
        value: data?.companyInfo?.turnOver || '',
        color: '#ECF5EE'
      },
      {
        label: 'Profit',
        value: data?.companyInfo?.profit || '',
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

  const handleClose = () => {
    setOpen(false)
  }

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
          <Typography color={'rgba(47, 43, 61, 0.78)'} fontSize={18} fontWeight={400}>
            {item.label}
          </Typography>
          <Typography color={'rgba(47, 43, 61, 0.78)'} fontSize={48} fontWeight={900}>
            {item.value || 0}
          </Typography>
        </Grid>
      ))}

      <Grid
        sx={{
          paddingLeft: '0px !important'
        }}
        item
        xs={12}
        md={5.8}
        mr={5}
      >
        <Card sx={{ margin: 0 }}>
          <CardHeader title='Documents' />
          <CardContent>
            <Box display={'flex'} flexWrap='wrap'>
              <Document url={data?.cv || ''} title='CV' />
              <Document url={data?.businessPlan || ''} title='Bussiness Plan' />
              <Document url={data?.eSign || ''} title='E-Sign' />
              <Document url={data?.vatReturn || ''} title='Vat Return' />
            </Box>
          </CardContent>
          <CardActions className='card-action-dense'>
            <Button onClick={() => setOpen(true)}>View All</Button>
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
        mr={5}
      >
        <Card sx={{ margin: 0 }}>
          <CardContent>
            <Questions questions={data?.aboutYou || []} />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        sx={{
          paddingLeft: '0px !important',
          marginRight: 4
        }}
        item
        xs={12}
        md={5.8}
      >
        <Grid container>
          <Grid item sm={12}>
            <Card sx={{ margin: 0 }}>
              <CardContent>
                <Typography sx={{ color: 'text.primary' }} fontSize={18} mb={5}>
                  Personal Info
                </Typography>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>DOB</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${
                    data?.userId?.dob ? format(new Date(data?.userId?.dob), 'dd MMMM yyyy') : ''
                  }`}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>Address</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${data?.location?.address || ''}`}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>City</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${data?.location?.city || ''}`}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>State</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${data?.location?.state || ''}`}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>Country</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${data?.location?.country || ''}`}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} mt={5}>
            <Card sx={{ margin: 0 }}>
              <CardContent>
                <Typography sx={{ color: 'text.primary' }} fontSize={18} mb={5}>
                  Company Info
                </Typography>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>DOE</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${
                    data?.companyInfo?.doe ? format(new Date(data?.companyInfo?.doe), 'dd MMMM yyyy') : ''
                  }`}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>Address</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${data?.companyLocation?.address || ''}`}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>City</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${data?.companyLocation?.city || ''}`}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>State</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${data?.companyLocation?.state || ''}`}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography sx={{ color: 'text.primary' }}>Country</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${data?.companyLocation?.country || ''}`}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={24} fontWeight={600}>
            Documents
          </Typography>
          <IconButton onClick={handleClose}>
            <Icon icon='ri:close-fill' height={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display={'flex'} flexWrap='wrap'>
            <Document url={data?.cv || ''} title='CV' />
            <Document url={data?.businessPlan || ''} title='Bussiness Plan' />
            <Document url={data?.eSign || ''} title='E-Sign' />
            <Document url={data?.vatReturn || ''} title='Vat Return' />
            <Document url={data?.certificateOfIncorp || ''} title='Incorporation Certification' />
          </Box>
          <Typography>Nominations</Typography>
          <Box display={'flex'} flexWrap='wrap'>
            {data?.nomination?.map((item, index) => (
              <Document url={item || ''} key={index} title='Nomination' />
            ))}
          </Box>
          <Typography>Bank Statements</Typography>
          <Box display={'flex'} flexWrap='wrap'>
            {data?.bankStatement?.map((item, index) => (
              <Document url={item} key={index} title='Bank Statement' />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
      <PDFViewer open={openDoc} setOpen={setOpenDoc} title={docTitle} url={[activeUrl as any]} />
    </Grid>
  )
}

export default OverView
