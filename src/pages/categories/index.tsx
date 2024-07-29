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
import { CATEGORY } from 'src/types/General'
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

const DosNDons = () => {
  const [activeTab, setActiveTab] = useState<string>('1')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [list, setList] = useState<CATEGORY[]>([])
  const [selectedItem, setSelectedItem] = useState<string>('')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(false)
    setActiveTab(value)
  }

  const deleteDoDons = async () => {
    try {
      const response = await del(`/category/${selectedItem}`)
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
      const response = (await get(`/category?type=${activeTab}`)) as { data: { data: CATEGORY[] } }

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
    getDoDons()
  }, [activeTab])

  const DoDo = ({ dodo }: { dodo: CATEGORY }) => {
    return (
      <Box display={'flex'} alignItems='center' gap={5} mb={2}>
        <img style={{ height: 80, width: 'auto' }} src={dodo?.image as any} />
        <Typography width={300} component='span' fontSize={14}>{`${dodo.name}`}</Typography>

        <UpdateDosForm
          id={dodo?._id}
          data={{ name: dodo.name, type: dodo.type }}
          image={dodo.image}
          refetch={getDoDons}
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
            Categories
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
            <Tab value='1' label={`User`} />
            <Tab value='2' label={`Consultant`} />
          </TabList>
          <Box sx={{ mt: 5 }}>
            {isLoading ? (
              <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <>
                <TabPanel value='1' sx={{ padding: 0, marginBottom: 5 }}>
                  <Typography fontSize={28} fontWeight={700}>
                    User Categories
                  </Typography>
                </TabPanel>
                <TabPanel value='2' sx={{ padding: 0, marginBottom: 5 }}>
                  <Typography fontSize={28} fontWeight={700} mb={2}>
                    Consultant Categories
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
        onOk={deleteDoDons}
        title='Hold On!'
        description='Are you sure you want to delete this item?'
      />
    </Grid>
  )
}

export default DosNDons
