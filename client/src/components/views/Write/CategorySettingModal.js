import React, { useState } from 'react';
import { Modal } from 'antd';
import './CategorySettingModal.css'
import { SettingOutlined, PlusOutlined,DeleteOutlined,ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';


const CategoryList = (props) =>{
  return(
        <div className="category_setting_content">
          <ul>
            <li><PlusOutlined style={{fontSize:'14px'}} /></li>
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
  console.log(props)
  const [visible, setVisible] = useState(false);
  const categoryList = props.category.map((category)=>(
    <CategoryList key={category._id} category={category}/>
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