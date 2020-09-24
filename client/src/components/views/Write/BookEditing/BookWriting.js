import React, { Component } from 'react'
import axios from 'axios'


import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

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
       model: 'Example text'
    }
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  handleModelChange(model) {
    this.setState({
      model: model
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
  placeholder: "Edit Me",
  events : {
    'focus' : function(e, editor) {
      console.log(editor.selection.get());
    }
  }
}
    return (
      <>
      <div style={{width:"200px", margin:"auto", marginTop:"100px"}}>
        <div>작성자 : {this.state.userEmail}</div>
        <div>분류 : {this.state.category}</div>
        <div>제목 : {this.state.bookTitle}</div>
      </div>
      <div  id="editor">
      <FroalaEditorComponent
          tag='textarea'
          config={this.config}
          model={this.state.model}
          onModelChange={this.handleModelChange}
        />
        <textarea value={this.state.model}/>
        <FroalaEditorView
            model={this.state.model}
          />
      </div>
      </>
    )
  }
}

export default BookWriting
