import React, { Component } from 'react'

import { Modal, Space, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteOutlined,WarningTwoTone } from '@ant-design/icons';
const { confirm } = Modal;
const { Option } = Select;

class DeleteTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      table:this.props.table,
     }
  }
  
  deleteThis = (value) => {
    this.props.tableDeleteHandler({value, bookId:this.props.table.book_id, tableId:this.props.table._id})
  }
  showPromiseConfirm = (table, event) => {
    console.log(this)
    confirm({
      title: [`[${this.state.table.table_name}] 목차를 삭제하시겠습니까?`],
      okText: '삭제',
      cancelText: '취소',
      icon: <ExclamationCircleOutlined />,
      content: [],
      onOk() {  
        event({tableId:table._id})
      },
      onCancel() { },
    });
  }
  render() { 
    return ( 
      <Space>
        <DeleteOutlined onClick={()=>this.showPromiseConfirm(this.state.table, this.deleteThis)} style={{fontSize:'14px'}} />
      </Space>
    );
  }
}



export default DeleteTable