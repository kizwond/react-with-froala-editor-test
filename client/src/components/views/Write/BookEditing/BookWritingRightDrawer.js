import React, { Component } from 'react';
import { Drawer, Button, Space } from 'antd';
import SettingTabs from './SettingTabs'

class LeftDrawer extends Component {
  state = { visible: false, placement: 'right' };

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
            설정
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
          <SettingTabs/>
        </Drawer>
      </>
    );
  }
}
export default LeftDrawer
