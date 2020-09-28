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

export class BookWriting extends Component {
  constructor(props) {
    super(props)
    this.state = {
       bookTitle:'',
       category:'',
       userEmail:'',
       user : '',
       editor1: 'editor1',
       editor2: 'editor2'
    }
  }

  handleModelChangeEditor1 = (model) => {
    console.log(model)
    this.setState({
      editor1: model
    })
  }
  handleModelChangeEditor2 = (model) => {
    this.setState({
      editor2: model
    })
  }
  // handleSubmit = (values) => {
  //   var url = '/api/create/naming';
  //   var data = this.state.editor1;
  //   console.log(data)

  //   fetch(url, {
  //     method: 'POST', 
  //     body: JSON.stringify(data), 
  //     headers:{
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .then(function(response){
  //     console.log(response)
  //     if(response.error === "동일한 이름의 책이 이미 존재합니다."){
  //       setMessage(response.error)
  //     } else {
  //       window.location.href = '/writing'
  //     }
  //   })
  //   .catch(error => console.error('Error:', error));
  // }

  handleSubmit = () => {
    axios.post('api/create/add-contents', {
      content: this.state.editor1,
      userId: userId,
      bookTitle: this.state.bookTitle,
      userEmail: this.state.userEmail,
      category: this.state.category,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount() {
    this.setState({
      user: userId
    })
    axios.get('api/create/get-book-title',{params: { userId: userId }})
      .then(res => {
        console.log(res)
        const bookTitle = res.data.bookTitle.book_title;
        const category = res.data.bookTitle.category;
        const userEmail = res.data.bookTitle.user_email;
        this.setState({ 
          bookTitle:bookTitle, 
          category:category,
          userEmail:userEmail,
        });
      })
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
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 
                       'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 
                       'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 
                       'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 
                       'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 
                       'help', 'html', '|', 'undo', 'redo']
    }
    return (
      <>
      <div style={{width:"200px", margin:"auto", marginTop:"100px"}}>
        <div>작성자 : {this.state.userEmail}</div>
        <div>분류 : {this.state.category}</div>
        <div>제목 : {this.state.bookTitle}</div>
      </div>
      <div  id="editor">
        <div id="toolbarContainer"></div>
        <div><hr/></div>
        <label className="control-label">에디터 1</label>
      <FroalaEditorComponent
          tag='textarea'
          config={config}
          model={this.state.editor1}
          onModelChange={this.handleModelChangeEditor1}
        />
        <div><hr/></div>
        <label className="control-label">에디터 2</label>
        <FroalaEditorComponent
          tag='textarea'
          config={config}
          model={this.state.editor2}
          onModelChange={this.handleModelChangeEditor2}
        />
        <button onClick={this.handleSubmit} id="saveButton">Save</button>
          <FroalaEditorView
            model={this.state.editor1}
          />
          <FroalaEditorView
            model={this.state.editor2}
          />
      </div>
      </>
    )
  }
}

export default BookWriting
