import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { SettingOutlined} from '@ant-design/icons';

const CategoryModal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <SettingOutlined  onClick={() => setVisible(true)} style={{fontSize:'14px'}}/>
      <Modal
        title={[<SettingOutlined  onClick={() => setVisible(true)} style={{fontSize:'14px'}}/>,<span style={{fontSize:"12px"}}> 카테고리 설정</span>]}
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={null}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
}

export default CategoryModal