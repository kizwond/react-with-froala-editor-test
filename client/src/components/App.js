import React, { Suspense, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
// import Footer from "./views/Footer/Footer";
import Study from "./views/Study/Study"
import Write from "./views/Write/Write"
import Store from "./views/Store/Store"
import Basket from './views/Store/Basket'
import MyInfo from './views/Account/MyInfo'
import BookNaming from './views/Write/BookEditing/BookNaming'

import { Layout, Affix } from 'antd';

import './App.css'
const { Header,Content, Footer } = Layout;

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  const [top, setTop] = useState(0);
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Layout className="layout">
        <Header>
          <Affix offsetTop={top}>
            <NavBar />
          </Affix>
        </Header>
        <Content>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route path="/study" exact strict component={Auth(Study, null)}/>
            <Route path="/write" exact strict component={Auth(Write, null)}/>
            <Route path="/store" exact strict component={Auth(Store, null)}/>
            <Route path="/basket" exact strict component={Auth(Basket, null)}/>
            <Route path="/myinfo" exact strict component={Auth(MyInfo, null)}/>
            <Route path="/naming" exact strict component={Auth(BookNaming, null)}/>
          </Switch>
          <Footer style={{ textAlign: 'center' }}>CogBOOK ©2020 Created by OpenSKY</Footer>
        </Content>
      </Layout>
    </Suspense>
  );
}

export default App;
