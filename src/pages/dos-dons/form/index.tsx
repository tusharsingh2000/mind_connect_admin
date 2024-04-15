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
  heading: yup.string().required('Heading is a required field').max(35, 'Maximum 35 characters are allowed'),
  description: yup.string().required('Description is a required field').max(50, 'Maximum 50 characters are allowed'),
  type: yup.string().required().not(['-1'], 'Type is a required field')
})

const defaultValues = {
  description: '',
  heading: '',
  type: -1
}

interface FormData {
  heading: string
  description: string
  type: number
}

const AddDosForm = ({ refetch }: { refetch: () => {} }) => {
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
      const response = await post('/admin/instruction', { ...data, type: Number(data.type) })
      if (response) {
        toast.success(`${Number(data.type) === 0 ? `Do's` : `Dont's`} added successfully`)
        resetField('heading')
        resetField('description')
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
        + Add Do's & Dont's
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Do's & Dont's
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
                      <MenuItem disabled value={-1}>
                        Select
                      </MenuItem>
                      <MenuItem value={0}>Do</MenuItem>
                      <MenuItem value={1}>Dont</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name='heading'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Add Heading'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Heading'
                      variant='standard'
                      error={Boolean(errors.heading)}
                      {...(errors.heading && { helperText: errors.heading.message })}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Add Description'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Description'
                      variant='standard'
                      error={Boolean(errors.description)}
                      {...(errors.description && { helperText: errors.description.message })}
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

export default AddDosForm
