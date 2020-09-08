import React, { Component } from 'react'

import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteOutlined,WarningTwoTone } from '@ant-design/icons';
const { confirm } = Modal;


class DeleteBook extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  showPromiseConfirm = () => {
    confirm({
      title: ['ooo 책을 삭제하시겠습니까?'],
      icon: <ExclamationCircleOutlined />,
      content: [<WarningTwoTone twoToneColor="red"/>,<span style={{fontSize:"12px",fontWeight:"700"}}> 삭제시 <span style={{color:"red"}}>영구 삭제</span> 되오니 신중히 결정 하십시오.</span>,<br/>,<span style={{fontSize:"11px",fontWeight:"700"}}>- 구매한책일경우, oo에서 다시 불러올 수 있으나,<br/> 본인이 추가한 카드는 영구 삭제됩니다.</span>],
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }
  render() { 
    return ( 
      <Space>
        <DeleteOutlined onClick={this.showPromiseConfirm} style={{fontSize:'14px'}} />
      </Space>
    );
  }
}



export default DeleteBook