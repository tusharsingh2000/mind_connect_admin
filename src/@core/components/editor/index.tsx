import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import React, { useEffect, useState } from 'react'

import { EditorState, convertFromHTML, ContentState, convertToRaw } from 'draft-js'
import ReactDraftWysiwyg from '../react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

const EditText = (props: { content: string; setContent: (arg0: string) => void }) => {
  let contentDataState: any
  if (props.content !== ' ') {
    contentDataState = ContentState.createFromBlockArray(convertFromHTML(`${props.content}`).contentBlocks)
  }
  const [editorState, setEditorState] = useState(
    props.content !== ' ' ? EditorState.createWithContent(contentDataState) : EditorState.createEmpty()
  )
  const text = draftToHtml(convertToRaw(editorState.getCurrentContent()))

  useEffect(() => {
    props.setContent(text)
  }, [text])

  return (
    <div>
      <ReactDraftWysiwyg
        toolbar={{
          options: ['inline', 'fontSize', 'list', 'textAlign', 'link', 'colorPicker'],
          inline: {
            options: ['bold', 'italic', 'underline']
          },
          textAlign: {
            options: ['left', 'center']
          },
          list: {
            options: ['unordered']
          }
        }}
        editorState={editorState}
        onEditorStateChange={setEditorState}
        editorStyle={{
          height: '50vh',
          border: '1px solid #E6E8F0',
          padding: '0px 10px',
          overflow: 'hidden'
        }}
      />
    </div>
  )
}
export default EditText
