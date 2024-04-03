import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TabContext from '@mui/lab/TabContext'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import { Box, CircularProgress, Divider, Rating } from '@mui/material'
import { get } from 'src/utils/AxiosMethods'
import PageHeader from 'src/@core/components/page-header'
import { isValidInput } from 'src/utils/validations'
import { SESSIONS, Status } from 'src/types/General'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Link from 'next/link'
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableColumns from 'src/@core/components/table'
import { format } from 'date-fns'

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

// // ** renders client column
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

const Sessions = () => {
  const [activeTab, setActiveTab] = useState<string>('-1')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [sessions, setSessions] = useState<any[]>([
    {
      isExtended: false,
      _id: '65fd387c05b56be16729a0e0',
      bookingDate: '2024-03-29T00:00:00.000Z',
      bookingTimeStart: '01:36 AM',
      bookingTimeEnd: '02:06 AM',
      startTime: '01:36',
      endTime: '02:06',
      status: 4,
      isRescheduled: false,
      bookingNo: 4,
      sessionNo: 2,
      mentor: {
        _id: '65fd1f252281ddfdfa925db1',
        firstName: 'Amit',
        lastName: 'kumar',
        email: 'rahul@gmail.com',
        role: 'MENTOR',
        avatar_url:
          'https://mentoredapp.s3.amazonaws.com/media/65fd0b4c1b1def5eab6dd003/1711082451401_57ebc8b1-cccc-4101-b400-bf00f04610a82866430971597795332.jpg'
      },
      user: {
        _id: '65fd0b4c1b1def5eab6dd003',
        firstName: 'Rahul',
        lastName: 'kumar',
        email: 'rahul@gmail.com',
        role: 'MENTEE',
        avatar_url:
          'https://mentoredapp.s3.amazonaws.com/media/65fd0b4c1b1def5eab6dd003/1711082451401_57ebc8b1-cccc-4101-b400-bf00f04610a82866430971597795332.jpg'
      },
      recording: {
        isRecording: false,
        members: 0
      },
      createdAt: '2024-03-22T07:51:24.959Z',
      updatedAt: '2024-03-22T07:51:24.959Z',
      __v: 0
    },
    {
      isExtended: false,
      _id: '65fd27171b1def5eab6dd2a8',
      bookingDate: '2024-03-27T00:00:00.000Z',
      bookingTimeStart: '12:30 PM',
      bookingTimeEnd: '12:35 PM',
      startTime: '20:36',
      endTime: '21:06',
      status: 4,
      isRescheduled: false,
      bookingNo: 3,
      sessionNo: 1,
      mentor: {
        _id: '65fd1f252281ddfdfa925db1',
        firstName: 'Amit',
        lastName: 'kumar',
        email: 'rahul@gmail.com',
        role: 'MENTOR',
        avatar_url:
          'https://mentoredapp.s3.amazonaws.com/media/65fd0b4c1b1def5eab6dd003/1711082451401_57ebc8b1-cccc-4101-b400-bf00f04610a82866430971597795332.jpg'
      },
      user: {
        _id: '65fd0b4c1b1def5eab6dd003',
        firstName: 'Rahul',
        lastName: 'kumar',
        email: 'rahul@gmail.com',
        role: 'MENTEE',
        avatar_url:
          'https://mentoredapp.s3.amazonaws.com/media/65fd0b4c1b1def5eab6dd003/1711082451401_57ebc8b1-cccc-4101-b400-bf00f04610a82866430971597795332.jpg'
      },
      recording: {
        isRecording: false,
        members: -4,
        recordingUrl:
          'https://mentoredapp.s3.eu-north-1.amazonaws.com/recording/65fd27171b1def5eab6dd2a8/0550ba19ea4e71536ac8ce832d34f70e_65fd27171b1def5eab6dd2a8.m3u8',
        resourceId:
          'Uen93K7XY5pHmryu_Tj_3b2Bhw_DlL1cMckSF6NEl6itzNmaH094m6aqhCXkc_vUiicuw65C7Tn5ppdg3lktwA2Ew8iFir1q6A5QStWoRvilTYCoqhyLb31wbgYWyXzNt-BAuHxG4gzbXPJyDdc8lYRQ__PONk41pfUwadY69NTFNPD5BAYJ7ETVjK4HC9v4RBZ8tq_GUDmktRlnSpS_Vgsu_zDSZfAHEqwLsRM_SLw',
        sid: '0550ba19ea4e71536ac8ce832d34f70e',
        userJoinAt: '2024-03-22T07:01:50.339Z',
        mentorLeaveAt: '2024-03-22T07:06:20.787Z',
        userLeaveAt: '2024-03-22T07:06:24.367Z'
      },
      createdAt: '2024-03-22T06:37:11.479Z',
      updatedAt: '2024-03-22T07:06:24.369Z',
      __v: 0,
      acceptedAt: '2024-03-22T06:37:19.858Z'
    },
    {
      isExtended: false,
      _id: '65f885c3445c887671dcc5bd',
      bookingDate: '2024-03-19T00:00:00.000Z',
      bookingTimeStart: '11:45 PM',
      bookingTimeEnd: '11:48 PM',
      status: 4,
      isRescheduled: false,
      bookingNo: 2,
      sessionNo: 1,
      mentor: {
        _id: '65f87819d2b260394f0cb66e',
        avatar_url:
          'https://mentoredapp.s3.eu-north-1.amazonaws.com/media/65d0630fd2b260394f013829/1710434066639_image_picker_2B439656-F202-44D7-B7FB-B014BF6A70C9-17881-000001BE4904CAAB.jpg',
        email: 'profpeter@gmail.com',
        firstName: 'Peter Virdee',
        lastName: '',
        role: 'MENTOR'
      },
      user: {
        _id: '65e21aca4a12d6bcb6b23297',
        firstName: 'Nakul',
        lastName: 'Arya',
        email: 'nakularya@yopmail.com',
        role: 'MENTEE',
        avatar_url:
          'https://mentoredapp.s3.eu-north-1.amazonaws.com/media/65e21aca4a12d6bcb6b23297/1709317200764_IMG_3667.jpg'
      },
      createdAt: '2024-03-18T18:19:47.597Z',
      updatedAt: '2024-03-19T18:20:13.141Z',
      __v: 0,
      acceptedAt: '2024-03-18T18:29:02.422Z',
      recording: {
        isRecording: false,
        members: -6,
        userJoinAt: '2024-03-19T18:15:38.691Z',
        recordingUrl:
          'https://mentoredapp.s3.eu-north-1.amazonaws.com/recording/65f885c3445c887671dcc5bd/2ae2c22d544b7c7371a09d87ffe37f01_65f885c3445c887671dcc5bd.m3u8',
        resourceId:
          'lR4i-pjHWdG43YEYn8LMXT5gDy83QsV4LFoM5tw3MftfMlvVN4eHtHwlhkvH67ZMxnanUb8J5sgGT3iZs_-CZ1t8MvzAFF7RrHFFQl8FxgqwGJsynW9lUhxH0K9F9P6nL5ZlTOEwdJ-Pkxg5lFEiserOVbRIGRBrJDsXFKtTkhCUtzTVmGoDc8BEM_41LccuS82QPbqmhPu99sQOQr0HRqC4-hNSfm4H1nufqM2GlWc',
        sid: '2ae2c22d544b7c7371a09d87ffe37f01',
        userLeaveAt: '2024-03-19T18:20:11.877Z',
        mentorLeaveAt: '2024-03-19T18:20:13.141Z'
      }
    },
    {
      isExtended: false,
      _id: '65f6e13de940bd75c39d7b63',
      bookingDate: '2024-03-23T00:00:00.000Z',
      bookingTimeStart: '06:30 AM',
      bookingTimeEnd: '07:00 AM',
      status: 1,
      isRescheduled: false,
      bookingNo: 1,
      sessionNo: 1,
      mentor: {
        _id: '65ca24f11f32ab516b2e36b9',
        firstName: 'Gur',
        lastName: '',
        email: 'test6901@yopmail.com',
        role: 'MENTOR',
        avatar_url:
          'https://mentoredapp.s3.amazonaws.com/media/65ca24f11f32ab516b2e36b9/1710527064567_2841231c-dccd-4417-af3d-0f4442d72e4a4919985511738191465.jpg'
      },
      user: {
        _id: '65f49f06b77a67ef311af822',
        firstName: 'Charul',
        lastName: 'Dagar ',
        email: 'dagarcharul@gmail.com',
        role: 'MENTEE',
        avatar_url: 'https://mentoredapp.s3.amazonaws.com/media/65f49f06b77a67ef311af822/1710530334346_1000044393.jpg'
      },
      createdAt: '2024-03-17T12:25:33.424Z',
      updatedAt: '2024-03-21T16:23:47.054Z',
      __v: 0,
      acceptedAt: '2024-03-17T12:25:55.726Z',
      recording: {
        isRecording: false,
        members: -25,
        mentorLeaveAt: '2024-03-21T16:23:47.053Z'
      }
    },
    {
      isExtended: false,
      bookingNo: 0,
      sessionNo: 0,
      recording: {
        isRecording: false,
        members: 0
      },
      _id: '65f549bfb77a67ef311afd3d',
      bookingDate: '2024-03-16T00:00:00.000Z',
      bookingTimeStart: '04:00 PM',
      bookingTimeEnd: '04:30 PM',
      status: 4,
      isRescheduled: false,
      mentor: {
        _id: '65ca24f11f32ab516b2e36b9',
        firstName: 'Gur',
        lastName: '',
        email: 'test6901@yopmail.com',
        role: 'MENTOR',
        avatar_url:
          'https://mentoredapp.s3.amazonaws.com/media/65ca24f11f32ab516b2e36b9/1710527064567_2841231c-dccd-4417-af3d-0f4442d72e4a4919985511738191465.jpg'
      },
      user: {
        _id: '65f49f06b77a67ef311af822',
        firstName: 'Charul',
        lastName: 'Dagar ',
        email: 'dagarcharul@gmail.com',
        role: 'MENTEE',
        avatar_url: 'https://mentoredapp.s3.amazonaws.com/media/65f49f06b77a67ef311af822/1710530334346_1000044393.jpg'
      },
      createdAt: '2024-03-16T07:26:55.982Z',
      updatedAt: '2024-03-16T12:26:00.955Z',
      __v: 0,
      acceptedAt: '2024-03-16T12:26:00.955Z'
    },
    {
      isExtended: false,
      bookingNo: 0,
      sessionNo: 0,
      recording: {
        isRecording: false,
        members: 0
      },
      _id: '65f54979b77a67ef311afcfe',
      bookingDate: '2024-03-16T00:00:00.000Z',
      bookingTimeStart: '11:00 PM',
      bookingTimeEnd: '11:30 PM',
      status: 4,
      isRescheduled: false,
      mentor: {
        _id: '65ca24f11f32ab516b2e36b9',
        firstName: 'Gur',
        lastName: '',
        email: 'test6901@yopmail.com',
        role: 'MENTOR',
        avatar_url:
          'https://mentoredapp.s3.amazonaws.com/media/65ca24f11f32ab516b2e36b9/1710527064567_2841231c-dccd-4417-af3d-0f4442d72e4a4919985511738191465.jpg'
      },
      user: {
        _id: '65f49f06b77a67ef311af822',
        firstName: 'Charul',
        lastName: 'Dagar ',
        email: 'dagarcharul@gmail.com',
        role: 'MENTEE',
        avatar_url: 'https://mentoredapp.s3.amazonaws.com/media/65f49f06b77a67ef311af822/1710530334346_1000044393.jpg'
      },
      createdAt: '2024-03-16T07:25:45.019Z',
      updatedAt: '2024-03-16T07:32:43.455Z',
      __v: 0
    },
    {
      isExtended: false,
      bookingNo: 0,
      sessionNo: 0,
      recording: {
        isRecording: false,
        members: 0
      },
      _id: '65f54949b77a67ef311afccb',
      bookingDate: '2024-03-16T00:00:00.000Z',
      bookingTimeStart: '10:30 PM',
      bookingTimeEnd: '11:00 PM',
      status: 4,
      isRescheduled: false,
      mentor: {
        _id: '65ca24f11f32ab516b2e36b9',
        firstName: 'Gur',
        lastName: '',
        email: 'test6901@yopmail.com',
        role: 'MENTOR',
        avatar_url:
          'https://mentoredapp.s3.amazonaws.com/media/65ca24f11f32ab516b2e36b9/1710527064567_2841231c-dccd-4417-af3d-0f4442d72e4a4919985511738191465.jpg'
      },
      user: {
        _id: '65f49f06b77a67ef311af822',
        firstName: 'Charul',
        lastName: 'Dagar ',
        email: 'dagarcharul@gmail.com',
        role: 'MENTEE',
        avatar_url: 'https://mentoredapp.s3.amazonaws.com/media/65f49f06b77a67ef311af822/1710530334346_1000044393.jpg'
      },
      createdAt: '2024-03-16T07:24:57.553Z',
      updatedAt: '2024-03-16T07:27:24.617Z',
      __v: 0,
      acceptedAt: '2024-03-16T07:27:24.617Z'
    }
  ])
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')

  const otherColumns: GridColDef[] = [
    {
      flex: 0.125,
      minWidth: 180,
      field: '0',
      headerName: 'Created At',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {format(new Date(params.row.createdAt), 'dd MMMM yyyy HH:mm aa')}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 180,
      field: '1',
      headerName: 'Accepted',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {format(new Date(params.row.acceptedAt), 'dd MMMM yyyy HH:mm aa')}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 150,
      field: '4',
      headerName: 'Completed',
      renderCell: () => {
        return <div>14/02/2024 12:24 PM</div>
      }
    },
    {
      flex: 0.125,
      minWidth: 180,
      field: '3',
      headerName: 'Cancelled',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {format(new Date(params.row.cancelAt), 'dd MMMM yyyy HH:mm aa')}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 150,
      field: '2',
      headerName: 'Declined',
      renderCell: () => {
        return <div>13/02/2024 12:24 PM</div>
      }
    },
    {
      flex: 0.125,
      minWidth: 150,
      field: 'rescheduled',
      headerName: 'Rescheduled',
      renderCell: () => {
        return <div>12/02/2024 12:24 PM</div>
      }
    }
  ]

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 140,
      field: 'bookingNo',
      headerName: 'Session No',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {row?.bookingNo || ''}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 240,
      field: 'full_name',
      headerName: 'Mentee',
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
                  {`${row.user.firstName} ${row.user.lastName}`}
                </Typography>
                <Typography noWrap variant='caption'>
                  {row.user.email}
                </Typography>
              </Box>
            </Box>
          </Link>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 240,
      field: 'matched',
      headerName: 'Mentor',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Link href={'mentors/view/1'} style={{ textDecoration: 'none' }}>
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
                  {`${row.mentor.firstName} ${row.mentor.lastName}`}
                </Typography>
                <Typography noWrap variant='caption'>
                  {row.mentor.email}
                </Typography>
              </Box>
            </Box>
          </Link>
        )
      }
    },
    {
      flex: 0.175,
      type: 'date',
      minWidth: 120,
      headerName: 'Date',
      field: 'bookingDate',
      valueGetter: params => new Date(params.value),
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {format(new Date(params.row.bookingDate), 'dd MMMM yyyy')}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'bookingTimeStart',
      headerName: 'Start Time',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {row?.bookingTimeStart || ''}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'bookingTimeEnd',
      headerName: 'End Time',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {row?.bookingTimeEnd || ''}
          </Typography>
        )
      }
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => {
        const statuses: { [key: string]: Status } = {
          0: {
            label: 'Pending',
            color: 'info'
          },
          1: {
            label: 'Accepted',
            color: 'primary'
          },
          2: {
            label: 'Declined',
            color: 'error'
          },
          3: {
            label: 'Cancelled',
            color: 'warning'
          },
          4: {
            label: 'Completed',
            color: 'success'
          }
        }

        return (
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={statuses[`${params?.row?.status}`]?.color}
            label={statuses[`${params?.row?.status}`]?.label}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'ratings',
      headerName: 'Ratings',
      renderCell: () => {
        return <Rating defaultValue={Math.random() * 5} precision={0.5} name='half-rating' />
      }
    }
  ]

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(false)
    setActiveTab(value)
  }

  const getMentors = async () => {
    try {
      setIsLoading(true)
      const response = (await get(`/admin/sessions?status=${activeTab}&page=${paginationModel.page + 1}&limit=${
        paginationModel.pageSize
      }&search=${searchTerm}
      `)) as {
        data: SESSIONS[]
        count: number
      }
      setIsLoading(false)
      if (response) {
        setSessions(response?.data || [])
        setTotal(response?.count || 0)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMentors()
  }, [paginationModel, activeTab, debouncedSearchTerm])

  return (
    <Grid container spacing={6}>
      <PageHeader
        hide
        title='SESSIONS'
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
          <TabContext value={activeTab}>
            <TabList
              variant='scrollable'
              scrollButtons='auto'
              onChange={handleChange}
              aria-label='forced scroll tabs example'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab value='-1' label='All' />
              <Tab value='0' label='Pending' />
              <Tab value='1' label='Accepted' />
              <Tab value='2' label='Declined' />
              <Tab value='3' label='Cancelled' />
              <Tab value='4' label='Completed' />
            </TabList>
          </TabContext>
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
                columns={[
                  ...columns,
                  ...otherColumns?.filter(ele => (activeTab === '-1' ? false : ele.field === activeTab))
                ]}
                rows={sessions || []}
                total={total}
              />
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Sessions
