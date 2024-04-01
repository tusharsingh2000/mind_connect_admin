import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TabContext from '@mui/lab/TabContext'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import { Box, Button, CircularProgress, Divider } from '@mui/material'
import AddFaqForm from './form'
import TabPanel from '@mui/lab/TabPanel'
import { Icon } from '@iconify/react'
import { del, get } from 'src/utils/AxiosMethods'
import { FAQ } from 'src/types/General'
import UpdateFaqForm from './update'
import AlertDialog from 'src/@core/components/dialog'
import { toast } from 'react-hot-toast'

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

const FAQs = () => {
  const [activeTab, setActiveTab] = useState<string>('MENTOR')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [selectedItem, setSelectedItem] = useState<string>('')

  const Faq = ({ faq }: { faq: FAQ }) => {
    return (
      <Box display={'flex'} alignItems='center' gap={5} mb={2}>
        <Box width={600}>
          <Typography fontWeight={700} sx={{ marginRight: '8px' }}>{`${faq?.question || ''}:`}</Typography>
          <Typography fontSize={14}>{`${faq?.answer || ''}`}</Typography>
        </Box>
        <UpdateFaqForm refetch={getFaqs} data={faq} id={faq?._id} />
        <Button
          onClick={() => {
            setSelectedItem(faq?._id)
            setOpen(true)
          }}
        >
          <Icon fontSize={20} icon='mdi:delete' />
        </Button>
      </Box>
    )
  }

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(false)
    setActiveTab(value)
  }

  const deleteFaq = async () => {
    try {
      const response = await del(`/admin/faq/${selectedItem}`)
      if (response) {
        toast.success('Deleted Successfully')
        setOpen(false)
        getFaqs()
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const getFaqs = async () => {
    try {
      setIsLoading(true)
      const response = (await get(`/admin/faq?type=${activeTab}`)) as FAQ[]
      setIsLoading(false)
      if (response) {
        setFaqs(response || [])
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getFaqs()
  }, [activeTab])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box display={'flex'} justifyContent='space-between' alignItems='center'>
          <Typography fontSize={32} fontWeight={700}>
            FAQs
          </Typography>
          <AddFaqForm refetch={getFaqs} />
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
            <Tab value='MENTOR' label={'Mentor'} />
            <Tab value='MENTEE' label={'Mentee'} />
          </TabList>
          <Box sx={{ mt: 5 }}>
            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <>
                <TabPanel value='MENTOR' sx={{ padding: 0, marginBottom: 5 }}>
                  <Typography fontSize={28} fontWeight={700}>
                    Mentor
                  </Typography>
                </TabPanel>
                <TabPanel value='MENTEE' sx={{ padding: 0, marginBottom: 5 }}>
                  <Typography fontSize={28} fontWeight={700} mb={2}>
                    Mentee
                  </Typography>
                </TabPanel>

                {faqs?.length ? (
                  faqs?.map((item, index) => <Faq key={item?._id || index} faq={item} />)
                ) : (
                  <Typography fontSize={14} m={5}>
                    No data found
                  </Typography>
                )}
              </>
            )}
          </Box>
        </TabContext>
      </Grid>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        onOk={deleteFaq}
        title='Hold On!'
        description='Are you sure you want to delete this faq?'
      />
    </Grid>
  )
}

export default FAQs
