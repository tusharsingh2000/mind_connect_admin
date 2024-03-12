import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TabContext from '@mui/lab/TabContext'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import { Box, Button, Divider } from '@mui/material'
import AddDosForm from './form'
import TabPanel from '@mui/lab/TabPanel'
import { Icon } from '@iconify/react'

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.primary.light,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    margin: '0px 6px',
    fontSize: 12,
    color: theme.palette.primary.main,
    '&:hover': {
      scale: '1.01'
    }
  }
}))

const dos = [
  {
    heading: 'Be on time',
    description: 'Be punctual and show respect to your mentor.'
  },
  {
    heading: 'Research the Program',
    description:
      "Understand the mentorship program's goals, values, and requirements. Tailor your application to align with these aspects ."
  },
  {
    heading: 'Be Professional',
    description: 'Use a professional tone with your Mentor'
  },
  {
    heading: 'Show Initiative',
    description: 'Proactively communicate how you plan to make the most out of the mentorship.'
  },
  {
    heading: 'Express Genuine Interest',
    description: 'Demonstrate a sincere passion for the field or area in which you are seeking mentorship.'
  }
]

const dons = [
  {
    heading: 'Avoid Generic Statements',
    description: 'Steer clear of generic statements that could apply to anyone.'
  },
  {
    heading: `Don't Exaggerate`,
    description: "While it's important to present your strengths, avoid exaggerating"
  },
  {
    heading: `Don't Skip Instructions`,
    description: 'Follow the application instructions carefully.'
  },
  {
    heading: `Don't ask for money`,
    description: `Don't ask money from your mentor while getting mentorship.`
  }
]

const DosNDons = () => {
  const [activeTab, setActiveTab] = useState<string>('dos')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (event: SyntheticEvent, value: string) => {
    // setIsLoading(true)
    setActiveTab(value)
    // router
    //   .push({
    //     pathname: `/apps/user/view/${value.toLowerCase()}`
    //   })
    //   .then(() => setIsLoading(false))
  }

  const DoDo = ({ dodo }: { dodo: { heading: string; description: string } }) => {
    return (
      <Box display={'flex'} alignItems='center' gap={5} mb={2}>
        <Typography component='div' fontSize={14} width={500}>
          <Typography component='span' fontWeight={700} sx={{ marginRight: '8px' }}>{`${dodo.heading}:`}</Typography>
          <Typography component='span' fontSize={14}>{`${dodo.description}`}</Typography>
        </Typography>
        <Button>
          <Icon fontSize={20} icon='carbon:edit' />
        </Button>
        <Button>
          <Icon fontSize={20} icon='mdi:delete' />
        </Button>
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box display={'flex'} justifyContent='space-between' alignItems='center'>
          <Typography fontSize={32} fontWeight={700}>
            Do's & Don's
          </Typography>
          <AddDosForm />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='forced scroll tabs example'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab value='dos' label={`Do's`} />
            <Tab value='dons' label={`Don's`} />
          </TabList>
          <Box sx={{ mt: 5 }}>
            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {/* <CircularProgress sx={{ mb: 4 }} /> */}
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <>
                <TabPanel value='dos'>
                  <Typography fontSize={28} fontWeight={700}>
                    Do's
                  </Typography>
                  {dos?.map((item, index) => (
                    <DoDo dodo={item} />
                  ))}
                </TabPanel>
                <TabPanel value='dons'>
                  <Typography fontSize={28} fontWeight={700} mb={2}>
                    Don's
                  </Typography>
                  {dons?.map((item, index) => (
                    <DoDo dodo={item} />
                  ))}
                </TabPanel>
              </>
            )}
          </Box>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default DosNDons
