import { useRef, useState } from 'react'
import { Avatar, Box, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Icon } from '@iconify/react'
import GoBackButton from 'src/@core/components/buttons/goBackButton'

type DateType = Date | null | undefined

const topics = [
  'Real Estate Business',
  'Entrepreneur',
  'Cardiology',
  'Stock Business',
  'Dentist',
  'Surgery',
  'Neurology'
]

const Profile = () => {
  const [date, setDate] = useState<DateType>(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    // @ts-ignore
    fileInputRef?.current?.click()
  }

  const handleFileChange = (event: any) => {
    const file = event?.target?.files[0]
    // Handle the file upload logic here
  }

  const Cells = ({ title }: { title: string }) => {
    let selected = !!(title === 'Real Estate Business')
    return (
      <Box
        py={2}
        px={5}
        m={2}
        display='inline'
        borderRadius={1}
        sx={{
          backgroundColor: selected ? '#EA7A20' : '#FFF3EA',
          color: selected ? '#FFF' : '#EA7A20'
        }}
        fontSize={12}
      >
        {title}
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GoBackButton />
        <Box
          onClick={handleClick}
          mt={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
            cursor: 'pointer',
            background: '#FFF3EA',
            borderRadius: 100,
            border: '8px solid white',
            position: 'relative'
          }}
        >
          <Icon color='#EA7A20' fontSize={50} icon='teenyicons:user-solid' />
          <Box
            sx={{
              background: 'white',
              position: 'absolute',
              bottom: -5,
              right: -5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 35,
              height: 35,
              borderRadius: 100
            }}
          >
            <Icon fontSize={16} color='#EA7A20' icon='fa-regular:edit' />
          </Box>
        </Box>
        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Grid>
      <Grid item md={6} borderRight='0.1px solid #7a7a7a' pr={5}>
        <Box p={5}>
          <Box mb={5}>
            <TextField label='First Name' variant='standard' fullWidth />
          </Box>
          <Box mb={5}>
            <TextField label='Last Name' variant='standard' fullWidth />
          </Box>
          <Box mb={5}>
            <TextField label='Phone Number' variant='standard' fullWidth />
          </Box>
          <Box mb={5}>
            <TextField label='Email' type={'email'} variant='standard' fullWidth />
          </Box>
          <Box mb={5}>
            <DatePicker
              selected={date}
              id='basic-input'
              popperPlacement={'bottom'}
              onChange={(date: Date) => setDate(date)}
              placeholderText='DOB'
              customInput={
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Icon fontSize={24} style={{ margin: 2 }} icon='solar:calendar-bold' />
                      </InputAdornment>
                    )
                  }}
                  variant='standard'
                  fullWidth
                  label='DOB'
                />
              }
            />
          </Box>
          <Box mb={5}>
            <TextField select label='Companies' variant='standard' fullWidth>
              <MenuItem value={10}>1</MenuItem>
              <MenuItem value={20}>2</MenuItem>
              <MenuItem value={30}>3</MenuItem>
            </TextField>
          </Box>
          <Box mb={5}>
            <TextField select label='No. of Employee' variant='standard' fullWidth>
              <MenuItem value={10}>1</MenuItem>
              <MenuItem value={20}>2</MenuItem>
              <MenuItem value={30}>3</MenuItem>
            </TextField>
          </Box>
          <Box mb={5}>
            <TextField select label='Revenue' variant='standard' fullWidth>
              <MenuItem value={10}>1</MenuItem>
              <MenuItem value={20}>2</MenuItem>
              <MenuItem value={30}>3</MenuItem>
            </TextField>
          </Box>
          <Box mb={5}>
            <TextField label='About' multiline rows={3} variant='standard' fullWidth />
          </Box>
          <Box mb={5}>
            <TextField label='Languages Known' variant='standard' fullWidth />
          </Box>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box p={5}>
          <Box>
            <Typography fontSize={18} fontWeight={600}>
              Topics of interest
            </Typography>
            <Box py={5} display='flex' flexWrap='wrap'>
              {topics?.map((item, index) => (
                <Cells title={item} key={index} />
              ))}
            </Box>
          </Box>
          <Box mt={2}>
            <Typography fontSize={18} fontWeight={600}>
              Add Social Media Platforms
            </Typography>
            <Typography fontSize={16} fontWeight={300} mb={5}>
              Add link of all social media Platform here!
            </Typography>
            <Box mb={5}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon fontSize={20} icon='logos:facebook' />
                    </InputAdornment>
                  )
                }}
                label='Link Title'
                variant='standard'
                fullWidth
                value='Facebook'
              />
            </Box>
            <Box mb={5}>
              <TextField fullWidth variant='standard' label='URL' />
            </Box>
            <Box mb={5}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon fontSize={20} icon='skill-icons:instagram' />
                    </InputAdornment>
                  )
                }}
                label='Link Title'
                variant='standard'
                fullWidth
                value='Instagram'
              />
            </Box>
            <Box mb={5}>
              <TextField fullWidth variant='standard' label='URL' />
            </Box>
            <Box mb={5}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon fontSize={20} icon='devicon:twitter' />
                    </InputAdornment>
                  )
                }}
                label='Link Title'
                variant='standard'
                fullWidth
                value='Twitter'
              />
            </Box>
            <Box mb={5}>
              <TextField fullWidth variant='standard' label='URL' />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Profile
