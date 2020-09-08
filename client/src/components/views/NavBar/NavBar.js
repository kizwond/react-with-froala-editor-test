import React from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Layout, Menu, Row, Col, Input } from 'antd';
import './Sections/Navbar.css';
import { NavLink} from 'react-router-dom';
import { HomeOutlined, ReadOutlined, FormOutlined,
  ShopOutlined } from '@ant-design/icons';

const { Header } = Layout;
// const { Search } = Input;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      current: 'home',
     }
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  onClickLogoHandler = e => {
    this.setState({ current : e.key})
  }

  render(){
    const { current } = this.state;
    return (
      <Header>
        <Row>
          <Col flex="1 1 300px">
          <span className="logo">
            <NavLink to="/" exact><img src="img/logo_white.png" onClick={this.onClickLogoHandler} key="home" alt="logo"/></NavLink>
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
          {/* <Col flex="1 1 300px">
                <Search
                placeholder="input search text"
                theme="dark"
                enterButton="Search"
                size="small"
                onSearch={value => console.log(value)}
                style={{ width: 300, marginTop:"20px"}}
                />
          </Col> */}
          <Col flex="0 1 300px">
            <RightMenu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" />
          </Col>
        </Row>
      </Header>
      )
  }
}

export default NavBar