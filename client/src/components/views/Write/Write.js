import React, { Component } from 'react';
import './Write.css'
import LikeSectionContent from './LikeSectionContent'
import ListSectionContent from './ListSectionContent'
import {NavLink} from 'react-router-dom'

class WriteMain extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="write_container">
        <LikeSectionContent/>
        <NavLink to="/naming" exact ><button>새로만들기</button></NavLink> 
        <div className="book_list_container_in_write">
          <ListSectionContent/>
        </div>
      </div>
     );
  }
}
 
export default WriteMain;