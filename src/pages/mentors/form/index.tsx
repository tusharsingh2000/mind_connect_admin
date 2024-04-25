// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import { Box } from '@mui/system'
import { IconButton, Typography } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from 'src/@core/components/mui/text-field'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import { post } from 'src/utils/AxiosMethods'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[^0-9]*$/, 'First name should not contain numbers')
    .required('This is a required field')
    .max(35, 'Maximum 35 characters are allowed'),
  lastName: yup
    .string()
    .matches(/^[^0-9]*$/, 'Last name should not contain numbers')
    .required('This is a required field')
    .max(35, 'Maximum 35 characters are allowed'),
  email: yup
    .string()
    .email()
    .min(6, 'Email must be at least 6 characters')
    .required('This is a required field')
    .max(35, 'Maximum 35 characters are allowed')
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
  const [phone, setPhone] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [countryCode, setCountryCode] = useState<string>('+49')
  const [countryCodeIso, setCountryCodeIso] = useState<string>('de')

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
    resetField
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const handleChangePhone = (phone: any, country: any) => {
    setPhone(phone?.replace(country.dialCode, ''))
    setCountryCode(`+${country?.dialCode || ''}`)
    setCountryCodeIso(`+${country?.countryCode || ''}`)
  }

  const onSubmit = async (data: FormData) => {
    if (phone?.length < 8) {
      return
    }
    try {
      const response = await post('/admin/addMentor', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone,
        countryCode,
        countryCodeIso
      })
      if (response) {
        toast.success('Mentor created successfully')
        resetField('email')
        resetField('firstName')
        resetField('lastName')
        setPhone('')
        setCountryCode('+49')
        setCountryCodeIso('de')
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <Button variant='outlined' size='medium' onClick={handleClickOpen}>
        + Add new Mentor
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={24} fontWeight={600}>
            Add Mentor
          </Typography>
          <IconButton onClick={handleClose}>
            <Icon icon='ri:close-fill' height={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                <PhoneInput
                  enableSearch={true}
                  value={countryCode + phone}
                  country={'us'}
                  inputStyle={{
                    width: '100%',
                    height: 20,
                    borderColor: submitted && !phone?.length ? '#EA5455' : undefined
                  }}
                  inputClass='form-control'
                  buttonClass='phoneBtn'
                  placeholder=''
                  onChange={(phone, country) => handleChangePhone(phone, country)}
                />
                <Typography color={'#EA5455'} fontSize={14}>
                  {submitted
                    ? !phone?.length
                      ? 'This is a required field'
                      : phone?.length < 8
                      ? 'Please enter a valid phone number'
                      : ''
                    : ''}
                </Typography>
              </Box>
              <Button type='submit' onClick={() => setSubmitted(true)} variant='contained'>
                Get Link
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AsiignMenteeForm
