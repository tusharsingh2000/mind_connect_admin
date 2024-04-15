'use client'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

//@ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

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
    if (fileExtension === 'pdf') {
      return (
        <Document file={url[0]}>
          <Page pageNumber={1} />
        </Document>
      )
    } else if (fileExtension === 'xlsx') {
      // Render XLSX file
      return <p>XLSX file: {url[0]}</p>
    } else if (fileExtension === 'docx') {
      // Render DOCX file
      return <p>DOCX file: {url[0]}</p>
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
      // Render image file
      return <img style={{ height: '50%', width: '100%' }} src={url[0]} alt='Image' />
    } else {
      return <p>Unsupported file format</p>
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <div style={{ width: '100%', minWidth: '30vw', height: '600px' }}>{showFile()}</div>
      </DialogContent>
    </Dialog>
  )
}

export default PDFViewer
