// ** React Imports
import { Fragment, ReactNode, SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { styled, Theme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Util Import
import { formatDistanceToNow } from 'date-fns'
import { Notifications } from 'src/types/General'
import { get } from 'src/utils/AxiosMethods'

export type NotificationsType = {
  meta: string
  title: string
  subtitle: string
} & (
  | { avatarAlt: string; avatarImg: string; avatarText?: never; avatarColor?: never; avatarIcon?: never }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText: string
      avatarIcon?: never
      avatarColor?: ThemeColor
    }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText?: never
      avatarIcon: ReactNode
      avatarColor?: ThemeColor
    }
)
interface Props {
  settings: Settings
  notifications: NotificationsType[]
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4.25),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0,
    '& .MuiMenuItem-root': {
      margin: 0,
      borderRadius: 0,
      padding: theme.spacing(4, 6),
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>({
  fontWeight: 500,
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const NotificationDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const [count, setCount] = useState(0)
  const [notifications, setNotifications] = useState<Notifications[]>([])

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // ** Vars
  const { direction, mode } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const getNotificationsCount = async () => {
    try {
      const response = (await get(`admin/unread-notification`)) as { count: number }
      if (response?.count) {
        setCount(response.count)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getNotifications = async () => {
    try {
      const response = (await get(`notification`)) as Notifications[]
      if (response?.length) {
        setNotifications(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // getNotificationsCount()
    // getNotifications()
  }, [])

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Box
          sx={{
            border: '1px solid rgba(208, 212, 241, 0.5)',
            height: 42,
            width: 42,
            marginLeft: 2,
            borderRadius: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          {count ? (
            <Box
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                background: '#3460AE',
                height: 20,
                width: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100
              }}
            >
              <Typography fontSize={10} color={'#ffffff'}>
                1
              </Typography>
            </Box>
          ) : null}
          <Icon
            color={mode === 'light' ? 'rgba(47, 43, 61, 0.5)' : 'rgba(208, 212, 241, 0.5)'}
            fontSize={24}
            icon='clarity:notification-line'
          />
        </Box>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant='h5' sx={{ cursor: 'text' }}>
              Notifications
            </Typography>
            <CustomChip skin='light' size='small' color='primary' label={`${count} New`} />
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
          {notifications.map((notification: Notifications, index: number) => (
            <MenuItem key={index} disableRipple disableTouchRipple onClick={handleDropdownClose}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                {notification?.isRead ? null : (
                  <Box sx={{ height: 10, width: 10, background: '#3460AE', borderRadius: 100 }} />
                )}
                <Box sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{notification?.title || ''}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>{notification?.body || ''}</MenuItemSubtitle>
                </Box>
                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                  {formatDistanceToNow(new Date(notification?.createdAt), { addSuffix: true })}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        {/* <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem> */}
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
