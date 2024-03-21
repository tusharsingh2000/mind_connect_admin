import { useState } from 'react'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Divider } from '@mui/material'
import PageHeader from 'src/@core/components/page-header'
import TableColumns, { StatusObj } from 'src/@core/components/table'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import Link from 'next/link'

const statusObj: StatusObj = {
  1: { title: 'accepted', color: 'primary' },
  2: { title: 'completed', color: 'success' },
  3: { title: 'cancelled', color: 'error' },
  4: { title: 'pending', color: 'warning' },
  5: { title: 'rescheduled', color: 'info' }
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

const Queries = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const columns: GridColDef[] = [
    {
      flex: 0.15,
      minWidth: 120,
      field: 'full_name',
      headerName: 'User',
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
      flex: 0.2,
      minWidth: 110,
      headerAlign: 'center',
      field: 'age',
      headerName: 'Query',
      renderCell: () => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 60,
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
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'ratings',
      headerName: 'Notes',
      renderCell: () => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <PageHeader title='Queries' />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ mt: 5 }}>
          {isLoading ? (
            <Box
              onClick={() => setIsLoading(false)}
              sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            <>{/* <TableColumns columns={columns} /> */}</>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Queries
