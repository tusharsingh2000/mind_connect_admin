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
  email: yup.string().email().min(6).required('This is a required field')
})

const defaultValues = {
  email: ''
}

interface FormData {
  email: string
}

const SetEmailForm = () => {
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
      const response = await patch(`/admin/mentor-email-change/${router?.query?.mentorId}`, {
        password: data.email
      })
      if (response) {
        toast.success(`Email updated successfully`)
        resetField('email')
        handleClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <Button variant='outlined' fullWidth size='large' onClick={handleClickOpen}>
        SET NEW E-MAIL
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            SET NEW E-MAIL
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box display={'flex'} gap={5} flexDirection='column'>
              <Box>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={val => onChange(val.target.value.trim())}
                      placeholder='Email'
                      variant='standard'
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
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

export default SetEmailForm
