import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import { get, post } from 'src/utils/AxiosMethods'
import { BASE_URL } from 'src/configs/auth'

// ** Third Party Imports
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import CustomTextField from 'src/@core/components/mui/text-field'
import { isValidInput } from 'src/utils/validations'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

const schema = yup.object().shape({
  token: yup.string().required('This is a required field').max(6, 'Maximim 6 characters are allowed')
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
  const [settingsData, setSettingsData] = useState({
    description: '',
    headline: '',
    address: '',
    slot: '',
    phone: ''
  })

  const [countryCode, setCountryCode] = useState<string>('+49')
  const [countryCodeIso, setCountryCodeIso] = useState<string>('de')

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

  const handleChangePhone = (phoneNum: any, country: any) => {
    setSettingsData({
      ...settingsData,
      phone: phoneNum?.replace(country.dialCode, '')
    })
    setCountryCode(`+${country?.dialCode || ''}`)
    setCountryCodeIso(`+${country?.countryCode || ''}`)
  }

  const onSubmit = async (data: FormData) => {
    try {
      const response = await post('/auth/enable/disable-2fa', {
        token: data.token,
        action: isEnabled ? 'disable' : 'enable'
      })
      if (response) {
        toast.success(`Added successfully`)
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

  const getSettings = async () => {
    try {
      setLoading(true)
      const response = (await get(`${BASE_URL}/common/settings`)) as {
        description: string
        headline: string
        phone: string
        address: string
        slot: string
      }

      if (response) {
        setSettingsData({
          description: response?.description || '',
          headline: response?.headline || '',
          address: response?.address || '',
          slot: response?.slot || '',
          phone: response?.phone || ''
        })
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const updateSettings = async () => {
    try {
      const response = await post(`${BASE_URL}/admin/settings`, { ...settingsData, countryCode, countryCodeIso })
      if (response) {
        toast.success('Updated Successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    check2FA()
    getSettings()
  }, [])

  if (loading) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={6} width='50%'>
      <Box m={5}>
        <Typography fontSize={32} fontWeight={700}>
          Settings
        </Typography>
      </Box>
      <Grid item xs={12}>
        <Box mb={5}>
          <TextField
            value={settingsData?.headline || ''}
            onChange={val => {
              if (val?.target?.value?.length < 50 && isValidInput(val.target.value)) {
                setSettingsData({
                  ...settingsData,
                  headline: val.target.value
                })
              }
            }}
            label='Headline'
            variant='standard'
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mb={5}>
          <TextField
            value={settingsData?.description || ''}
            onChange={val => {
              if (val.target.value?.length < 250 && isValidInput(val.target.value)) {
                setSettingsData({
                  ...settingsData,
                  description: val.target.value
                })
              }
            }}
            label='Description'
            variant='standard'
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mb={5}>
          <TextField
            value={settingsData?.address || ''}
            onChange={val => {
              if (val.target.value?.length < 50 && isValidInput(val.target.value)) {
                setSettingsData({
                  ...settingsData,
                  address: val.target.value
                })
              }
            }}
            label='Company Address'
            variant='standard'
            fullWidth
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mb={5}>
          <label style={{ fontSize: 12, color: '#858585' }}>Phone Number</label>
          <PhoneInput
            enableSearch={true}
            value={countryCode + settingsData?.phone}
            country={'us'}
            inputStyle={{
              width: '100%',
              height: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              borderBottomWidth: 1,
              borderRadius: 0
            }}
            inputClass='form-control'
            buttonClass='phoneBtn'
            placeholder=''
            onChange={(phone, country) => handleChangePhone(phone, country)}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mb={5}>
          <TextField
            select
            label='Slot Duration'
            value={settingsData?.slot}
            onChange={val =>
              setSettingsData({
                ...settingsData,
                slot: val.target.value
              })
            }
            variant='standard'
            fullWidth
          >
            <MenuItem value={'15'}>15</MenuItem>
            <MenuItem value={'30'}>30</MenuItem>
            <MenuItem value={'45'}>45</MenuItem>
            <MenuItem value={'60'}>60</MenuItem>
            <MenuItem value={'90'}>90</MenuItem>
            <MenuItem value={'120'}>120</MenuItem>
          </TextField>
        </Box>
        <Box my={5}>
          <Button onClick={updateSettings} variant='contained'>
            Save
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography>{'Enable/Disable 2FA'}</Typography>
        <Box my={5}>
          <Button onClick={isEnabled ? handleClickOpen : get2FAToken} variant='contained'>
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
                    label={
                      isEnabled
                        ? 'Please enter the code from google authenticator app'
                        : 'You will get the code by scanning this in google authenticator app'
                    }
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
