import React, { Component } from 'react';
import './LikeSectionContent.css'
import { StarOutlined,EyeOutlined,DeleteOutlined,EditOutlined,ArrowUpOutlined,ArrowDownOutlined} from '@ant-design/icons';

class LikeListColumns extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <ul className="like_list_columns">
        <li>카테고리</li>
        <li>책이름</li>
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

class LikeListContent extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="like_list_contents">
        <ul>
          <li>한국사</li>
          <li>한국사요약</li>
          <li>구매</li>
          <li>EBS</li>
          <li>100장</li>
          <li>11/300</li>
          <li>단면 10장<br/>양면 90장</li>
          <li>2020-10-10</li>
          <li>2020-10-20</li>
          <li><img src="img/folder_move.png" width="15px" alt="category-move"/></li>
          <li><StarOutlined style={{fontSize:'14px'}}/></li>
          <li>
          <ArrowUpOutlined style={{fontSize:'14px'}}/>
          <ArrowDownOutlined style={{fontSize:'14px'}}/>
          </li>
          <li><EyeOutlined style={{fontSize:'14px'}}/></li>
          <li><DeleteOutlined style={{fontSize:'14px'}} /></li>
        </ul>
      </div>
     );
  }
}



class LikeSectionContent extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="like_list_container">
        <LikeListColumns />
        <LikeListContent />
        <LikeListContent />
        <LikeListContent />
        <LikeListContent />
        <LikeListContent />
      </div>
     );
  }
}
 
export default LikeSectionContent;