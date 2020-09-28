import React, { Component } from 'react'
import axios from 'axios'

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
      <div>
        <div>작성자 : {this.state.userEmail}</div>
        <div>분류 : {this.state.category}</div>
        <div>제목 : {this.state.bookTitle}</div>
      </div>
      </>
    )
  }
}

export default BookWriting
