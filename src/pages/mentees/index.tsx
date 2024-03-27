import { SyntheticEvent, useEffect, useState } from 'react'

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
import { Box, Button, CircularProgress, Divider, MenuItem, Switch } from '@mui/material'
import PageHeader from 'src/@core/components/page-header'
import TableColumns from 'src/@core/components/table'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomTextField from 'src/@core/components/mui/text-field'
import Link from 'next/link'
import axios from 'axios'
import authConfig, { BASE_URL } from 'src/configs/auth'
import { Mentees } from 'src/types/Mentees'
import { endOfMonth, endOfWeek, endOfYear, format, startOfMonth, startOfWeek, startOfYear } from 'date-fns'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import AlertDialog from 'src/@core/components/dialog'
import { get, patch } from 'src/utils/AxiosMethods'
import { isValidInput } from 'src/utils/validations'

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

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params

  if (row?.user?.avatar_url?.length) {
    return <CustomAvatar src={row?.user?.avatar_url || ''} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar skin='light' sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row?.user?.firsName || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const Mentees = () => {
  const [activeTab, setActiveTab] = useState<string>('-1')
  const [activePeriod, setActivePeriod] = useState<string>('All Time')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [mentees, setMentees] = useState<{ user: Mentees; status: number; aiRating: number }[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [totals, setTotals] = useState<{ all: number; approved: number; pending: number; rejected: number } | null>(
    null
  )
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'full_name',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Link href={`mentees/view/${row?.user?._id}`} style={{ textDecoration: 'none' }}>
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
                  {`${row?.user?.firstName || ''} ${row?.user?.lastName || ''}`}
                </Typography>
                <Typography noWrap variant='caption'>
                  {row?.user?.email || ''}
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
          {`${params.row?.aiRating || 0}%`}
        </Typography>
      )
    },
    {
      flex: 0.175,
      type: 'date',
      minWidth: 120,
      headerName: 'Registered on',
      field: 'createdAt',
      valueGetter: params => new Date(params.value),
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params?.row?.user?.createdAt ? format(new Date(params?.row?.user?.createdAt), 'dd MMM yyyy') : '--'}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        const statuses = {
          1: {
            label: 'Approved',
            color: 'success'
          },
          0: {
            label: 'New Lead',
            color: 'info'
          },
          2: {
            label: 'Declined',
            color: 'error'
          }
        }

        return (
          <CustomChip
            rounded
            size='small'
            skin='light'

            // @ts-ignore
            color={statuses[`${params?.row?.status}`]?.color}

            // @ts-ignore
            label={statuses[`${params?.row?.status}`]?.label}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.1,
      type: 'blocked',
      minWidth: 120,
      headerName: 'Blocked',
      field: 'isBlocked',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          <Switch
            onChange={() => {
              changeUserStatus(params?.row?._id, !params?.row?.user?.isBlocked)
            }}
            checked={params?.row?.user?.isBlocked}
          />
        </Typography>
      )
    },
    {
      flex: 0.1,
      type: 'action',
      minWidth: 120,
      headerName: 'Action',
      field: 'action',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          <Button
            onClick={() => {
              setOpen(true)
              setActiveId(params?.row?.user?._id || '')
            }}
          >
            <Icon icon='material-symbols:delete-outline' />
          </Button>
        </Typography>
      )
    }
  ]

  const deleteUser = async () => {
    try {
      setOpen(false)
      const token = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (token) {
        setIsLoading(true)
        const response = await axios.delete(`${BASE_URL}/admin/mentee/${activeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setIsLoading(false)
        if (response?.status === 200) {
          toast.success('User deleted succesfully')
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const changeUserStatus = async (userId: string, status: boolean) => {
    try {
      const response = await patch(`/admin/block-user/${userId}`, {
        isBlocked: status
      })
      if (response) {
        let idx = -1
        idx = mentees?.findIndex(ele => ele?.user?._id === userId)
        if (idx > -1) {
          const newArr = [...mentees]
          newArr[idx] = {
            ...newArr[idx],
            user: {
              ...newArr[idx]?.user,
              isBlocked: status
            }
          }
          setMentees([...newArr])
          toast.success('User updated successfully')
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(false)
    setActiveTab(value)
  }

  const getMentees = async () => {
    try {
      setIsLoading(true)
      const response = (await get(
        `/admin/mentees?to=${to}&from=${from}&status=${activeTab}&page=${paginationModel.page + 1}&limit=${
          paginationModel.pageSize
        }&search=${searchTerm}`
      )) as {
        mentees: { user: Mentees; status: number; aiRating: number }[]
        count: { all: number; approved: number; pending: number; rejected: number }
      }
      setIsLoading(false)
      if (response) {
        setMentees(response?.mentees || [])
        setTotals(response?.count || null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getDatesForPeriod = (period: string) => {
    let fromDate, toDate

    const today = new Date()

    switch (period) {
      case 'This Week':
        fromDate = startOfWeek(today)
        toDate = endOfWeek(today)
        break
      case 'This Month':
        fromDate = startOfMonth(today)
        toDate = endOfMonth(today)
        break
      case 'This Year':
        fromDate = startOfYear(today)
        toDate = endOfYear(today)
        break
      default:
        fromDate = toDate = ''
        break
    }

    if (typeof fromDate === 'string' || typeof toDate === 'string') {
      setFrom('')
      setTo('')
    } else {
      setFrom(format(fromDate, 'yyyy-MM-dd'))
      setTo(format(toDate, 'yyyy-MM-dd'))
    }
  }

  const getTotal = () => {
    switch (activeTab) {
      case '-1':
        return totals?.all || 0
      case '1':
        return totals?.approved || 0
      case '0':
        return totals?.pending || 0
      case '2':
        return totals?.rejected || 0

      default:
        return totals?.all || 0
    }
  }

  useEffect(() => {
    getMentees()
  }, [paginationModel, activeTab, to, debouncedSearchTerm])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title='MENTEES'
        searchTerm={searchTerm}
        setDebouncedSearchTerm={setDebouncedSearchTerm}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        value={searchTerm}
        onChange={(val: any) => {
          if (isValidInput(val.target.value)) {
            setSearchTerm(val.target.value)
          }
        }}
      />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box display={'flex'} justifyContent='space-between' alignItems='center'>
          <TabContext value={`${activeTab}`}>
            <TabList
              variant='scrollable'
              scrollButtons='auto'
              onChange={handleChange}
              aria-label='forced scroll tabs example'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab value={'-1'} label={`All (${totals?.all || 0})`} />
              <Tab value={'1'} label={`Approved (${totals?.approved || 0})`} />
              <Tab value={'0'} label={`New Leads (${totals?.pending || 0})`} />
              <Tab value={'2'} label={`Declined (${totals?.rejected || 0})`} />
            </TabList>
          </TabContext>
          <Box display={'flex'} gap={5}>
            <CustomTextField
              onChange={val => {
                setActivePeriod(val.target.value)
                getDatesForPeriod(val.target.value)
              }}
              size='small'
              select
              value={activePeriod}
              id='custom-select'
            >
              <MenuItem value={'All Time'}>All Time</MenuItem>
              <MenuItem value={'This Week'}>This Week</MenuItem>
              <MenuItem value={'This Month'}>This Month</MenuItem>
              <MenuItem value={'This Year'}>This Year</MenuItem>
            </CustomTextField>
          </Box>
        </Box>
        <Box sx={{ mt: 5 }}>
          {isLoading ? (
            <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CircularProgress sx={{ mb: 4 }} />
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            <>
              <TableColumns
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                columns={columns}
                rows={mentees || []}
                total={getTotal()}
              />
            </>
          )}
        </Box>
      </Grid>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        onOk={deleteUser}
        title='Hold On!'
        description='Are you sure you want to delete this user?'
      />
    </Grid>
  )
}

export default Mentees
