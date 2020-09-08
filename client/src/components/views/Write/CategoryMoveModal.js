import React, { Component } from 'react'
import './CategoryMoveModal.css'
import { Modal, Select,Button } from 'antd';
const { Option } = Select;




class CategoryMoveModal extends Component {
  state = {
    ModalText: '책이름ooo',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
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
          <div><span className="selected_book">[{ModalText}]</span>이 이동할 카테고리를 선택해 주세요.</div>
          <div>
          <Select defaultValue="카테고리 선택" size="small" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="한국사">한국사</Option>
            <Option value="세계사">세계사</Option>
            <Option value="고등수학">고등수학</Option>
          </Select>
            <span> 카테고리로 </span>
            <span>  
              <Button size="small" key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
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