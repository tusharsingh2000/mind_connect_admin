// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Type Imports
import { CardStatsWithAreaChartProps } from 'src/@core/components/card-statistics/types'

// ** Custom Component Imports
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

const CardStatsWithAreaChart = (props: CardStatsWithAreaChartProps) => {
  // ** Props
  const { sx, stats, title, avatarIcon, avatarSize = 42, avatarColor = 'primary', avatarIconSize = '1.625rem' } = props

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ pb: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <CustomAvatar skin='light' color={avatarColor} sx={{ mb: 2.5, width: avatarSize, height: avatarSize }}>
          <Icon icon={avatarIcon} fontSize={avatarIconSize} />
        </CustomAvatar>
        <Typography variant='h5'>{stats}</Typography>
        <Typography variant='body2'>{title}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsWithAreaChart
