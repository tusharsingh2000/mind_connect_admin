import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import { Icon } from '@iconify/react'
import TabContext from '@mui/lab/TabContext'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Button, CircularProgress, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { toast } from 'react-hot-toast'
import AlertDialog from 'src/@core/components/dialog'
import { BANNER } from 'src/types/General'
import { del, get } from 'src/utils/AxiosMethods'
import AddDosForm from './form'
import UpdateDosForm from './update'

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

const Banners = () => {
  const [activeTab, setActiveTab] = useState<string>('0')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [list, setList] = useState<BANNER[]>([])
  const [selectedItem, setSelectedItem] = useState<string>('')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(false)
    setActiveTab(value)
  }

  const deleteBanner = async () => {
    try {
      const response = await del(`/banner/${selectedItem}`)
      if (response) {
        toast.success('Deleted Successfully')
        setOpen(false)
        getBanner()
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const getBanner = async () => {
    try {
      setIsLoading(true)
      const response = (await get(`/banner?type=${activeTab}`)) as { data: { data: BANNER[] } }

      setIsLoading(false)
      if (response) {
        setList(response?.data?.data || [])
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getBanner()
  }, [activeTab])

  const DoDo = ({ dodo }: { dodo: BANNER }) => {
    return (
      <Box display={'flex'} alignItems='center' gap={5} mb={2}>
        <img style={{ height: 'auto', width: 200 }} src={dodo?.link as any} />
        <Typography width={300} component='span' fontSize={14}>{`${dodo.remarks}`}</Typography>

        <UpdateDosForm
          id={dodo?._id}
          data={{ remarks: dodo.remarks, type: dodo.type }}
          image={dodo.link}
          refetch={getBanner}
        />
        <Button
          onClick={() => {
            setSelectedItem(dodo?._id)
            setOpen(true)
          }}
        >
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
            Banners
          </Typography>
          <AddDosForm refetch={getBanner} />
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
            <Tab value='0' label={`Home Top`} />
            <Tab value='1' label={`Home Bottom`} />
            <Tab value='2' label={`Community`} />
          </TabList>
          <Box sx={{ mt: 5 }}>
            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <>
                <TabPanel value='0' sx={{ padding: 0, marginBottom: 5 }}>
                  <Typography fontSize={28} fontWeight={700}>
                    Home Top Banner
                  </Typography>
                </TabPanel>
                <TabPanel value='1' sx={{ padding: 0, marginBottom: 5 }}>
                  <Typography fontSize={28} fontWeight={700}>
                    Home Bottom Banner
                  </Typography>
                </TabPanel>
                <TabPanel value='2' sx={{ padding: 0, marginBottom: 5 }}>
                  <Typography fontSize={28} fontWeight={700} mb={2}>
                    Community Banner
                  </Typography>
                </TabPanel>
                {list?.length ? (
                  list?.map((item, index) => <DoDo key={index} dodo={item} />)
                ) : (
                  <Box sx={{ display: 'flex', height: 200, alignItems: 'center', justifyContent: 'center' }}>
                    <Typography fontSize={14} m={5}>
                      No data found
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        </TabContext>
      </Grid>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        onOk={deleteBanner}
        title='Hold On!'
        description='Are you sure you want to delete this item?'
      />
    </Grid>
  )
}

export default Banners
