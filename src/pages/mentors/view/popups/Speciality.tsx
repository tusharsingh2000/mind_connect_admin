// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Custom Component Import
import { Box, Typography } from '@mui/material'

const SpecialistCard = ({ image, name }: { image: string; name: string }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box>
        <img
          src={image}
          style={{
            height: 250,
            width: '100%',
            borderRadius: 10
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '210px',
          width: '100%',
          padding: '9px',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '0px 0px 10px 10px',
          color: 'white',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {name || ''}
      </Box>
    </Box>
  )
}

const SpecialityView = ({
  specialities
}: {
  specialities:
    | {
        _id: string
        name: string
        image: string
        createdAt: string
        updatedAt: string
      }[]
    | undefined
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Button size='large' onClick={handleClickOpen}>
        View All
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='xs'>
        <DialogTitle id='form-dialog-title'>
          <Typography fontSize={24} fontWeight={600}>
            Specialities
          </Typography>
        </DialogTitle>
        <DialogContent>
          {specialities?.map(item => (
            <SpecialistCard image={item?.image || ''} name={item?.name || ''} key={item?._id} />
          ))}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default SpecialityView
