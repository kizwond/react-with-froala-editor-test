import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Button, Modal, Tree } from 'antd';
import { UnorderedListOutlined, DoubleLeftOutlined,CarryOutOutlined, FormOutlined  } from '@ant-design/icons';
import ContentsTable from './ContentsTable'
const { TabPane } = Tabs;


class LeftDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'right',
      order_key:'none',
      visible: false
    };
  }

  handleChange = (key) => {
    this.setState({
      order_key:key
    })
    this.props.onClick(key)
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { mode } = this.state;
    if(this.props.toggle === false) {
      var toggle = <UnorderedListOutlined />
    } else {
      var toggle = <DoubleLeftOutlined />
    }
    const contentsTableList = this.props.table_of_contents.map((table)=>{
        if(table.level === 1){
          let object = {
            title: table.table_name,
            key: table.order,
            icon: <CarryOutOutlined />,
            children: [],}
          return object
        } else if (table.level === 2){
          let object = {
            title: table.table_name,
            key: table.order,
            icon: <CarryOutOutlined />,
            children: [],}
          return object
        }else if (table.level === 3){
          let object = {
            title: table.table_name,
            key: table.order,
            icon: <CarryOutOutlined />,
            children: [],}
          return object
        }else if (table.level === 4){
          let object = {
            title: table.table_name,
            key: table.order,
            icon: <CarryOutOutlined />,
            children: [],}
          return object
        }else if (table.level === 5){
          let object = {
            title: table.table_name,
            key: table.order,
            icon: <CarryOutOutlined />,
            children: [],}
          return object
        }
      }
    )
    console.log(contentsTableList)
    const treeData = contentsTableList
    
    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };
    return (
        <Tabs defaultActiveKey={this.state.order_key} className="left_drawer" onChange={this.handleChange} type="card" size='small' tabPosition={mode} >
          <TabPane tab={toggle} key="none">
          </TabPane>
          <TabPane className="left_drawer_mokcha" tab="목차" key="목차">
            <div><Button onClick={this.showModal} size="small">목차편집</Button> </div>
            <ContentsTable tableDeleteHandler={this.props.tableDeleteHandler} tableOrderlHandler={this.props.tableOrderlHandler} tableLevelHandler={this.props.tableLevelHandler} changeTableNameHandler={this.props.changeTableNameHandler}  addTable={this.props.addTable} table_of_contents={this.props.table_of_contents} handleOk={this.handleOk} showModal={this.showModal} handleCancel={this.handleCancel} visible={this.state.visible}/>
            <div className="table_of_contents_container">
              <Tree
                showLine={true}
                showIcon={true}
                defaultExpandedKeys={['0-0-0']}
                onSelect={onSelect}
                treeData={treeData}
              />
            </div>
          </TabPane>
        </Tabs>
    );
  }
}



export default LeftDrawer