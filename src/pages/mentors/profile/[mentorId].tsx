import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Input,
  Select,
  TextField,
  Typography,
  CircularProgress,
  Button
} from '@mui/material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Icon } from '@iconify/react'

import languages from '../../../languages.json'

import GoBackButton from 'src/@core/components/buttons/goBackButton'

import { MentorDetail } from 'src/types/Mentors'
import { toast } from 'react-hot-toast'
import { get, patch, uploadFile } from 'src/utils/AxiosMethods'
import { BASE_URL } from 'src/configs/auth'
import { isNumber, isValidEmail, isValidInput } from 'src/utils/validations'
import { addYears } from 'date-fns'

type DateType = Date | null | undefined

const Profile = () => {
  const router = useRouter()
  const [date, setDate] = useState<DateType>(null)
  const [loading, setIsLoading] = useState<boolean>(false)
  const [topics, setTopics] = useState<{ _id: string; name: string }[]>([])
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    image: '',
    email: '',
    dob: '',
    companies: '',
    industryType: '',
    noOfEmployee: '',
    revenue: '',
    about: '',
    phone: '',
    language: [],
    topics: [] as { _id: string; name: string }[],
    social: [] as any[]
  })

  const fileInputRef = useRef(null)

  const handleClick = () => {
    // @ts-ignore
    fileInputRef?.current?.click()
  }

  const checkValidation = () => {
    if (
      !formData?.firstName?.length ||
      !formData?.lastName?.length ||
      !formData?.email?.length ||
      !formData?.phone?.length ||
      !formData?.companies?.length ||
      !formData?.dob?.length ||
      !formData?.revenue?.length ||
      !formData?.industryType?.length ||
      !formData?.noOfEmployee?.length ||
      !formData?.image?.length
    ) {
      toast.error('Please fill the required fields')
      return false
    } else if (!isValidEmail(formData?.email)) {
      toast.error('Please enter a valid email')
      return false
    } else if (formData?.phone?.length < 8) {
      toast.error('Please enter a valid phonr number')
      return false
    }
    return true
  }

  const handleFileChange = async (event: any) => {
    const files = event?.target?.files
    try {
      setIsLoading(true)
      const { url } = (await uploadFile(files)) as { url: string }
      setIsLoading(false)
      if (url) {
        setFormData({
          ...formData,
          image: url
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Cells = ({ title, _id }: { title: string; _id: string }) => {
    let selected = -1
    selected = formData?.topics?.findIndex(ele => ele?._id === _id)

    return (
      <Box
        py={2}
        px={5}
        m={2}
        display='inline'
        borderRadius={1}
        sx={{
          backgroundColor: selected > -1 ? '#EA7A20' : '#FFF3EA',
          color: selected > -1 ? '#FFF' : '#EA7A20'
        }}
        fontSize={12}
        onClick={() => {
          if (selected > -1) {
            setFormData({
              ...formData,
              topics: [...formData?.topics?.filter(ele => ele._id !== _id)]
            })
          } else {
            setFormData({
              ...formData,
              topics: [...formData?.topics, { name: title, _id }]
            })
          }
        }}
      >
        {title}
      </Box>
    )
  }

  const getTopics = async () => {
    try {
      const response = (await get(`${BASE_URL}/mentor/topic`)) as { _id: string; name: string }[]
      if (response) {
        setTopics(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getMentor = async (mentorId: string) => {
    try {
      setIsLoading(true)
      const response = (await get(`/admin/mentor/${mentorId}`)) as MentorDetail
      setIsLoading(false)
      if (response) {
        setFormData({
          ...formData,
          about: response?.about || '',
          companies: response?.companies || '',
          industryType: response?.industryType || '',
          email: response?.user?.email || '',
          phone: response?.user?.phone || '',
          dob: response?.user?.dob || '',
          firstName: response?.user?.firstName || '',
          lastName: response?.user?.lastName || '',
          image: response?.user?.avatar_url || '',
          noOfEmployee: response?.noOfEmployee || '',
          social: (response?.social as any) || [],
          language: (response?.user?.language as any) || [],
          revenue: response?.revenue || '',
          topics: (response?.topics as any) || []
        })
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || '')
    }
  }

  const handleSocialLinkChange = (type: string, link: string) => {
    link = link.trim()
    const existingIndex = formData.social.findIndex(ele => ele.type === type)
    const updatedSocial = [...formData.social]
    if (existingIndex !== -1) {
      if (!link?.length) {
        setFormData({ ...formData, social: [...updatedSocial?.filter(ele => ele.type !== type)] })
        return
      }
      updatedSocial[existingIndex] = { type, link }
      setFormData({ ...formData, social: updatedSocial })
    } else {
      setFormData({ ...formData, social: [...formData.social, { type, link }] })
    }
  }

  const onSubmit = async () => {
    setSubmitted(true)
    const isValid = checkValidation()
    if (!isValid) {
      return
    }
    try {
      const response = await patch(`${BASE_URL}/admin/mentor/${router?.query?.mentorId}`, {
        about: formData?.about || '',
        companies: formData?.companies || '',
        noOfEmployee: formData?.noOfEmployee || '',
        industryType: formData?.industryType || '',
        social: formData?.social || [],
        user: {
          email: formData?.email || '',
          phone: formData?.phone || '',
          dob: formData?.dob || '',
          firstName: formData?.firstName || '',
          lastName: formData?.lastName || '',
          avatar_url: formData?.image || '',
          language: formData?.language || []
        },
        revenue: formData?.revenue || '',
        topics: formData?.topics?.map(ele => ele._id) || []
      })
      console.log(response)
    } catch (error) {}
    console.log(formData)
  }

  useEffect(() => {
    if (router?.query?.mentorId) {
      const mentorId = Array.isArray(router?.query?.mentorId) ? router?.query?.mentorId[0] : router?.query?.mentorId
      getMentor(mentorId || '')
    }
    getTopics()
  }, [router])

  if (loading) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GoBackButton />
        {formData?.image ? (
          <Box
            onClick={handleClick}
            mt={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 100,
              cursor: 'pointer',
              background: '#FFF3EA',
              borderRadius: 100,
              border: '8px solid white',
              position: 'relative'
            }}
          >
            <img src={formData?.image} style={{ height: '100%', width: '100%', borderRadius: 100 }} />
          </Box>
        ) : (
          <Box
            onClick={handleClick}
            mt={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 100,
              cursor: 'pointer',
              background: '#FFF3EA',
              borderRadius: 100,
              border: '8px solid white',
              position: 'relative'
            }}
          >
            <Icon color='#EA7A20' fontSize={50} icon='teenyicons:user-solid' />
            <Box
              sx={{
                background: 'white',
                position: 'absolute',
                bottom: -5,
                right: -5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 35,
                height: 35,
                borderRadius: 100
              }}
            >
              <Icon fontSize={16} color='#EA7A20' icon='fa-regular:edit' />
            </Box>
          </Box>
        )}
        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Grid>
      <Grid item md={6} borderRight='0.1px solid #7a7a7a' pr={5}>
        <Box p={5}>
          <Box mb={5}>
            <TextField
              value={formData?.firstName || ''}
              onChange={val => {
                if (isValidInput(val.target.value)) {
                  setFormData({ ...formData, firstName: val.target.value })
                }
              }}
              label='First Name'
              variant='standard'
              fullWidth
              error={submitted && !formData?.firstName?.length}
              helperText={submitted && !formData?.firstName?.length ? 'First Name is required' : ''}
            />
          </Box>
          <Box mb={5}>
            <TextField
              value={formData?.lastName || ''}
              onChange={val => {
                if (isValidInput(val.target.value)) {
                  setFormData({ ...formData, lastName: val.target.value })
                }
              }}
              label='Last Name'
              variant='standard'
              fullWidth
              error={submitted && !formData?.lastName?.length}
              helperText={submitted && !formData?.lastName?.length ? 'Last Name is required' : ''}
            />
          </Box>
          <Box mb={5}>
            <TextField
              value={formData?.phone || ''}
              onChange={val => {
                if (isNumber(val.target.value) && val.target.value.length < 12) {
                  setFormData({ ...formData, phone: val.target.value.trim() })
                }
              }}
              label='Phone Number'
              variant='standard'
              fullWidth
              error={submitted && (!formData?.phone?.length || formData?.phone?.length < 8)}
              helperText={
                submitted
                  ? !formData?.phone?.length
                    ? 'Phone number is required'
                    : formData?.phone?.length < 8
                    ? 'Please enter a valid phone number'
                    : ''
                  : ''
              }
            />
          </Box>
          <Box mb={5}>
            <TextField
              label='Email'
              value={formData?.email || ''}
              onChange={val => {
                if (isValidInput(val.target.value)) {
                  setFormData({ ...formData, email: val.target.value.trim() })
                }
              }}
              type={'email'}
              variant='standard'
              fullWidth
              error={submitted && (!formData?.email?.length || !isValidEmail(formData?.email))}
              helperText={
                submitted
                  ? !formData?.email?.length
                    ? 'Email is required'
                    : !isValidEmail(formData?.email)
                    ? 'Please enter a valid email'
                    : ''
                  : ''
              }
            />
          </Box>
          <Box mb={5}>
            <DatePicker
              selected={formData?.dob ? new Date(formData?.dob) : date}
              id='basic-input'
              popperPlacement={'bottom'}
              onChange={(date: Date) => {
                setDate(date)
                setFormData({
                  ...formData,
                  dob: `${date}`
                })
              }}
              maxDate={addYears(new Date(), -18)}
              placeholderText='DOB'
              customInput={
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Icon fontSize={24} style={{ margin: 2 }} icon='solar:calendar-bold' />
                      </InputAdornment>
                    )
                  }}
                  variant='standard'
                  fullWidth
                  label='DOB'
                  error={submitted && !formData?.dob?.length}
                  helperText={submitted && !formData?.dob?.length ? 'DOB is required' : ''}
                />
              }
            />
          </Box>
          <Box mb={5}>
            <TextField
              select
              value={formData?.industryType}
              onChange={val => setFormData({ ...formData, industryType: val?.target?.value })}
              label='Industry Type'
              variant='standard'
              fullWidth
              error={submitted && !formData?.industryType?.length}
              helperText={submitted && !formData?.industryType?.length ? 'Industry Type is required' : ''}
            >
              <MenuItem value={'Real Estate'}>Real Estate</MenuItem>
              <MenuItem value={'Education'}>Education</MenuItem>
              <MenuItem value={'Construction'}>Construction</MenuItem>
              <MenuItem value={'Design'}>Design</MenuItem>
              <MenuItem value={'Corporate services'}>Corporate services</MenuItem>
              <MenuItem value={'Retail'}>Retail</MenuItem>
              <MenuItem value={'Energy and mining'}>Energy and mining</MenuItem>
              <MenuItem value={'Manufacturing'}>Manufacturing</MenuItem>
              <MenuItem value={'Finance'}>Finance</MenuItem>
              <MenuItem value={'Recreation and travel'}>Recreation and travel</MenuItem>
              <MenuItem value={'Arts'}>Arts</MenuItem>
            </TextField>
          </Box>
          <Box mb={5}>
            <TextField
              select
              value={formData?.companies || ''}
              onChange={val => setFormData({ ...formData, companies: val?.target?.value })}
              label='Companies'
              variant='standard'
              fullWidth
              // error={submitted && !formData?.companies?.length}
              // helperText={submitted && !formData?.companies?.length ? 'Companies is required' : ''}
            >
              <MenuItem value={'0'}>0</MenuItem>
              <MenuItem value={'1-10'}>1-10</MenuItem>
              <MenuItem value={'11-50'}>11-50</MenuItem>
              <MenuItem value={'51-200'}>51-200</MenuItem>
              <MenuItem value={'201-500'}>201-500</MenuItem>
              <MenuItem value={'501-1000'}>501-1000</MenuItem>
              <MenuItem value={'1001-5000'}>1001-5000</MenuItem>
              <MenuItem value={'5001-10,000'}>5001-10,000</MenuItem>
              <MenuItem value={'10,001+'}>10,001+</MenuItem>
            </TextField>
          </Box>
          <Box mb={5}>
            <TextField
              select
              value={formData?.noOfEmployee}
              onChange={val => setFormData({ ...formData, noOfEmployee: val?.target?.value })}
              label='No. of Employee'
              variant='standard'
              fullWidth
              error={submitted && !formData?.companies?.length}
              helperText={submitted && !formData?.companies?.length ? 'No. of Employee is required' : ''}
            >
              <MenuItem value={'0'}>0</MenuItem>
              <MenuItem value={'1-10'}>1-10</MenuItem>
              <MenuItem value={'11-50'}>11-50</MenuItem>
              <MenuItem value={'51-200'}>51-200</MenuItem>
              <MenuItem value={'201-500'}>201-500</MenuItem>
              <MenuItem value={'501-1000'}>501-1000</MenuItem>
              <MenuItem value={'1001-5000'}>1001-5000</MenuItem>
              <MenuItem value={'5001-10,000'}>5001-10,000</MenuItem>
              <MenuItem value={'10,001+'}>10,001+</MenuItem>
            </TextField>
          </Box>
          <Box mb={5}>
            <TextField
              label='Revenue'
              onChange={val =>
                setFormData({
                  ...formData,
                  revenue: val.target.value
                })
              }
              value={formData?.revenue}
              variant='standard'
              fullWidth
              error={submitted && !formData?.revenue?.length}
              helperText={submitted && !formData?.revenue?.length ? 'Revenue is required' : ''}
            />
          </Box>
          <Box mb={5}>
            <TextField
              value={formData?.about || ''}
              onChange={val => {
                if (isValidInput(val.target.value)) {
                  setFormData({ ...formData, about: val.target.value })
                }
              }}
              label='About'
              multiline
              rows={3}
              variant='standard'
              fullWidth
              error={submitted && !formData?.about?.length}
              helperText={submitted && !formData?.about?.length ? 'About is required' : ''}
            />
          </Box>
          <Box mb={5}>
            <Typography fontSize={12}>Languages</Typography>
            <Select
              multiple
              value={formData.language}
              onChange={val => setFormData({ ...formData, language: val.target.value } as any)}
              input={<Input value={formData.language?.join(' ,')} fullWidth />}
            >
              {languages?.map((item, index) => (
                <MenuItem key={index} value={item?.name}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box p={5}>
          <Box>
            <Typography fontSize={18} fontWeight={600}>
              Topics of interest
            </Typography>
            <Box py={5} display='flex' flexWrap='wrap'>
              {topics?.map((item, index) => (
                <Cells _id={item?._id} title={item?.name} key={index} />
              ))}
            </Box>
          </Box>
          <Box mt={2}>
            <Typography fontSize={18} fontWeight={600}>
              Add Social Media Platforms
            </Typography>
            <Typography fontSize={16} fontWeight={300} mb={5}>
              Add link of all social media Platform here!
            </Typography>
            <Box mb={5}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon fontSize={20} icon='logos:facebook' />
                    </InputAdornment>
                  )
                }}
                label='Link Title'
                variant='standard'
                fullWidth
                value='Facebook'
                disabled
              />
            </Box>
            <Box mb={5}>
              <TextField
                value={formData?.social?.[formData?.social?.findIndex(ele => ele.type === 'FACEBOOK')]?.link}
                onChange={e => handleSocialLinkChange('FACEBOOK', e.target.value)}
                fullWidth
                variant='standard'
                label='URL'
              />
            </Box>
            <Box mb={5}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon fontSize={20} icon='skill-icons:instagram' />
                    </InputAdornment>
                  )
                }}
                label='Link Title'
                variant='standard'
                fullWidth
                value='Instagram'
                disabled
              />
            </Box>
            <Box mb={5}>
              <TextField
                value={formData?.social?.[formData?.social?.findIndex(ele => ele.type === 'INSTAGRAM')]?.link}
                onChange={e => handleSocialLinkChange('INSTAGRAM', e.target.value)}
                fullWidth
                variant='standard'
                label='URL'
              />
            </Box>
            <Box mb={5}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon fontSize={20} icon='devicon:twitter' />
                    </InputAdornment>
                  )
                }}
                label='Link Title'
                variant='standard'
                fullWidth
                value='Twitter'
                disabled
              />
            </Box>
            <Box mb={5}>
              <TextField
                value={formData?.social?.[formData?.social?.findIndex(ele => ele.type === 'TWITTER')]?.link}
                onChange={e => handleSocialLinkChange('TWITTER', e.target.value)}
                fullWidth
                variant='standard'
                label='URL'
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Button fullWidth onClick={onSubmit} variant='contained'>
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Profile
