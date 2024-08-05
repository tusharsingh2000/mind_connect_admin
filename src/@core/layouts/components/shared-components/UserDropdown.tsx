// ** React Imports
import { Fragment, SyntheticEvent, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { Settings } from 'src/@core/context/settingsContext'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { post } from 'src/utils/AxiosMethods'
import * as yup from 'yup'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  const handleDialogOpen = () => {
    handleDropdownClose()
    setOpen(true)
  }

  const handleDialogClose = () => {
    handleDropdownClose()
    setOpen(false)
  }

  // ** Validation Schema
  const schema = yup.object().shape({
    currentPassword: yup.string().required('Current Password is required'),
    newPassword: yup
      .string()
      .notOneOf([yup.ref('currentPassword')], 'New Password cannot be the same as Current Password')
      .required('New Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm New Password is required')
  })

  const defaultValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: any) => {
    console.log(data)
    try {
      const response = await post('changePassword', {
        oldPassword: data.currentPassword,
        password: data.newPassword
      })
      if (response) {
        toast.success('Password changed successfully')
        handleDialogClose()
        resetField('confirmPassword')
        resetField('newPassword')
        resetField('currentPassword')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt='John Doe'
          src='/images/avatars/1.png'
          onClick={handleDropdownOpen}
          sx={{ width: 38, height: 38 }}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItemStyled sx={{ p: 0 }} onClick={handleDialogOpen}>
          <Box sx={styles}>
            <Icon icon='material-symbols:password' />
            Change Password
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={handleLogout}>
          <Box sx={styles}>
            <Icon icon='tabler:logout' />
            Sign Out
          </Box>
        </MenuItemStyled>
      </Menu>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby='change-password-dialog-title'
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle id='change-password-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Change Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 4 }}>
              <Controller
                name='currentPassword'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Current Password'
                    type='password'
                    error={Boolean(errors.currentPassword)}
                    helperText={errors.currentPassword?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <Controller
                name='newPassword'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='New Password'
                    type='password'
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Confirm New Password'
                    type='password'
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Box>
            <Button onClick={handleSubmit(onSubmit)} fullWidth type='submit' variant='contained' sx={{ my: 5 }}>
              Change Password
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default UserDropdown
