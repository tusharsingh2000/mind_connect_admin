// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import { Box } from '@mui/system'
import { MenuItem, Typography } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { post } from 'src/utils/AxiosMethods'
import { toast } from 'react-hot-toast'

const schema = yup.object().shape({
  question: yup.string().required('Question is a required field'),
  answer: yup.string().required('Answer is a required field'),
  type: yup.string().required().not(['no'], 'Type is a required field')
})

const defaultValues = {
  answer: '',
  question: '',
  type: 'no'
}

interface FormData {
  question: string
  answer: string
  type: string
}

const AddFaqForm = ({ refetch }: { refetch: () => {} }) => {
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
      const response = await post('/admin/faq', data)
      if (response) {
        toast.success('Faq added successfully')
        resetField('answer')
        resetField('question')
        resetField('type')
        handleClose()
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <Button variant='outlined' size='medium' onClick={handleClickOpen}>
        + Add FAQ
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            FAQ
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box display={'flex'} gap={5} flexDirection='column'>
              <Box>
                <Controller
                  name='type'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      variant='filled'
                      fullWidth
                      size='small'
                      select
                      id='custom-select'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.type)}
                      {...(errors.type && { helperText: errors.type.message })}
                    >
                      <MenuItem disabled value={'no'}>
                        Select
                      </MenuItem>
                      <MenuItem value={'MENTOR'}>Mentor</MenuItem>
                      <MenuItem value={'MENTEE'}>Mentee</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name='question'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Add Question'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Question'
                      variant='standard'
                      error={Boolean(errors.question)}
                      {...(errors.question && { helperText: errors.question.message })}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name='answer'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Add Answer'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Answer'
                      variant='standard'
                      error={Boolean(errors.answer)}
                      {...(errors.answer && { helperText: errors.answer.message })}
                    />
                  )}
                />
              </Box>

              <Box display={'flex'} gap={5}>
                <Button onClick={handleClose} fullWidth variant='outlined' size='large'>
                  Cancel
                </Button>
                <Button type='submit' fullWidth variant='contained' size='large'>
                  Add
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AddFaqForm
