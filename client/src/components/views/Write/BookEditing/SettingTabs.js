import React, { Component } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class SettingTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'left',
    };
  }

  render() {
    const { mode } = this.state;
    return (
        <Tabs defaultActiveKey="1" type="card" size='small' tabPosition={mode} >
          <TabPane onClick={this.props.handleClick} tab="페이지설정" key="1">
            <div  >Content of tab 1</div>
          </TabPane>
          <TabPane tab="카드설정" key="2">
            Content of tab 2
          </TabPane>
          <TabPane tab="면설정" key="3">
            Content of tab 3
          </TabPane>
          <TabPane tab="행설정" key="4">
            Content of tab 4
          </TabPane>
        </Tabs>
    );
  }
}

export default SettingTabs