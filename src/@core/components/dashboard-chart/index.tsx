import { Dispatch, SetStateAction } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Custom Components Imports
import CustomTextField from '../mui/text-field'
import { MenuItem } from '@mui/material'

interface Props {
  data: any
  active: string
  setActive: Dispatch<SetStateAction<string>>
}

const CustomTooltip = (props: TooltipProps<any, any>) => {
  // ** Props
  const { active, payload } = props

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography sx={{ fontSize: theme => theme.typography.body2.fontSize }}>{`${payload[0].value}%`}</Typography>
      </div>
    )
  }

  return null
}

const RechartsLineChart = ({ data, active, setActive }: Props) => {
  return (
    <Card>
      <CardHeader
        title=''
        subheader=''
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <CustomTextField
            variant='filled'
            fullWidth
            size='small'
            select
            defaultValue={'WEEK'}
            id='custom-select'
            value={active}
            onChange={val => setActive(val.target.value)}
          >
            <MenuItem value={'WEEK'}>Weekly</MenuItem>
            <MenuItem value={'MONTH'}>Monthly</MenuItem>
            <MenuItem value={'YEAR'}>Yearly</MenuItem>
          </CustomTextField>
        }
      />
      <CardContent>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <LineChart height={350} data={data} margin={{ left: -20 }}>
              <CartesianGrid />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip content={CustomTooltip} />
              <Line type='monotone' dataKey='canceled' stroke='red' activeDot={{ r: 8 }} />
              <Line type='monotone' dataKey='completed' stroke='green' />
              <Line type='monotone' dataKey='rescheduled' stroke='yellow' />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box display={'flex'} gap={5} justifyContent='flex-end' my={5}>
          <Box display={'flex'} gap={2} alignItems='center'>
            <Box sx={{ background: 'green' }} height={10} width={10} borderRadius={100} />
            <Typography>Completed</Typography>
          </Box>
          <Box display={'flex'} gap={2} alignItems='center'>
            <Box sx={{ background: 'red' }} height={10} width={10} borderRadius={100} />
            <Typography>Cancelled</Typography>
          </Box>
          <Box display={'flex'} gap={2} alignItems='center'>
            <Box sx={{ background: 'yellow' }} height={10} width={10} borderRadius={100} />
            <Typography>Rescheduled</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsLineChart
