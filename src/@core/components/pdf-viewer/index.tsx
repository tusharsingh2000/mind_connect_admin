'use client'
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import { Icon } from '@iconify/react'

const PDFViewer = ({
  title,
  open,
  url,
  setOpen
}: {
  url: string[]
  title: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const fileExtension = url?.[0]?.split('.').pop()?.toLowerCase()

  const showFile = () => {
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
      return (
        <figure>
          <img style={{ height: '100%', width: '100%' }} src={url[0]} alt='Image' />
        </figure>
      )
    } else {
      return (
        <iframe
          height={'100%'}
          width={'100%'}
          src={`https://docs.google.com/gview?url=${url[0]}&embedded=true`}
        ></iframe>
      )
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='form-dialog-title' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>{title}</Box>
        <IconButton onClick={() => setOpen(false)}>
          <Icon icon='ri:close-fill' height={20} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ width: '100%', minWidth: '30vw', height: '600px' }}>{showFile()}</div>
      </DialogContent>
    </Dialog>
  )
}

export default PDFViewer
