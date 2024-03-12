// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Button } from '@mui/material'

const createData = (name: string, percentage: number) => {
  return { name, percentage }
}

const rows = [
  createData('Mr. Oliver_CV.pdf', 59),
  createData('Bank Statement.pdf', 37),
  createData('Business Plan.pdf', 62),
  createData('Certificate of Incorporation.pdf', 35),
  createData('VAT_Return.pdf', 56),
  createData('Referrals/Nominations.pdf', 26),
  createData('Code of conduct with sign.pdf', 26)
]

const Documents = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Documents</TableCell>
            <TableCell align='center'>AI Rate</TableCell>
            <TableCell align='center'>Files</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell sx={{ maxWidth: 300 }} component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='center'>{`${row.percentage}%`}</TableCell>
              <TableCell align='center'>
                <Button>View File</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Documents
