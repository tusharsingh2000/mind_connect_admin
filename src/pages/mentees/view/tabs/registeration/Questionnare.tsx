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
  createData('Tell us about your future Goals and Vision?', 59),
  createData('Why do you want to get mentoring?', 37),
  createData('Business Plan.pdf', 62),
  createData('What are your expectations from receiving mentoring?', 35),
  createData(
    'Tell us about your family background, parents, spouse, children. have your family been in or are they in business? ',
    56
  ),
  createData('What do they do? They have any involvement in charitable work, or do they have their own charity?', 26),
  createData('Have they been Mentored before? Who was it?', 26)
]

const Questionnare = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Questionnaires</TableCell>
            <TableCell align='center'>AI Rate</TableCell>
            <TableCell align='center'>Answers</TableCell>
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
                <Button>View Answer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Questionnare
