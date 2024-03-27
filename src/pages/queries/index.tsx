import { useEffect, useState } from 'react'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Divider } from '@mui/material'
import { get } from 'src/utils/AxiosMethods'
import { QUERY } from 'src/types/General'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { getInitials } from 'src/@core/utils/get-initials'
import TableColumns from 'src/@core/components/table'
import { isValidInput } from 'src/utils/validations'
import PageHeader from 'src/@core/components/page-header'

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params

  if (row?.userId?.avatar_url?.length) {
    return <CustomAvatar src={row?.userId?.avatar_url || ''} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar skin='light' sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(`${row?.userId?.firsName || 'P'} ${row?.userId?.firsName || 'V'}`)}
      </CustomAvatar>
    )
  }
}

const Queries = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [queries, setQueries] = useState<QUERY[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')
  const [totalCount, setTotalCount] = useState<number>(0)

  const getQueries = async () => {
    try {
      setIsLoading(true)
      const response = (await get(
        `/admin/contact-support?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}&search=${searchTerm}`
      )) as {
        contactSupport: QUERY[]
        supportCount: number
      }
      setIsLoading(false)
      if (response) {
        setQueries(response?.contactSupport || [])
        setTotalCount(response?.supportCount || 0)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getQueries()
  }, [paginationModel, debouncedSearchTerm])

  const columns: GridColDef[] = [
    {
      flex: 0.15,
      minWidth: 120,
      field: 'full_name',
      headerName: 'User',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
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
                {`${row?.userId?.firstName || ''} ${row?.userId?.lastName || ''}`}
              </Typography>
              <Typography noWrap variant='caption'>
                {row?.userId?.email || ''}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'contact_name',
      headerName: 'Contact Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {`${row?.name || ''}`}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'contact_email',
      headerName: 'Contact Email',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {`${row?.email || ''}`}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 110,
      headerAlign: 'center',
      field: 'age',
      headerName: 'Query',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {`${row?.message || ''}`}
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
        const statuses = {
          1: {
            label: 'In Progress',
            color: 'primary'
          },
          0: {
            label: 'Pending',
            color: 'info'
          },
          2: {
            label: 'Completed',
            color: 'success'
          },
          3: {
            label: 'Closed',
            color: 'error'
          },
          4: {
            label: 'On Hold',
            color: 'secondary'
          }
        }

        return (
          <CustomChip
            rounded
            size='small'
            skin='light'
            // @ts-ignore
            color={statuses[`${params?.row?.action}`]?.color}
            // @ts-ignore
            label={statuses[`${params?.row?.action}`]?.label}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <PageHeader
        title='Queries'
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
        <Box sx={{ mt: 5 }}>
          {isLoading ? (
            <Box
              onClick={() => setIsLoading(false)}
              sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            <TableColumns
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              columns={columns}
              rows={queries || []}
              total={totalCount}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Queries
