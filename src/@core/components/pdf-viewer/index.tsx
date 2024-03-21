import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// Configure the PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const PDFViewer = ({
  url,
  title,
  open,
  setOpen
}: {
  url: string
  title: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => (
  <Dialog
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
    <DialogContent>
      <div style={{ width: '100%', minWidth: '30vw', height: '600px' }}>
        <Document file={url}>
          <Page pageNumber={1} />
        </Document>
      </div>
    </DialogContent>
  </Dialog>
)

export default PDFViewer
