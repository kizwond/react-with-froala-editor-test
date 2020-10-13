import React, { Component } from 'react';
import { Modal, Popover,Form, Input, Button, Space } from 'antd';
import { PlusCircleOutlined,DeleteOutlined,CaretDownOutlined,CaretUpOutlined,SettingOutlined,EditOutlined,StepBackwardOutlined,StepForwardOutlined } from '@ant-design/icons';
import './ContentsTable.css'
import ContentsTableChangeName from './ContentsTableChangeName'
import DeleteTable from './DeleteTable'

class ContentsTableList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputArea : false,
      newInput : false
     };
  }

  onFinish = value => {
    this.props.addTable({value, prevTableId:this.props.table._id, prevTableLevel:this.props.table.level, prevTableOrder:this.props.table.order})
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
          <Form.Item name={['newTable']} rules={[{ required: true }]} >
            <Input placeholder='' />
          </Form.Item>
          <Form.Item className="change_book_title_buttons">
            <Button type="primary" htmlType="submit">완료</Button>
            <Button type="primary" onClick={this.newInputVisible}>취소</Button>
          </Form.Item>
          </Space>
        </Form>
    );
    return (
      <div className="mokcha_contents">
        <div className="mokcha_levels">
          <div></div>
          {this.props.table.level === 1 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {this.state.inputArea ? <ContentsTableChangeName changeTableNameHandler={this.props.changeTableNameHandler} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.table_name}</>}
          </div> : <div></div>}
          {this.props.table.level === 2 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {this.state.inputArea ? <ContentsTableChangeName changeTableNameHandler={this.props.changeTableNameHandler} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.table_name}</>}
          </div> : <div></div>}
          {this.props.table.level === 3 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {this.state.inputArea ? <ContentsTableChangeName changeTableNameHandler={this.props.changeTableNameHandler} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.table_name}</>}
          </div> : <div></div>}
          {this.props.table.level === 4 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {this.state.inputArea ? <ContentsTableChangeName changeTableNameHandler={this.props.changeTableNameHandler} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.table_name}</>}
          </div> : <div></div>}
          {this.props.table.level === 5 ? <div>
          <Popover placement="rightTop" title={text} visible={this.state.newInput} content={content} trigger="click">
            <PlusCircleOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} /> 
          </Popover>
            {this.state.inputArea ? <ContentsTableChangeName changeTableNameHandler={this.props.changeTableNameHandler} table={this.props.table} vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} /> : <> {this.props.table.table_name}</>}
          </div> : <div></div>}
        </div>
        <div className="mokcha_tools">
          <div><EditOutlined onClick={this.inputAreaVisible} style={{fontSize:'14px'}}/></div>
          <div><StepBackwardOutlined onClick={()=>this.props.tableLevelHandler({action:'minus', tableId:this.props.table._id, presentLevel:this.props.table.level})}/> <StepForwardOutlined onClick={()=>this.props.tableLevelHandler({action:'plus', tableId:this.props.table._id, presentLevel:this.props.table.level})}/></div>
          <div><CaretUpOutlined onClick={()=>this.props.tableOrderlHandler({action:'up', bookId:this.props.table.book_id, tableId:this.props.table._id, presentOrder:this.props.table.order})}/> <CaretDownOutlined onClick={()=>this.props.tableOrderlHandler({action:'down', bookId:this.props.table.book_id, tableId:this.props.table._id, presentOrder:this.props.table.order})}/></div>
          <div><DeleteTable table={this.props.table} tableDeleteHandler={this.props.tableDeleteHandler}/></div>
        </div>
      </div>
    );
  }
}

class ContentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     };
  }
  render() {
    console.log(this.props.table_of_contents)
    const contentsTableList = this.props.table_of_contents.map((table)=>(
      <ContentsTableList key={table._id} 
                         table={table} 
                         addTable={this.props.addTable} 
                         table_of_contents={this.props.table_of_contents}
                         changeTableNameHandler={this.props.changeTableNameHandler}
                         tableLevelHandler={this.props.tableLevelHandler} 
                         tableOrderlHandler={this.props.tableOrderlHandler}
                         tableDeleteHandler={this.props.tableDeleteHandler}/>
    ))
    return (
      <Modal
        title={[<SettingOutlined />, " 목차편집"]}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
        width={900}
        maskClosable={false}
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
          
            {contentsTableList}
         
        </div>
      </Modal>
    );
  }
}
export default ContentsTable;