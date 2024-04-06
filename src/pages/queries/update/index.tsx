// // ** React Imports
// import { Fragment, useState } from 'react'

// // ** MUI Imports
// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogContent from '@mui/material/DialogContent'

// // ** Custom Component Import
// import { Box } from '@mui/system'
// import { Input, MenuItem, Typography } from '@mui/material'
// import CustomTextField from 'src/@core/components/mui/text-field'

// const UpdateQuery = () => {
//   // ** State
//   const [open, setOpen] = useState<boolean>(false)
//   const [selectedStatus, setSelectedStatus] = useState('0')

//   const handleClickOpen = () => setOpen(true)

//   const handleClose = () => setOpen(false)

//   return (
//     <Fragment>

//       <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
//         <DialogTitle id='form-dialog-title'>
//           <Typography fontSize={24} fontWeight={600}>
//             Update
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Box display={'flex'} gap={5} flexDirection='column'>
//             <Box>
//               <CustomTextField
//                 variant='filled'
//                 fullWidth
//                 size='small'
//                 select
//                 value={selectedStatus}
//                 id='custom-select'
//                 onChange={val => {
//                   setSelectedStatus(val.target.value)
//                 }}
//               >

//               </CustomTextField>
//             </Box>
//             <Box>
//               <label style={{ fontSize: 12, color: '#858585' }}>Email</label>
//               <Input fullWidth type='email' placeholder='amandeep@gmail.com' />
//             </Box>

//             <Button variant='contained'>Get Link</Button>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </Fragment>
//   )
// }

// export default UpdateQuery

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

const schema = yup.object().shape({
  action: yup.string().required('Status is a required field'),
  notes: yup.string().optional()
})

const defaultValues = {
  action: '',
  notes: ''
}

interface FormData {
  action: string
  notes: string
}

const UpdateQuery = ({ refetch, status, id }: { refetch: () => {}; status: number; id: string }) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const statuses = [
    {
      label: 'In Progress',
      value: '1'
    },
    {
      label: 'Pending',
      value: '0'
    },
    {
      label: 'Completed',
      value: '2'
    },
    {
      label: 'Closed',
      value: '3'
    },
    {
      label: 'On Hold',
      value: '4'
    }
  ]

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
      const response = await patch(`/admin/contact-support/${id}`, {
        action: data.action,
        notes: data.notes
      })
      if (response) {
        toast.success('Updated successfully')
        resetField('action')
        resetField('notes')
        handleClose()
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (open) {
      setValue('action', `${status || '0'}`)
    }
  }, [open])

  return (
    <Fragment>
      <Button variant='contained' size='small' onClick={handleClickOpen}>
        Update
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
                  name='action'
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
                      error={Boolean(errors.action)}
                      {...(errors.action && { helperText: errors.action.message })}
                    >
                      {statuses?.map(item => (
                        <MenuItem key={item?.value || ''} value={item?.value || ''}>
                          {`${item?.label || ''}`}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name='notes'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      label='Add Notes'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Add Notes'
                      variant='standard'
                      multiline
                      rows={8}
                      error={Boolean(errors.notes)}
                      {...(errors.notes && { helperText: errors.notes.message })}
                    />
                  )}
                />
              </Box>

              <Box display={'flex'} gap={5}>
                <Button onClick={handleClose} fullWidth variant='outlined' size='large'>
                  Cancel
                </Button>
                <Button type='submit' fullWidth variant='contained' size='large'>
                  Confirm
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default UpdateQuery
