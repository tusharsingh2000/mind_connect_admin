import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Box, Button, Dialog, DialogContent, DialogTitle, MenuItem, TextField, Typography } from '@mui/material'
import { get, post } from 'src/utils/AxiosMethods'
import { BASE_URL } from 'src/configs/auth'

// ** Third Party Imports
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import CustomTextField from 'src/@core/components/mui/text-field'

const schema = yup.object().shape({
  token: yup.string().required('This is a required field')
})

const defaultValues = {
  token: ''
}

interface FormData {
  token: string
}

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [qr, setQr] = useState('')
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
      const response = await post('/auth/enable/disable-2fa', {
        token: data.token,
        action: isEnabled ? 'disable' : 'enable'
      })
      if (response) {
        toast.success(`added successfully`)
        // toast.success(`${Number(data.type) === 0 ? `Do's` : `Dont's`} added successfully`)
        resetField('token')
        handleClose()
        check2FA()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const get2FAToken = async () => {
    try {
      setLoading(true)
      const response = (await get(`${BASE_URL}/auth/generate-2fa`)) as string
      setLoading(false)
      if (response) {
        setQr(response)
        handleClickOpen()
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const check2FA = async () => {
    try {
      setLoading(true)
      const response = (await get(`${BASE_URL}/auth/check-2fa?role=ADMIN`)) as {
        isTwoFactorAuthenticationEnabled: boolean
      }
      setLoading(false)
      if (response) {
        setIsEnabled(response?.isTwoFactorAuthenticationEnabled)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    check2FA()
  }, [])

  return (
    <Grid container spacing={6} width='50%'>
      <Box m={5}>
        <Typography fontSize={32} fontWeight={700}>
          Settings
        </Typography>
      </Box>
      {/* <Grid item xs={12}>
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
    </Grid> */}
      <Grid item xs={12}>
        <Typography>{'Enable/Disable 2FA'}</Typography>
        <Box my={5}>
          <Button onClick={get2FAToken} variant='contained'>
            {isEnabled ? 'Disable' : 'Enable'}
          </Button>
        </Box>
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Enter code
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display={'flex'} alignItems='center' justifyContent={'center'}>
            {qr?.length ? <img src={qr} /> : null}
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                name='token'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='You will get the code by scanning this in google authenticator app'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Code'
                    variant='standard'
                    error={Boolean(errors.token)}
                    {...(errors.token && { helperText: errors.token.message })}
                  />
                )}
              />
            </Box>
            <Button sx={{ marginTop: 5 }} type='submit' fullWidth variant='contained' size='large'>
              {isEnabled ? 'Disable' : 'Enable'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default Settings
