import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
// import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

const PDFViewer = ({
  title,
  open,
  setOpen
}: {
  url: string[]
  title: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const files = [
    {
      uri: 'https://www.lehman.edu/faculty/john/classroomrespolicy1.docx',
      filetpe: 'docx'
    }
  ]

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <div style={{ width: '100%', minWidth: '30vw', height: '600px' }}>
          {/* <DocViewer pluginRenderers={DocViewerRenderers} documents={files} /> */}
          {/* <iframe className={'pdf'} width='100%' height='600' src={url[0]}></iframe> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PDFViewer
