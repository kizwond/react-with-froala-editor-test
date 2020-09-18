import React, { Component } from 'react'
import './CategoryMoveModal.css'
import { Modal, Select,Button } from 'antd';
const { Option } = Select;




class CategoryMoveModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      confirmLoading: false,
      moveTo: '',
     }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (book_id, event) => {
    console.log("clicked")
    this.setState({
      confirmLoading: true,
    });
    this.setState({
      visible: false,
      confirmLoading: false,
    });
    event({bookId:book_id._id, category:this.state.moveTo, prevCategory:book_id.category})
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      moveTo:value
    })
  }

  render() {
    const { visible, confirmLoading } = this.state;
    if(this.props.category) {
      var optionList = this.props.category.map((category)=>(
        <Option key={category._id} value={category.category_name}>{category.category_name}</Option>
      ))
    } else {
      optionList = ''
    }
    
    return (
      <>
        <img src="img/folder_move.png" onClick={this.showModal} width="15px" alt="category-move"/>
        <Modal
          className={"category_move_modal"}
          style={{ top: 100 }}
          title="책 카테고리 이동"
          visible={visible}
          width={"310px"}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div><span className="selected_book">[{this.props.bookTitle.book_title}]</span>이 이동할 카테고리를 선택해 주세요.</div>
          <div>
          <Select defaultValue="카테고리 선택" size="small" style={{ width: 120 }} onChange={this.handleChange}>
            {optionList}
          </Select>
            <span> 카테고리로 </span>
            <span>  
              <Button size="small" key="submit" type="primary" loading={confirmLoading} onClick={()=>this.handleOk(this.props.bookTitle, this.props.bookCategoryMove)}>
              이동
              </Button>
            </span>
          </div>
        </Modal>
      </>
    );
  }
}

export default CategoryMoveModal