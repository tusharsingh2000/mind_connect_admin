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
import { Box, Button, CircularProgress, Divider, Switch } from '@mui/material'
import AddMentorForm from './form'
import PageHeader from 'src/@core/components/page-header'
import { isValidInput } from 'src/utils/validations'
import { del, get, patch } from 'src/utils/AxiosMethods'
import { Mentors } from 'src/types/Mentors'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Link from 'next/link'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import TableColumns from 'src/@core/components/table'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import AlertDialog from 'src/@core/components/dialog'

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

// const statusObj: StatusObj = {
//   1: { title: 'current', color: 'primary' },
//   2: { title: 'professional', color: 'success' },
//   3: { title: 'rejected', color: 'error' },
//   4: { title: 'resigned', color: 'warning' },
//   5: { title: 'applied', color: 'info' }
// }

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row?.avatar?.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row?.firstName ? `${row.firstName || ''} ${row.lastName || ''}` : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const Mentors = () => {
  const [activeTab, setActiveTab] = useState<string>('0')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [mentors, setMentors] = useState<Mentors[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')
  const [totals, setTotals] = useState<{
    allCount: number
    inactiveCount: number
    invitedCount: number
    matchedCount: number
    unmatchedCount: number
  } | null>(null)

  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  const changeUserStatus = async (userId: string, status: boolean) => {
    try {
      const response = await patch(`/admin/block-user/${userId}`, {
        isBlocked: status
      })
      if (response) {
        let idx = -1
        idx = mentors?.findIndex(ele => ele?._id === userId)
        if (idx > -1) {
          let newArr = [...mentors]
          newArr[idx] = {
            ...newArr[idx],
            isBlocked: status
          }
          setMentors([...newArr])
          toast.success('Status updated successfully')
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 210,
      field: 'full_name',
      headerName: 'Montor Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Link href={`mentors/view/${row?._id}`} style={{ textDecoration: 'none' }}>
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
                  {`${row.firstName || ''} ${row.lastName || ''}`}
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
      flex: 0.1,
      minWidth: 80,
      field: 'matched',
      headerName: 'Matched With',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row?.mentees?.length || 0}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'salary',
      headerName: 'Sessions Made',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params?.row?.bookingCount || 0}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <CustomChip
            rounded
            size='small'
            skin='light'
            // @ts-ignore
            color={params.row.active ? 'success' : 'error'}
            // @ts-ignore
            label={params.row.active ? 'Active' : 'Inactive'}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    // {
    //   flex: 0.125,
    //   minWidth: 140,
    //   field: 'ratings',
    //   headerName: 'Ratings',
    //   renderCell: () => {
    //     return <Rating defaultValue={Math.random() * 5} precision={0.5} name='half-rating' />
    //   }
    // }
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
              changeUserStatus(params?.row?._id, !params?.row?.isBlocked)
            }}
            checked={params?.row?.isBlocked}
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

  const getTotal = () => {
    switch (activeTab) {
      case '0':
        return totals?.allCount || 0
      case '1':
        return totals?.matchedCount || 0
      case '2':
        return totals?.unmatchedCount || 0
      case '3':
        return totals?.invitedCount || 0
      case '4':
        return totals?.inactiveCount || 0

      default:
        return totals?.allCount || 0
    }
  }

  const deleteUser = async () => {
    try {
      setOpen(false)

      setIsLoading(true)
      const response = await del(`/admin/mentor/${activeId}`)
      setIsLoading(false)
      if (response) {
        toast.success('User deleted succesfully')
        getMentors()
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const getMentors = async () => {
    try {
      setIsLoading(true)
      const response = (await get(
        `/admin/mentors-list?status=${activeTab}&page=${paginationModel.page + 1}&limit=${
          paginationModel.pageSize
        }&search=${searchTerm}`
      )) as {
        mentors: Mentors[]
        allCount: number
        inactiveCount: number
        invitedCount: number
        matchedCount: number
        unmatchedCount: number
      }
      setIsLoading(false)
      if (response) {
        setMentors(response?.mentors || [])
        setTotals({
          ...totals,
          allCount: response?.allCount || 0,
          inactiveCount: response?.inactiveCount || 0,
          invitedCount: response?.invitedCount || 0,
          matchedCount: response?.matchedCount || 0,
          unmatchedCount: response?.unmatchedCount || 0
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMentors()
  }, [paginationModel, activeTab, debouncedSearchTerm])

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(false)
    setActiveTab(value)
  }

  return (
    <Grid container spacing={6}>
      <PageHeader
        title='MENTORS'
        searchTerm={searchTerm}
        setDebouncedSearchTerm={setDebouncedSearchTerm}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        value={searchTerm}
        onChange={(val: any) => {
          if (val.target.value) {
            if (isValidInput(val.target.value)) {
              setSearchTerm(val.target.value)
            }
          } else {
            setSearchTerm(val.target.value)
            setDebouncedSearchTerm(val.target.value)
            setPaginationModel({
              page: 0,
              pageSize: paginationModel.pageSize
            })
          }
        }}
      />
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
              <Tab value='0' label={`All (${totals?.allCount || 0})`} />
              <Tab value='1' label={`Matched (${totals?.matchedCount || 0})`} />
              <Tab value='2' label={`Unmatched (${totals?.unmatchedCount || 0})`} />
              <Tab value='3' label={`Invited (${totals?.invitedCount || 0})`} />
              <Tab value='4' label={`Inactive (${totals?.inactiveCount || 0})`} />
            </TabList>
          </TabContext>
          <AddMentorForm />
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
                rows={mentors || []}
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
        description='Are you sure you want to delete this mentor?'
      />
    </Grid>
  )
}

export default Mentors
