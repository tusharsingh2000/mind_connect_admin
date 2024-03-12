import { Box, Button } from '@mui/material'

const Registration = () => {
  return (
    <Box>
      <Box maxWidth={300} my={5}>
        <Button fullWidth size='large' variant='outlined'>
          SET NEW PASSWORD
        </Button>
      </Box>
      <Box maxWidth={300} my={5}>
        <Button fullWidth size='large' variant='outlined'>
          SET NEW E-MAIL
        </Button>
      </Box>
      <Box maxWidth={300} my={5}>
        <Button fullWidth size='large' variant='outlined'>
          SET NEW MENTEE
        </Button>
      </Box>
    </Box>
  )
}

export default Registration
