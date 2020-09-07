import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Layout, Menu, Row, Col, Input, Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import { NavLink} from 'react-router-dom';
import { HomeOutlined, ReadOutlined, FormOutlined,
  ShopOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      current: 'home',
      visible: false  
     }
  }

  showDrawer = () => {
    this.setState({
      visible:true
    })
  };

  onClose = () => {
    this.setState({
      visible:false
    })
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };


  render(){
    const { current } = this.state;
    return (
      <Header>
               <Row>
                <Col flex="1 1 100px">
                <span className="logo">
                  <NavLink to="/" exact><img src="img/logo_white.png" key="home" alt="logo"/></NavLink>
                </span>
                  <Menu onClick={this.handleClick} selectedKeys={[current]} theme="dark" mode="horizontal">
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                      <NavLink to="/" exact>Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key="study" icon={<ReadOutlined />}>
                      <NavLink to="/study" exact>Study</NavLink>
                    </Menu.Item>
                    <Menu.Item key="write" icon={<FormOutlined />}>
                      <NavLink to="/write" exact>Write</NavLink>
                    </Menu.Item>
                    <Menu.Item key="book_store" icon={<ShopOutlined />}>
                      <NavLink to="/store" exact>Book Store</NavLink>
                    </Menu.Item>
                  </Menu>
                </Col>
                <Col flex="0 1 300px">
                  <RightMenu mode="horizontal" />
                </Col>
                </Row>
              <Button
                className="menu__mobile-button"
                type="primary"
                onClick={this.showDrawer}
              >
                <HomeOutlined />
              </Button>
              <Drawer
                title="Basic Drawer"
                placement="right"
                className="menu_drawer"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <LeftMenu mode="inline" />
                <RightMenu mode="inline" />
              </Drawer>
        </Header>
      )
  }
}

export default NavBar