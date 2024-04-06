// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import { Box } from '@mui/system'
import { Avatar, Typography } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { patch, uploadFile } from 'src/utils/AxiosMethods'
import { toast } from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import 'react-dropzone/examples/theme.css'
import { Icon } from '@iconify/react'
import { BASE_URL } from 'src/configs/auth'
import Link from 'next/link'

const schema = yup.object().shape({
  name: yup.string().required('Name is a required field')
})

const defaultValues = {
  name: ''
}

interface FormData {
  name: string
}

type FileProp = {
  name: string
  type: string
  size: number
}

const UpdateDosForm = ({
  refetch,
  image,
  name,
  id
}: {
  refetch: () => {}
  name: string
  image: string
  id: string
}) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [imagePreview, setimagePreview] = useState('')

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
    setValue,
    formState: { errors, isSubmitted }
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (!imagePreview && !files?.length) {
        return
      }

      let body = {
        name: data.name,
        image: ''
      }

      if (!imagePreview) {
        const { url } = (await uploadFile(files)) as { url: string }
        body = {
          ...body,
          image: url
        }
      } else {
        body = {
          ...body,
          image: imagePreview
        }
      }

      const response = await patch(`${BASE_URL}/admin/topic/${id}`, body)
      if (response) {
        toast.success('Topic updated successfully')
        resetField('name')
        setFiles([])
        setimagePreview('')
        setOpen(false)
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const img = imagePreview?.includes('https://mentoredapp') ? (
    <img
      key={imagePreview}
      alt={imagePreview}
      className='single-file-image'
      style={{
        maxWidth: 300
      }}
      src={imagePreview}
    />
  ) : (
    files.map((file: FileProp) => (
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
  )

  useEffect(() => {
    setValue('name', name || '')
    setimagePreview(image)
  }, [open])

  return (
    <Fragment>
      <Button size='medium' onClick={handleClickOpen}>
        <Icon fontSize={20} icon='carbon:edit' />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Topic
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box display={'flex'} gap={5} flexDirection='column'>
              <Box>
                <Box
                  onClick={() => {
                    setimagePreview('')
                    setFiles([])
                  }}
                  display='flex'
                  sx={{ cursor: 'pointer', justifyContent: 'flex-end' }}
                  mb={5}
                >
                  <Icon icon='maki:cross' />
                </Box>
                <Box
                  {...getRootProps({ className: 'dropzone' })}
                  {...(files.length && { sx: { height: 450 } })}
                  sx={{ borderColor: isSubmitted && !files.length && !imagePreview ? '#EA5455' : undefined }}
                >
                  <input {...getInputProps()} />
                  {files.length || imagePreview ? (
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
                {isSubmitted && !files?.length && !imagePreview ? (
                  <Box>
                    <p
                      style={{ margin: 0, fontSize: 14, marginTop: 5, color: 'red' }}
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
