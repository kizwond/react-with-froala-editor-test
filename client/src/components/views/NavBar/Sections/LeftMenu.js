import React from 'react';
import { Menu } from 'antd';
import { NavLink} from 'react-router-dom';
import { HomeOutlined, ReadOutlined,FormOutlined,
  ShopOutlined,ShoppingCartOutlined,SolutionOutlined,
  KeyOutlined,UserAddOutlined } from '@ant-design/icons';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
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
  )
}

export default LeftMenu