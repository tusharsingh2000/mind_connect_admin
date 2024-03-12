import { SyntheticEvent, useState } from 'react'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TabContext from '@mui/lab/TabContext'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import { Box, Divider, MenuItem } from '@mui/material'
import PageHeader from 'src/@core/components/page-header'
import TableColumns, { StatusObj } from 'src/@core/components/table'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useRouter } from 'next/router'
import Link from 'next/link'

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

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const Mentees = () => {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<string>('all')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'full_name',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Link href={'mentees/view/1'} style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              {renderClient(params)}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {row.full_name}
                </Typography>
                <Typography noWrap variant='caption'>
                  {row.email}
                </Typography>
              </Box>
            </Box>
          </Link>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'salary',
      headerName: 'AI Rate',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.salary}
        </Typography>
      )
    },
    {
      flex: 0.175,
      type: 'date',
      minWidth: 120,
      headerName: 'Registered on',
      field: 'start_date',
      valueGetter: params => new Date(params.value),
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.start_date}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        const status = statusObj[params.row.status]

        return (
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={status.color}
            label={status.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    }
  ]

  const handleChange = (event: SyntheticEvent, value: string) => {
    // setIsLoading(true)
    setActiveTab(value)
    // router
    //   .push({
    //     pathname: `/apps/user/view/${value.toLowerCase()}`
    //   })
    //   .then(() => setIsLoading(false))
  }

  return (
    <Grid container spacing={6}>
      <PageHeader title='MENTEES' />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box display={'flex'} justifyContent='space-between' alignItems='center'>
          <TabContext value={activeTab}>
            <TabList
              variant='scrollable'
              scrollButtons='auto'
              onChange={handleChange}
              aria-label='forced scroll tabs example'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab value='all' label='All (678)' />
              <Tab value='approved' label='Approved (26)' />
              <Tab value='newLeads' label='New Leads (212)' />
              <Tab value='inProgress' label='In Progress (512)' />
              <Tab value='declined' label='Declined (12)' />
            </TabList>
          </TabContext>
          <Box display={'flex'} gap={5}>
            {/* <Button size='small' variant='outlined'>
              Do's & Dont's
            </Button> */}
            <CustomTextField size='small' select value={10} id='custom-select'>
              <MenuItem value={10}>This Week</MenuItem>
              <MenuItem value={20}>This Month</MenuItem>
              <MenuItem value={30}>This Year</MenuItem>
            </CustomTextField>
          </Box>
        </Box>
        <Box sx={{ mt: 5 }}>
          {isLoading ? (
            <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {/* <CircularProgress sx={{ mb: 4 }} /> */}
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            <>
              <TableColumns columns={columns} />
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Mentees
