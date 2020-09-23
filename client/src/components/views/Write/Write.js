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
      message:'',
      hideOrShowClass : false,
      category : []
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
      console.log('get all')
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle,
        category:res.data.category
      })
    })
  }
  getOnlyShowTitle() {
    axios.get('api/create/get-show-title',{params: { userId: userId }})
    .then(res => {
      console.log('get show')
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle,
        category:res.data.category
      })
    })
  }

  hideOrShowToggle = () => {
    if (this.state.hideOrShowClass === false){
      this.getAllTitle()
      this.setState((prevState)=>({
          hideOrShowClass : !prevState.hideOrShowClass
        })
      )
    } else if (this.state.hideOrShowClass === true){
      this.getOnlyShowTitle()
      this.setState((prevState)=>({
          hideOrShowClass : !prevState.hideOrShowClass
        })
      )
    }
  }

  componentDidMount() {
    this.setState({
      user: userId
    })
    this.getOnlyShowTitle()
    
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
        likeTitle:res.data.likeTitle,
        category:res.data.category
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
    axios.post('api/create/change-list-order',{
      bookId : value.bookId,
      userId : userId,
      action : value.action,
      from : value.from
    }).then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle
      })
    })
  }

  bookCategoryMove = (value) => {
    axios.post('api/create/book-category-move',{
      bookId : value.bookId,
      userId : userId,
      prevCategory : value.prevCategory,
      category : value.category,
    }).then(res => {
      if(res.data.error === "같은 카테고리를 선택하셨습니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        this.setState({
          bookTitle:res.data.bookTitle,
          likeTitle:res.data.likeTitle,
          category:res.data.category
        })
      }
    })
  }

  addCategory = (value) => {
    axios.post('api/create/add-category',{
      userId : userId,
      prevCategoryId : value.prevCategoryId,
      newCategory : value.value.newCategory,
    }).then(res => {
      if(res.data.error === "동일한 이름의 카테고리명이 이미 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        this.setState({
          category:res.data.category
        })
      }
    })
  }

  changeCategoryHandler = (value) => {
    axios.post('api/create/change-category-name',{
      categoryId : value.categoryId,
      userId : userId,
      newName : value.value.newName
    })
    .then(res => {
      if(res.data.error === "동일한 카테고리명이 존재합니다."){
        this.setState({
          message:res.data.error
        })
        alert(this.state.message)
      } else {
        this.setState({
          bookTitle:res.data.bookTitle,
          likeTitle:res.data.likeTitle,
          category:res.data.category
        })
      }
    })
  }
  categoryDeleteHandler = (value) => {
    axios.post('api/create/delete-category',{
      categoryId : value.value.categoryId,
      moveTo : value.moveTo,
      userId : userId
    }).then(res => {
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle,
        category:res.data.category
      })
    })
  }

  categoryListOrder = (value) => {
    axios.post('api/create/change-category-order',{
      categoryId : value.categoryId,
      userId : userId,
      action : value.action,
    }).then(res => {
      console.log(res.data)
      this.setState({
        bookTitle:res.data.bookTitle,
        likeTitle:res.data.likeTitle,
        category:res.data.category
      })
    })
  }

  render() { 
    return ( 
      <div className="write_container">
        <div style={{fontSize:"13px", fontWeight:"700"}}>즐겨찾기</div>
        <br/>
        {this.state.isToggleOn ? <LikeSectionContent category={this.state.category} 
                                                     bookCategoryMove={this.bookCategoryMove} 
                                                     onClickLike={this.saveLikeChange} 
                                                     hideOrShowClass={this.state.hideOrShowClass} 
                                                     hideOrShowToggle={this.hideOrShowToggle} 
                                                     listOrderHandler={this.listOrder} 
                                                     changeBookTitleHandler={this.changeBookTitleHandler} 
                                                     bookDeleteHandler={this.bookDeleteHandler} 
                                                     onClickHideOrShow={this.eyeClickHandler} 
                                                     bookTitle={this.state.likeTitle}/> : ''}
        
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
          <ListSectionContent addCategory={this.addCategory} 
                              categoryListOrderHandler={this.categoryListOrder}
                              categoryDeleteHandler={this.categoryDeleteHandler} 
                              changeCategoryHandler={this.changeCategoryHandler} 
                              category={this.state.category} 
                              bookCategoryMove={this.bookCategoryMove} 
                              onClickLike={this.saveLikeChange} 
                              hideOrShowClass={this.state.hideOrShowClass} 
                              hideOrShowToggle={this.hideOrShowToggle} 
                              listOrderHandler={this.listOrder} 
                              changeBookTitleHandler={this.changeBookTitleHandler} 
                              bookDeleteHandler={this.bookDeleteHandler} 
                              onClickHideOrShow={this.eyeClickHandler} 
                              bookTitle={this.state.bookTitle}/>
        </div>
      </div>
     );
  }
}
 
export default WriteMain;