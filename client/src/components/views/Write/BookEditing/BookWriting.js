import React, { Component } from 'react'
import axios from 'axios'
import LeftDrawer from './BookWritingLeftDrawer'
import './BookWriting.css'
import {Button } from 'antd';
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
       hide_show_toggle:false,
       left_drawer_toggle:false
    }
  }
  
  componentDidMount() {
    this.setState({
      user: userId
    })
    axios.get('api/create/get-book-title',{params: { userId: userId }})
      .then(res => {
        console.log(res.data)
        const bookTitle = res.data.bookTitle.book_title;
        const category = res.data.bookTitle.category;
        const userEmail = res.data.bookTitle.user_email;
        const contentsTable = res.data.contentsTable
        this.setState({ 
          bookTitle:bookTitle, 
          category:category,
          userEmail:userEmail,
          table_of_contents:contentsTable,
        });
      })
  }
  addTable =(value) => {
    console.log(value)
    axios.post('api/edit/add-table',{
      prevTableId : value.prevTableId,
      prevTableLevel : value.prevTableLevel,
      prevTableOrder : value.prevTableOrder,
      userId : userId,
      newTable : value.value.newTable,
    }).then(res => {
      console.log(res.data)
      this.setState({
        table_of_contents:res.data.table_of_contents
      })
    })
  }
  handleClick = (key) => {
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
  leftDrawerHandleClick = (key) => {
    if(key === 'none' ){
      this.setState({
        left_drawer_toggle : false
      })
    } else if(key === '목차' ){
      this.setState({
        left_drawer_toggle : true
      })
    }
  }
  render() {
    if (this.state.hide_show_toggle === false){
      var toggle = '-308px' 
      var main = '0px'
    } else {
      var toggle = '0px' 
      var main = '-308px'
    }
    if (this.state.left_drawer_toggle === false){
      var toggleLeft = '-31px' 
    } else {
      var toggleLeft = '0px' 
    }

    console.log(this.state.table_of_contents)
    return (
      <>
      <div className="book_writing_container">
        <div className="left_side_container" style={{marginLeft:toggleLeft}}>
        <LeftDrawer addTable={this.addTable} table_of_contents={this.state.table_of_contents} toggle={this.state.left_drawer_toggle} onClick={this.leftDrawerHandleClick}/>
        </div>
        <div className="editor_container" style={{marginRight:main}}>
          <div className="editor_container_templete"></div>
        </div>
        <div className="editor_container_templete_position_absolute">
          <div className="editor_top_menu">
            <Button size='small'>카드 이동/삭제</Button><span>책 제목 : {this.state.bookTitle}</span>
          </div>
          <div className="editor_panel">
            <div className="a4"></div>
          </div>
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
