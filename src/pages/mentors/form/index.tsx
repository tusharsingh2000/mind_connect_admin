// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import { Box } from '@mui/system'
import { Input, Typography } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import CustomTextField from 'src/@core/components/mui/text-field'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

const schema = yup.object().shape({
  firstName: yup.string().required('This is a required field'),
  lastName: yup.string().required('This is a required field'),
  email: yup.string().email().min(6).required('This is a required field')
})

const defaultValues = {
  firstName: '',
  lastName: '',
  email: ''
}

interface FormData {
  firstName: string
  lastName: string
  email: string
}

const AsiignMenteeForm = () => {
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

  return (
    <Fragment>
      <Button variant='outlined' size='medium' onClick={handleClickOpen}>
        + Add new Mentor
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Add Mentor
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display={'flex'} gap={5} flexDirection='column'>
            <Box>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='First Name'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='First Name'
                    variant='standard'
                    error={Boolean(errors.firstName)}
                    {...(errors.firstName && { helperText: errors.firstName.message })}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Last Name'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Last Name'
                    variant='standard'
                    error={Boolean(errors.lastName)}
                    {...(errors.lastName && { helperText: errors.lastName.message })}
                  />
                )}
              />
            </Box>
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
                    onChange={onChange}
                    placeholder='Email'
                    variant='standard'
                    error={Boolean(errors.email)}
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Box>
            <Box>
              <label style={{ fontSize: 12, color: '#858585' }}>Phone Number</label>
              {/* <Input fullWidth type='email' placeholder='38748348' /> */}
              {/* <PhoneInput
                enableSearch={true}
                value={userData?.countryCode + userData?.phone}
                country={"us"}
                inputStyle={{
                  width: "100%",
                }}
                inputClass="form-control"
                buttonClass="phoneBtn"
                placeholder=""
                onChange={(phone, country) => handleChangePhone(phone, country)}
              /> */}
            </Box>
            <Button variant='contained'>Get Link</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AsiignMenteeForm
