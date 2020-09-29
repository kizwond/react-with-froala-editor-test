import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Affix, Button } from 'antd';

const { TabPane } = Tabs;

class SettingTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'left',
      key:'',
    };
  }

  handleChange =(key) => {
    this.setState({
      key:key
    })
    this.props.onClick(key)
  }

  render() {
    const { mode } = this.state;
    if(this.props.toggle === false) {
      var toggle = '설정'
    } else {
      var toggle = '접기'
    }
    return (
        <Tabs defaultActiveKey={this.state.key} onChange={this.handleChange} type="card" size='small' tabPosition={mode} >
          <TabPane tab={toggle} key="0">
          </TabPane>
          <TabPane tab="페이지설정" key="1">
            <PageSetting/>
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


class PageSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div className="page_setting_container">
        <div className="select_page_templete_container">
          <div>페이지 템플릿 선택</div>
          <div className='select_page_templete_select_container'>
            <select>
              <option value="선택">선택</option>
              <option value="선택">선택</option>
              <option value="선택">선택</option>
              <option value="선택">선택</option>
            </select>
          </div>
        </div>
        <div className="select_page_size">
          <div>페이지 크기</div>
          <div className='select_page_size_div'>
              <div>판본 사이즈</div>
              <div>
                <select>
                  <option value="선택">선택</option>
                  <option value="선택">선택</option>
                  <option value="선택">선택</option>
                  <option value="선택">선택</option>
                </select>
              </div>
          </div>
          <div className='select_page_size_div'>
            <div>직접입력</div>
            <div>
              W <input type="number"/> px 
            </div>
            <div>
              W <input type="number"/> px
            </div>
          </div>
        </div>
        <div className="select_page_padding">
          <div>페이지 여백</div>
          <div className="page_padding_container">
            <div className="padding_top">상 <input type="number"/> px</div>
            <div className="page_padding_mid_container">
              <div>좌 <input type="number"/> px</div>
              <div className="padding_img_outer">
                <div>본문</div>
              </div>
              <div>우 <input type="number"/> px</div>
            </div>
            <div className="padding_bottom">하 <input type="number"/> px</div>
          </div>
        </div>
        <div className="select_page_color">
          <div>색 지정</div>
        </div>
        <div className="select_page_numbering">
          <div>페이지 번호</div>
        </div>
        <div className="select_page_top">
          <div>머릿글</div>
        </div>
        <div className="select_page_bottom">
          <div>바닥글</div>
        </div>
        <Affix offsetBottom={0}>
          <div className="save_page_setting">
            <Button type="primary" shape="round" size="small">적용</Button>
            <Button type="primary" shape="round" size="small">취소</Button>
            <Button type="primary" shape="round" size="small">설정초기화</Button>
          </div>
        </Affix>
      </div>
    );
  }
}

export default SettingTabs