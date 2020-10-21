import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Affix, Button, Collapse, Switch } from 'antd';
import { SettingOutlined, DoubleRightOutlined  } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Panel } = Collapse;

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
      var toggle = <SettingOutlined />
    } else {
      var toggle = <DoubleRightOutlined />
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

  genExtra = () => (
    <Switch size="small"
      onClick={event => {
        event.stopPropagation();
      }}
    />
  );
  render() {
   
    return (
      <div className="page_setting_container">
        <NewTemplete/>
        <Collapse defaultActiveKey={['1','2','3','4','5','6','7']} >
          <Panel header="페이지템플릿 선택" key="1" className="data_collapse_panel"> 
            <PageTemplete/>
          </Panel>
          <Panel header="페이지 크기" key="2" className="data_collapse_panel">
            <PageSize/>
          </Panel>
          <Panel header="페이지 여백" key="3" className="data_collapse_panel">
            <PagePadding/>
          </Panel>
          <Panel header="페이지 색" key="4" className="data_collapse_panel">
            <PageColor/>
          </Panel>
          <Panel header="페이지 번호" key="5" className="data_collapse_panel">
            <PageNumbering/>
          </Panel>
          <Panel header="머릿글" key="6" className="data_collapse_panel_page_top">
            <Switch size="small" className="page_top_toggle" />
            <PageTop/>
          </Panel>
          <Panel header="바닥글" key="7" className="data_collapse_panel">
            <PageBottom/>
          </Panel>
        </Collapse>
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
class NewTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        
          <div className='new_templete_button_container'>
            <Button size={'small'}>새 페이지 템플릿 추가</Button>
          </div>
        
      </>
    );
  }
}
class PageTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_page_templete_container">
          <div className='select_page_templete_select_container'>
            <select>
              <option value="선택">선택</option>
              <option value="선택">선택</option>
              <option value="선택">선택</option>
              <option value="선택">선택</option>
            </select>
          </div>
        </div>
      </>
    );
  }
}
class PageSize extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_page_size">
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
      </>
    );
  }
}
class PagePadding extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_page_padding">
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
      </>
    );
  }
}
class PageColor extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_page_color">
          <div className="page_color_picker">
            <div>본문색</div>
            <div><input type="color"/></div>
            <div><input className="show_color_value" type="text"/></div>
          </div>
          <div className="page_color_picker">
            <div>내부여백 색</div>
            <div><input type="color"/></div>
            <div><input className="show_color_value"  type="text"/></div>
          </div>
        </div>
      </>
    );
  }
}
class PageNumbering extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_page_numbering">
          <div className="select_page_font">
            <div>폰트</div>
            <div>
              <select>
                <option value="맑은고딕">맑은고딕</option>
              </select>
            </div>
            <div><input type="text"/> px</div>
          </div>
          <div className="select_page_font_style">
            <div>bold</div>
            <div>
              <select>
                <option value="off">off</option>
              </select>
            </div>
            <div>italic</div>
            <div>
              <select>
                <option value="off">off</option>
              </select>
            </div>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <select>
                <option value="위바깥">위바깥</option>
              </select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
class PageTop extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_page_top">
          <div className="select_page_top_font">
            <div>텍스트입력</div>
            <div><input type="text"/></div>
            <div><button>자동입력</button></div>
          </div>
          <div className="select_page_font">
            <div>폰트</div>
            <div>
              <select>
                <option value="맑은고딕">맑은고딕</option>
              </select>
            </div>
            <div><input type="text"/> px</div>
          </div>
          <div className="select_page_font_style">
            <div>bold</div>
            <div>
              <select>
                <option value="off">off</option>
              </select>
            </div>
            <div>italic</div>
            <div>
              <select>
                <option value="off">off</option>
              </select>
            </div>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <select>
                <option value="위바깥">위바깥</option>
              </select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div>
            <div className="select_page_location_img_upload"> 
              <div>이미지입력</div>
              <div><button>그림삽입</button></div>
              <div>최대크기 595px X 40px</div>
            </div>
          </div>
          <div className='select_page_top_div'>
            <div>직접입력</div>
            <div>
              W <input type="number"/> px 
            </div>
            <div>
              W <input type="number"/> px
            </div>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <select>
                <option value="위바깥">위바깥</option>
              </select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
class PageBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_page_bottom">
          <div className="select_page_top_font">
            <div>텍스트입력</div>
            <div><input type="text"/></div>
            <div><button>자동입력</button></div>
          </div>
          <div className="select_page_font">
            <div>폰트</div>
            <div>
              <select>
                <option value="맑은고딕">맑은고딕</option>
              </select>
            </div>
            <div><input type="text"/> px</div>
          </div>
          <div className="select_page_font_style">
            <div>bold</div>
            <div>
              <select>
                <option value="off">off</option>
              </select>
            </div>
            <div>italic</div>
            <div>
              <select>
                <option value="off">off</option>
              </select>
            </div>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <select>
                <option value="위바깥">위바깥</option>
              </select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div>
            <div className="select_page_location_img_upload"> 
              <div>이미지입력</div>
              <div><button>그림삽입</button></div>
              <div>최대크기 595px X 40px</div>
            </div>
          </div>
          <div className='select_page_top_div'>
            <div>직접입력</div>
            <div>
              W <input type="number"/> px 
            </div>
            <div>
              W <input type="number"/> px
            </div>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <select>
                <option value="위바깥">위바깥</option>
              </select>
            </div>
            <div className="location_box">
              <div className="location_left_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="location_right_box" style={{width:"50%"}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SettingTabs