// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { patch } from 'src/utils/AxiosMethods'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

const schema = yup.object().shape({
  password: yup
    .string()
    .required('This is a required field')
    .matches(
      /^(?=.*[0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      'New password must be 8-20 characters long and have at least 1 number or special character'
    ),
  confirmPassword: yup
    .string()
    .required('This is a required field')
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
})

const defaultValues = {
  password: '',
  confirmPassword: ''
}

interface FormData {
  password: string
  confirmPassword: string
}

const ChangePasswordForm = () => {
  const router = useRouter()
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const {
    control,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await patch(`/admin/mentor-password-change/${router?.query?.mentorId}`, {
        password: data.password
      })
      if (response) {
        toast.success(`Password updated successfully`)
        resetField('password')
        resetField('confirmPassword')
        handleClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <Button variant='outlined' fullWidth size='large' onClick={handleClickOpen}>
        SET NEW PASSWORD
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            SET NEW PASSWORD
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box display={'flex'} gap={5} flexDirection='column'>
              <Box>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Password'
                      value={value}
                      onBlur={onBlur}
                      onChange={val => onChange(val.target.value.trim())}
                      placeholder='Password'
                      variant='standard'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Confirm Password'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Confirm Password'
                      variant='standard'
                      error={Boolean(errors.confirmPassword)}
                      {...(errors.confirmPassword && { helperText: errors.confirmPassword.message })}
                    />
                  )}
                />
              </Box>
              <Box display={'flex'} gap={5}>
                <Button onClick={() => setOpen(false)} fullWidth variant='outlined' size='large'>
                  Cancel
                </Button>
                <Button type='submit' fullWidth variant='contained' size='large'>
                  Set
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default ChangePasswordForm
