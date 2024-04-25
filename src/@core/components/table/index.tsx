// ** React Imports
import { Dispatch, SetStateAction, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { DataGrid, GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { Box, Typography } from '@mui/material'

// // ** Data Import
// import rows from './data.json'

export interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

const TableColumns = ({
  columns,
  rows,
  total,
  paginationModel,
  setPaginationModel
}: {
  columns: GridColDef[]
  rows: any[]
  total: number
  paginationModel: { page: number; pageSize: number }
  setPaginationModel: Dispatch<SetStateAction<{ page: number; pageSize: number }>>
}) => {
  // ** States
  // const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [hideNameColumn, setHideNameColumn] = useState<GridColumnVisibilityModel>({ full_name: true })

  return (
    <Box>
      {rows?.length ? (
        <Card>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[7, 10, 25, 50]}
            paginationModel={paginationModel}
            paginationMode='server'
            getRowId={row => row?._id}
            rowCount={total || 0}
            columnVisibilityModel={hideNameColumn}
            onPaginationModelChange={setPaginationModel}
            onColumnVisibilityModelChange={newValue => setHideNameColumn(newValue)}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
          />
        </Card>
      ) : (
        <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>No data found</Typography>
        </Box>
      )}
    </Box>
  )
}

export default TableColumns
