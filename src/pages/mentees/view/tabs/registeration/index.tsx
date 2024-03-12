import { Box } from '@mui/material'
import Documents from './Documents'
import Questionnare from './Questionnare'

const Registration = () => {
  return (
    <Box>
      <Box>
        <Documents />
      </Box>
      <Box mt={10}>
        <Questionnare />
      </Box>
    </Box>
  )
}

export default Registration
