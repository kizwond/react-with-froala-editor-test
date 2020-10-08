import React, { Component, Fragment } from 'react';
import { Modal, Popover,Form, Input, Button, Space } from 'antd';
import { PlusCircleOutlined,DeleteOutlined,CaretDownOutlined,CaretUpOutlined,SettingOutlined,EditOutlined,StepBackwardOutlined,StepForwardOutlined } from '@ant-design/icons';
import './ContentsTable.css'
class ContentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     };
  }
  render() {
    console.log(this.props.table_of_contents)
    return (
      <Modal
        title={[<SettingOutlined />, " 목차편집"]}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
        width={900}
      >
        <div className="mokcha_container">
          <div className="mokcha_columns">
            <div className="mokcha_left_columns">
              <div>레벨</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
            <div className="mokcha_right_columns">
              <div>이름변경</div>
              <div>레벨이동</div>
              <div>순서이동</div>
              <div>삭제</div>
            </div>
          </div>
          <div className="mokcha_contents">
            <ContentsTableList table_of_contents={this.props.table_of_contents}/>
          </div>
        </div>
      </Modal>
    );
  }
}

class ContentsTableList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputArea : false,
      newInput : false
     };
  }

  onFinish = value => {
    this.props.addTable({value, prevTableId:this.props.table_of_contents._id})
    this.newInputVisible()
  };

  inputAreaVisible = () =>{
    this.setState(state => ({
      inputArea: !state.inputArea
    }));
  }
  newInputVisible = () =>{
    this.setState(state => ({
      newInput: !state.newInput
    }));
  }

  render() {
    const text = <span>새로운 목차를 입력해 주세요.</span>;
    const content = (
      <Form
          layout={'inline'}
          size="small"
          onFinish={this.onFinish}
          className="change_book_title_input_form"
        >
          <Space>
          <Form.Item name={['newCategory']} rules={[{ required: true }]} >
            <Input placeholder='' />
          </Form.Item>
          <Form.Item className="change_book_title_buttons">
            <Button type="primary" htmlType="submit">완료</Button>
            <Button type="primary" onClick={this.newInputVisible}>취소</Button>
          </Form.Item>
          </Space>
        </Form>
    );

    const contentsTableList = this.props.table_of_contents.map((table)=>(
      < Fragment key={content._id}>
        <div className="mokcha_levels">
          <div></div>
          <div>
          <Popover placement="rightTop" editCategory title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {table.table_name}</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="mokcha_tools">
          <div><EditOutlined /></div>
          <div><StepBackwardOutlined /> <StepForwardOutlined /></div>
          <div><CaretUpOutlined /> <CaretDownOutlined /></div>
          <div><DeleteOutlined /></div>
        </div>
      </Fragment>
    ))
    return (
      <>
        {contentsTableList}
      </>
    );
  }
}


export default ContentsTable;