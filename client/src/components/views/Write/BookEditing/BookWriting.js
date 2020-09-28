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
    }
  }
  
  componentDidMount() {
    this.setState({
      user: userId
    })
    axios.get('api/create/get-book-title',{params: { userId: userId }})
      .then(res => {
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
    
    return (
      <>
      <div style={{width:"200px", margin:"auto", marginTop:"100px"}}>
        <div>작성자 : {this.state.userEmail}</div>
        <div>분류 : {this.state.category}</div>
        <div>제목 : {this.state.bookTitle}</div>
      </div>
      </>
    )
  }
}

export default BookWriting
