import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import DocViewer, { DocViewerRenderers, IDocument } from 'react-doc-viewer'

const PDFViewer = ({
  url,
  title,
  open,
  setOpen
}: {
  url: IDocument[]
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
        <DocViewer pluginRenderers={DocViewerRenderers} documents={url} />
      </div>
    </DialogContent>
  </Dialog>
)

export default PDFViewer
