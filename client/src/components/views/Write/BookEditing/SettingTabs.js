import React, { Component } from 'react';
import { Tabs } from 'antd';

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
        <div className="save_page_setting">
          <button>적용</button>
          <button>취소</button>
          <button>설정초기화</button>
        </div>
      </div>
    );
  }
}

export default SettingTabs