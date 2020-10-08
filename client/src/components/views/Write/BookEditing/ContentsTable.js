import React, { Component } from 'react';
import { Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
class ContentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <Modal
        title={[<SettingOutlined />, " 목차편집"]}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}

export default ContentsTable;