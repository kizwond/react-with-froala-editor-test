import React, { useState } from 'react';
import { Modal, Popover,Form, Input, Button, Space  } from 'antd';
import './CategorySettingModal.css'
import { SettingOutlined, PlusOutlined,DeleteOutlined,ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';


      

const CategoryList = (props) =>{
  const [form] = Form.useForm();

  const onFinish = value => {
    props.addCategory({value, prevCategoryId:props.category._id})
    // props.onClick()
  };
  const text = <span>새로운 카테고리 이름을 입력해 주세요.</span>;
  const content = (
    <Form
        layout={'inline'}
        form={form}
        size="small"
        onFinish={onFinish}
        className="change_book_title_input_form"
      >
        <Space>
        <Form.Item name={['newCategory']} rules={[{ required: true }]} >
          <Input placeholder='' />
        </Form.Item>
        <Form.Item className="change_book_title_buttons">
          <Button type="primary" htmlType="submit">완료</Button>
          <Button type="primary" onClick={props.onClick}>취소</Button>
        </Form.Item>
        </Space>
      </Form>
  );

  return(
        <div className="category_setting_content">
          <ul>
            <li>
              <Popover placement="rightTop" editCategory title={text} content={content} trigger="click">
                <PlusOutlined style={{fontSize:'14px'}} />
              </Popover>
            </li>
            <li>{props.category.category_name}/순서:{props.category.category_order}</li>
            <li><EditOutlined style={{fontSize:'14px'}}/></li>
            <li>
              <ArrowUpOutlined style={{fontSize:'14px'}}/>
              <ArrowDownOutlined style={{fontSize:'14px'}}/>
            </li>
            <li>{props.category.category_name === '미지정' ? '' :<DeleteOutlined style={{fontSize:'14px'}}/>}</li>
            <li>{props.category.contents_quantity}</li>
            <li>한국사1, 한국사2, 한국사3, 한국사4, 한국사5, 한국사6, 한국사7, 한국사8</li>
          </ul>
        </div>
  )
}


const CategoryModal = (props) => {
  const [visible, setVisible] = useState(false);
  const categoryList = props.category.map((category)=>(
    <CategoryList addCategory={props.addCategory} key={category._id} category={category}/>
  ))
  
  return (
    <>
      <SettingOutlined  onClick={() => setVisible(true)} style={{fontSize:'14px'}}/>
      <Modal
        title={[<SettingOutlined  onClick={() => setVisible(true)} style={{fontSize:'14px'}}/>,<span style={{fontSize:"12px"}}> 카테고리 설정</span>]}
        visible={visible}
        onCancel={() => setVisible(false)}
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
  );
}

export default CategoryModal