import React, { useState, Component } from 'react';
import { Modal, Popover,Form, Input, Button, Space  } from 'antd';
import './CategorySettingModal.css'
import { SettingOutlined, PlusOutlined,DeleteOutlined,ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';
import ChangeCategoryName from './ChangeCategoryName'
import DeleteCategory from './DeleteCategory'

// const [form] = Form.useForm();

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputArea : false,
      newInput : false
     };
  }  

  onFinish = value => {
    this.props.addCategory({value, prevCategoryId:this.props.category._id})
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
    
    const text = <span>새로운 카테고리 이름을 입력해 주세요.</span>;
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

    return(
        <div className="category_setting_content">
          <ul>
            <li>
              <Popover placement="rightTop" editCategory title={text} visible={this.state.newInput} content={content} trigger="click">
                <PlusOutlined onClick={this.newInputVisible} style={{fontSize:'14px'}} />
              </Popover>
            </li>
            <li>{this.state.inputArea ? <ChangeCategoryName vi={this.state.inputArea} inputAreaVisible={this.inputAreaVisible} category={this.props.category} changeCategoryHandler={this.props.changeCategoryHandler}/> : <>{this.props.category.category_name}/순서:{this.props.category.category_order} </>}</li>
            <li>
              {this.props.category.category_name === '미지정' ? '' :<EditOutlined onClick={this.inputAreaVisible} style={{fontSize:'14px'}}/>}
            </li>
            <li>
              {this.props.category.category_name === '미지정' ? '' : <><ArrowUpOutlined onClick={()=>this.props.categoryListOrderHandler({action: 'up', categoryId: this.props.category._id})} style={{fontSize:'14px'}}/>
                                                                       <ArrowDownOutlined onClick={()=>this.props.categoryListOrderHandler({action: 'down', categoryId: this.props.category._id})} style={{fontSize:'14px'}}/></>}
            </li>
            <li>{this.props.category.category_name === '미지정' ? '' :<DeleteCategory categoryTotal={this.props.categoryTotal} category={this.props.category} categoryDeleteHandler={this.props.categoryDeleteHandler}/>}</li>
            <li>{this.props.category.contents_quantity}</li>
            <li>한국사1, 한국사2, 한국사3, 한국사4, 한국사5, 한국사6, 한국사7, 한국사8</li>
          </ul>
        </div>
    )
  }
}



class CategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false
     };
  }

  render() {
    const categoryList = this.props.category.map((category)=>(
      <CategoryList categoryListOrderHandler={this.props.categoryListOrderHandler} categoryDeleteHandler={this.props.categoryDeleteHandler} changeCategoryHandler={this.props.changeCategoryHandler} addCategory={this.props.addCategory} key={category._id} categoryTotal={this.props.category} category={category}/>
    ))
    
    return (
      <>
        <SettingOutlined  onClick={() => this.setState({visible:true})} style={{fontSize:'14px'}}/>
        <Modal
          title={[<SettingOutlined  onClick={() => this.setState({visible:true})} style={{fontSize:'14px'}}/>,<span style={{fontSize:"12px"}}> 카테고리 설정</span>]}
          visible={this.state.visible}
          onCancel={() => this.setState({visible:false})}
          width={1000}
          footer={null}
          style={{ top: 70 }}
        >
          <div className="category_setting_columns">
            <ul>
              <li>추가</li>
              <li>카테고리 명</li>
              <li>이름변경</li>
              <li>표시순서<br/>변경</li>
              <li>삭제</li>
              <li>총 책권수</li>
              <li>책 제목모음</li>
            </ul>
          </div>
          {categoryList}
        </Modal>
      </>
    )
  }
}

export default CategoryModal