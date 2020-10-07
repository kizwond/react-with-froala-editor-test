import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Affix, Button, Collapse, Switch } from 'antd';
import { UnorderedListOutlined, DoubleLeftOutlined  } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Panel } = Collapse;

class LeftDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'right',
      order_key:'none',
    };
  }

  handleChange = (key) => {
    this.setState({
      order_key:key
    })
    this.props.onClick(key)
  }

  render() {
    const { mode } = this.state;
    if(this.props.toggle === false) {
      var toggle = <UnorderedListOutlined />
    } else {
      var toggle = <DoubleLeftOutlined />
    }
    return (
        <Tabs defaultActiveKey={this.state.order_key} className="left_drawer" onChange={this.handleChange} type="card" size='small' tabPosition={mode} >
          <TabPane tab={toggle} key="none">
          </TabPane>
          <TabPane className="left_drawer_mokcha" tab="목차" key="목차">
            1111
          </TabPane>
        </Tabs>
    );
  }
}



export default LeftDrawer