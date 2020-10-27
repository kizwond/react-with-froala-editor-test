import React, { Component } from 'react'
import axios from 'axios'

import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/plugins.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/languages/ko'
import 'froala-editor//css/themes/gray.min.css'


import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
var userId = localStorage.getItem('userId')

export class EditorTry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  
  render() {
    const config={
      imageUploadURL: 'api/create/upload_image',
      saveParam: 'content',
      width: 'auto',
      theme: "gray",
      tabSpaces: 4,
      toolbarContainer: '#toolbarContainer',
      attribution: false,
      charCounterCount: false,
      language: 'ko',
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'subscript', 'superscript', 
                       'fontFamily', 'fontSize', 'color', 
                       'align', 'formatOL', 'formatUL', 'outdent', 'indent',
                       'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 
                       'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting',
                       'help', 'html', 'undo', 'redo']
    }
    return (
      <>
      <div  id="editor">
        <label className="control-label">에디터 1</label>
          <FroalaEditorComponent
            tag='textarea'
            config={config}
            model={this.props.editor1}
            onModelChange={this.props.handleModelChangeEditor1}
          />
        <label className="control-label">에디터 2</label>
          <FroalaEditorComponent
            tag='textarea'
            config={config}
            model={this.props.editor2}
            onModelChange={this.props.handleModelChangeEditor2}
          />
        <button onClick={this.props.handleSubmit} id="saveButton">Save</button>
          <FroalaEditorView
            model={this.props.editor1}
          />
          <FroalaEditorView
            model={this.props.editor2}
          />
      </div>
      </>
    )
  }
}

export default EditorTry
