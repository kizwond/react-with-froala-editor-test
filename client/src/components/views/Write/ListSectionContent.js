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
      editBookTitle:false
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
    return ( 
      <>
      {this.state.showToggle ? 
        <div className="like_list_contents">
        <ul>
          <li>한국사</li>
          <li>{this.state.editBookTitle ? <ChangeBookTitle onClick={this.changeHandleClick}/> : "한국사요약"}</li>
          <li><EditOutlined onClick={this.editBookTitleHandler} style={{fontSize:'14px'}}/></li>
          <li>구매</li>
          <li>EBS</li>
          <li>100장</li>
          <li>11/300</li>
          <li>단면 10장<br/>양면 90장</li>
          <li>2020-10-10</li>
          <li>2020-10-20</li>
          <li><CategoryMoveModal/></li>
          <li>{this.state.starOn ? <StarTwoTone onClick={this.starClickHandler} twoToneColor="#52c41a" style={{fontSize:'14px'}}/>:
                                  <StarOutlined onClick={this.starClickHandler} style={{fontSize:'14px'}}/>}
          </li>
          <li>
          <ArrowUpOutlined style={{fontSize:'14px'}}/>
          <ArrowDownOutlined style={{fontSize:'14px'}}/>
          </li>
          <li><EyeOutlined onClick={this.eyeClickHandler} style={{fontSize:'14px'}}/></li>
          <li><DeleteBook /></li>
        </ul>
      </div> : ''}
      </>
     );
  }
}



class ListSectionContent extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="like_list_container">
        <ListColumns />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
        <ListContent />
      </div>
     );
  }
}
 
export default ListSectionContent;