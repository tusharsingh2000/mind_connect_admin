// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

// ** Custom Component Import
import { Avatar, IconButton, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { post, uploadFile } from 'src/utils/AxiosMethods'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('Name is a required field').max(35, 'Maximum 35 characters are allowed'),
  type: yup.string().required().not(['-1'], 'Type is a required field')
})

const defaultValues = {
  description: '',
  name: '',
  type: -1
}

interface FormData {
  name: string
  description: string
  type: number
}

type FileProp = {
  name: string
  type: string
  size: number
}

const AddDosForm = ({ refetch }: { refetch: () => {} }) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const {
    control,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (!files?.length) {
        return
      }
      const image = (await uploadFile(files)) as { data: string }
      const body = {
        name: data.name,
        type: Number(data.type),
        image: image.data
      }

      const response = await post('/category', body)
      if (response) {
        toast.success(`Category added successfully`)
        resetField('name')
        resetField('type')
        setFiles([])
        handleClose()
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const img = files.map((file: FileProp) => (
    <img
      key={file.name}
      alt={file.name}
      className='single-file-image'
      style={{
        maxWidth: 300
      }}
      src={URL.createObjectURL(file as any)}
    />
  ))

  return (
    <Fragment>
      <Button variant='outlined' size='medium' onClick={handleClickOpen}>
        + Add Category
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={24} fontWeight={600}>
            Category
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
                      <MenuItem value={1}>User</MenuItem>
                      <MenuItem value={2}>Consultant</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Box>

              <Box>
                <Box
                  onClick={() => setFiles([])}
                  display='flex'
                  sx={{ cursor: 'pointer', justifyContent: 'flex-end' }}
                  mb={5}
                >
                  <Icon icon='maki:cross' />
                </Box>
                <Box
                  {...getRootProps({ className: 'dropzone' })}
                  {...(files.length && { sx: { height: 450 } })}
                  sx={{ borderColor: isSubmitted && !files.length ? '#EA5455' : undefined }}
                >
                  <input {...getInputProps()} />
                  {files.length ? (
                    img
                  ) : (
                    <Box display='flex' flexDirection={'column'} alignItems='center' gap={5}>
                      <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
                        <Icon icon='material-symbols:upload-sharp' />
                      </Avatar>
                      <Typography textAlign={'center'}>
                        Drop files here or click{' '}
                        <Link href='/' onClick={e => e.preventDefault()} className='text-textPrimary no-underline'>
                          browse
                        </Link>{' '}
                        thorough your machine
                      </Typography>
                    </Box>
                  )}
                </Box>
                {isSubmitted && !files?.length ? (
                  <Box>
                    <p
                      style={{ margin: 0, fontSize: 14, marginTop: 5 }}
                      className='MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained css-d4slff-MuiFormHelperText-root'
                    >
                      Image is a required field
                    </p>
                  </Box>
                ) : null}
              </Box>

              <Box>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Name'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Name'
                      variant='standard'
                      error={Boolean(errors.name)}
                      {...(errors.name && { helperText: errors.name.message })}
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
