import { SyntheticEvent, useEffect, useState } from 'react'

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
import { del, get } from 'src/utils/AxiosMethods'
import { DODON } from 'src/types/General'
import UpdateDosForm from './update'
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

const DosNDons = () => {
  const [activeTab, setActiveTab] = useState<string>('0')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [list, setList] = useState<DODON[]>([])
  const [selectedItem, setSelectedItem] = useState<string>('')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(false)
    setActiveTab(value)
  }

  const deleteDoDons = async () => {
    try {
      const response = await del(`/admin/instruction/${selectedItem}`)
      if (response) {
        toast.success('Deleted Successfully')
        setOpen(false)
        getDoDons()
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const getDoDons = async () => {
    try {
      setIsLoading(true)
      const response = (await get(`/admin/instruction/${activeTab}`)) as DODON[]

      setIsLoading(false)
      if (response) {
        setList(response || [])
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getDoDons()
  }, [activeTab])

  const DoDo = ({ dodo }: { dodo: DODON }) => {
    return (
      <Box display={'flex'} alignItems='center' gap={5} mb={2}>
        <Typography component='div' fontSize={14} width={500}>
          <Typography component='span' fontWeight={700} sx={{ marginRight: '8px' }}>{`${dodo.heading}:`}</Typography>
          <Typography component='span' fontSize={14}>{`${dodo.description}`}</Typography>
        </Typography>
        <UpdateDosForm id={dodo?._id} data={dodo} refetch={getDoDons} />
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
            Do's & Don's
          </Typography>
          <AddDosForm refetch={getDoDons} />
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
            <Tab value='0' label={`Do's`} />
            <Tab value='1' label={`Don's`} />
          </TabList>
          <Box sx={{ mt: 5 }}>
            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {/* <CircularProgress sx={{ mb: 4 }} /> */}
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <>
                <TabPanel value='0' sx={{ padding: 0, marginBottom: 5 }}>
                  <Typography fontSize={28} fontWeight={700}>
                    Do's
                  </Typography>
                </TabPanel>
                <TabPanel value='1' sx={{ padding: 0, marginBottom: 5 }}>
                  <Typography fontSize={28} fontWeight={700} mb={2}>
                    Don's
                  </Typography>
                </TabPanel>
                {list?.length ? (
                  list?.map((item, index) => <DoDo key={index} dodo={item} />)
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
        onOk={deleteDoDons}
        title='Hold On!'
        description='Are you sure you want to delete this item?'
      />
    </Grid>
  )
}

export default DosNDons
