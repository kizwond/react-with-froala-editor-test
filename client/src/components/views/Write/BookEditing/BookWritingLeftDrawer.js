import React, { Component } from 'react';
import { Drawer, Button, Space } from 'antd';

class LeftDrawer extends Component {
  state = { visible: false, placement: 'left' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  render() {
    const { placement, visible } = this.state;
    return (
      <>
        <Space>
          <Button type="primary" onClick={this.showDrawer}>
            목차
          </Button>
        </Space>
        <Drawer
          placement={placement}
          closable={true}
          onClose={this.onClose}
          visible={visible}
          key={placement}
          maskClosable={false}
          mask={false}
          width={300}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  }
}
export default LeftDrawer
