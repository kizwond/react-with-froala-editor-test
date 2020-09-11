import React, { Component } from 'react'
import axios from 'axios'

var userId = localStorage.getItem('userId')

export class BookWriting extends Component {
  constructor(props) {
    super(props)
    this.state = {
       bookTitle:'',
       user : ''

    }
  }
  
  componentDidMount() {
    console.log(userId)
    this.setState({
      user: userId
    })
    axios.get('api/create/get-book-title',{params: { userId: userId }})
      .then(res => {
        console.log(res)
        const bookTitle = res.data.book_title;
        this.setState({ bookTitle:bookTitle });
      })
  }
  render() {
    return (
      <div>
        {this.state.user}
        {this.state.bookTitle}
      </div>
    )
  }
}

export default BookWriting
