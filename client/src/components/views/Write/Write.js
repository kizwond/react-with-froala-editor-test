import React, { Component } from 'react';
import './Write.css'
import LikeSectionContent from './LikeSectionContent'
import ListSectionContent from './ListSectionContent'
import {NavLink} from 'react-router-dom'
import { Button } from 'antd';
import { DownCircleTwoTone,UpCircleTwoTone } from '@ant-design/icons';
import axios from 'axios'


var userId = localStorage.getItem('userId')

class WriteMain extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isToggleOn: true,
      user:'',
      bookTitle:[],
      likeTitle:[],
      message:''
     }
  }
  onClickToggle = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  getAllTitle() {
    axios.get('api/create/get-all-title',{params: { userId: userId }})
    .then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle
      })
    })
  }
  componentDidMount() {
    this.setState({
      user: userId
    })
    this.getAllTitle()
    
  }
  saveLikeChange = (value) => {
    if (value.value === 'true') {
      var like = 'false'
    } else {
      like = 'true'
    }
    axios.post('api/create/like',{
      bookId : value.bookId,
      like: like,
      userId: userId
    }).then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle
      })
    })
  }

  eyeClickHandler = (value) =>{
    if (value.value === 'true') {
      var eye = 'false'
    } else {
      eye = 'true'
    }
    axios.post('api/create/hide-or-show',{
      bookId : value.bookId,
      hide_or_show: eye,
      userId: userId
    }).then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle
      })
    })
  }
  bookDeleteHandler = (value) => {
    axios.post('api/create/delete-book',{
      bookId : value.bookId,
      userId : userId
    }).then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle
      })
    })
  }

  changeBookTitleHandler = (value) => {
    axios.post('api/create/change-book-title',{
      bookId : value.bookId,
      userId : userId,
      newName : value.value.newName
    })
    .then(res => {
      if(res.data.error === "동일한 이름의 책이 이미 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        this.setState({
          bookTitle:res.data.bookTitle,
          likeTitle:res.data.likeTitle
        })
      }
    })
  }

  listOrder = (value) => {
    console.log(value)
    axios.post('api/create/change-list-order',{
      bookId : value.bookId,
      userId : userId,
      action : value.action,
      from : value.from
    }).then(res => {
      console.log(res.data)
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle
      })
    })
  }

  

  render() { 
    return ( 
      <div className="write_container">
        <div style={{fontSize:"13px", fontWeight:"700"}}>즐겨찾기</div>
        <br/>
        {this.state.isToggleOn ? <LikeSectionContent onClickLike={this.saveLikeChange} listOrderHandler={this.listOrder} changeBookTitleHandler={this.changeBookTitleHandler} bookDeleteHandler={this.bookDeleteHandler} onClickHideOrShow={this.eyeClickHandler} bookTitle={this.state.likeTitle}/> : ''}
        
        <div style={{textAlign:"center", marginTop:"-20px"}}>
        {this.state.isToggleOn ? <UpCircleTwoTone twoToneColor="#bfbfbf" onClick={this.onClickToggle} style={{fontSize:'25px'}}/> 
                              : <div style={{borderBottom:"1px solid lightgrey", marginTop:"10px", marginBottom:"20px"}}>
                                  <div style={{marginBottom:"-15px"}}>
                                    <DownCircleTwoTone twoToneColor="#bfbfbf" onClick={this.onClickToggle} style={{fontSize:'25px'}}/>
                                  </div>
                                </div>}
        </div>
        <NavLink to="/naming" exact ><Button type="primary" className="make_new_book" size="small">새로만들기</Button></NavLink> 
        <div className="book_list_container_in_write">
          <ListSectionContent onClickLike={this.saveLikeChange} listOrderHandler={this.listOrder} changeBookTitleHandler={this.changeBookTitleHandler} bookDeleteHandler={this.bookDeleteHandler} onClickHideOrShow={this.eyeClickHandler} bookTitle={this.state.bookTitle}/>
        </div>
      </div>
     );
  }
}
 
export default WriteMain;