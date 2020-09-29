import React, { Component } from 'react'
import axios from 'axios'
import LeftDrawer from './BookWritingLeftDrawer'
import RightDrawer from './BookWritingRightDrawer'
import './BookWriting.css'

import SettingTabs from './SettingTabs'

var userId = localStorage.getItem('userId')

export class BookWriting extends Component {
  constructor(props) {
    super(props)
    this.state = {
       bookTitle:'',
       category:'',
       userEmail:'',
       user : '',
       table_of_contents:[],
       hide_show_toggle:true
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
  handleClick = (key) => {
    console.log('clicked!!')
    console.log(key)
    if(key === '1' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '2' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '3' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '4' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '0' ){
      this.setState({
        hide_show_toggle : false
      })
    }
    
  }
  render() {
    if (this.state.hide_show_toggle === false){
      var toggle = '-350px' 
    } else {
      var toggle = '0px' 
    }
    
    return (
      <>
      <div className="book_writing_container">
        <div className="left_side_container">
        <LeftDrawer/>
        </div>
        <div className="editor_container">
          editor 영역
        </div>
        <div className="right_side_container" style={{marginRight:toggle}}>
          <SettingTabs toggle={this.state.hide_show_toggle} onClick={this.handleClick}/>
        </div>
      </div>
      </>
    )
  }
}

export default BookWriting
