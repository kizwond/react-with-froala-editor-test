import React, { Component } from 'react';
import './LikeSectionContent.css'
import { SettingOutlined, StarTwoTone, StarOutlined,EyeOutlined,DeleteOutlined,ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';
import CategorySettingModal from './CategorySettingModal'
import CategoryMoveModal from './CategoryMoveModal'
import DeleteBook from './DeleteBookModal'
import ChangeBookTitle from './ChangeBookTitle'

class ListColumns extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <ul className="like_list_columns">
        <li>카테고리 <CategorySettingModal/></li>
        <li>책이름</li>
        <li>책이름<br/>변경</li>
        <li>구분</li>
        <li>저자</li>
        <li>총페이지</li>
        <li>최근30일<br/>작성카드</li>
        <li>카드종류</li>
        <li>생성일</li>
        <li>최근작성일</li>
        <li>카테고리<br/>이동</li>
        <li>즐겨찾기</li>
        <li>순서이동</li>
        <li>목록에서<br/>감추기</li>
        <li>삭제</li>
      </ul> 
    );
  }
}

class ListContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showToggle:true,
      starOn:false,
      editBookTitle:false,
      bookInfo:this.props.bookInfo
     }
  }
  eyeClickHandler = () =>{
    this.setState(state => ({
      showToggle: !state.showToggle
    }));
  }
  starClickHandler = () =>{
    this.setState(state => ({
      starOn: !state.starOn
    }));
  }
  editBookTitleHandler = () =>{
    this.setState(state => ({
      editBookTitle: !state.editBookTitle
    }));
  }
  changeHandleClick = ()=> {
    this.setState(state => ({
      editBookTitle: !state.editBookTitle
    }));
  }
  render() { 
    const info = this.state.bookInfo;
    const user_slice = info.user_email.slice(0,8)
    const date = info.date.slice(0,10)
    const update_date = info.date.slice(0,10)
    return ( 
      <>
      {this.state.showToggle ? 
        <div className="like_list_contents">
        <ul>
          <li>{info.category}</li>
          <li>{this.state.editBookTitle ? <ChangeBookTitle onClick={this.changeHandleClick}/> : info.book_title}</li>
          <li><EditOutlined onClick={this.editBookTitleHandler} style={{fontSize:'14px'}}/></li>
          <li>{info.division}</li>
          <li>{user_slice}</li>
          <li>{info.total_pages}</li>
          <li>{info.recent_input}</li>
          <li>단면 {info.single_cards}장<br/>양면 {info.dual_cards}장</li>
          <li>{date}</li>
          <li>{update_date}</li>
          <li><CategoryMoveModal/></li>
          <li>{info.like === "YES" ? <StarTwoTone onClick={this.starClickHandler} twoToneColor="#52c41a" style={{fontSize:'14px'}}/>:
                                  <StarOutlined onClick={this.starClickHandler} style={{fontSize:'14px'}}/>}
          </li>
          <li>
          <ArrowUpOutlined style={{fontSize:'14px'}}/>
          <ArrowDownOutlined style={{fontSize:'14px'}}/>
          </li>
          <li>{info.hide_or_show === "show" ? <EyeOutlined onClick={this.eyeClickHandler} style={{fontSize:'14px'}}/>:
                                  ''}</li>
          <li><DeleteBook /></li>
        </ul>
      </div> : ''}
      </>
     );
  }
}

// const menus = ["Menu1", "Menu2", "Menu3", "Menu4"]
// const menuList = menus.map((menu) => (<li>{menu}</li>));

// return(
//     <ul>
//         {menuList}
//     </ul>
// )

class ListSectionContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      bookTitle:this.props.bookTitle
     }
  }
  render() { 
    const bookList = this.props.bookTitle.map((book_title,)=>(
      <ListContent key={book_title._id} bookInfo={book_title}/>
    ))
    return ( 
      <div className="like_list_container">
        <ListColumns />
        {bookList}
      </div>
     );
  }
}
 
export default ListSectionContent;