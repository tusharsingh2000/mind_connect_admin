// ** React Imports
import { Fragment, useEffect, useState } from 'react'

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
import { patch } from 'src/utils/AxiosMethods'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'

const schema = yup.object().shape({
  heading: yup.string().required('Heading is a required field'),
  description: yup.string().required('Description is a required field'),
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

const UpdateDosForm = ({ id, data, refetch }: { id: string; data: FormData; refetch: () => {} }) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const {
    control,
    resetField,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await patch(`/admin/instruction/${id}`, { ...data, type: Number(data.type) })
      if (response) {
        toast.success(`${Number(data.type) === 0 ? `Do's` : `Dont's`} updated successfully`)
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

  useEffect(() => {
    setValue('heading', data?.heading || '')
    setValue('description', data?.description || '')
    setValue('type', data?.type || 0)
  }, [open])

  return (
    <Fragment>
      <Button onClick={handleClickOpen}>
        <Icon fontSize={20} icon='carbon:edit' />
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
                      <MenuItem value={1}>Don</MenuItem>
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
                      label='Update Heading'
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
                      label='Update Description'
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
                  Update
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default UpdateDosForm
