// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Box, MenuItem, TextField, Typography } from '@mui/material'

const Settings = () => {
  return (
    <Grid container spacing={6} width='50%'>
      <Box m={5}>
        <Typography fontSize={32} fontWeight={700}>
          Settings
        </Typography>
      </Box>
      <Grid item xs={12}>
        <Box mb={5}>
          <TextField label='Company Address' variant='standard' fullWidth />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mb={5}>
          <TextField label='Phone Number' variant='standard' fullWidth />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mb={5}>
          <TextField select label='Slot Duration' variant='standard' fullWidth>
            <MenuItem value={10}>15</MenuItem>
            <MenuItem value={20}>30</MenuItem>
            <MenuItem value={30}>45</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={90}>90</MenuItem>
            <MenuItem value={120}>120</MenuItem>
          </TextField>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Settings
