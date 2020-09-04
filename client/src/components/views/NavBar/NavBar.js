import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
// import RightMenu from './Sections/RightMenu';
import { Layout, Menu, Row, Col, Input, Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import { NavLink} from 'react-router-dom';
import { HomeOutlined, ReadOutlined,FormOutlined,
  ShopOutlined,ShoppingCartOutlined,SolutionOutlined,
  KeyOutlined,UserAddOutlined } from '@ant-design/icons';

import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { useSelector } from "react-redux";

const { Header } = Layout;
const { Search } = Input;

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu theme="dark" mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
        <Menu.Item key="basket" icon={<ShoppingCartOutlined />}>
          Basket
        </Menu.Item>
        <Menu.Item key="myinfo" icon={<SolutionOutlined />}>
          Myinfo
        </Menu.Item>
      </Menu>
    )
  }
}



function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
<Header>
    <nav className="menu" >
      <div className="logo">
        <NavLink to="/" exact><img src="img/logo_white.png" key="home" alt="logo"/></NavLink>
      </div>
      <div className="menu__container">
        <div className="menu_left">
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="mail">
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
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
    </Header>
  )
}

export default NavBar