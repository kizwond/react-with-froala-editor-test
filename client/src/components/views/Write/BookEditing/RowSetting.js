import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Affix, Button, Collapse, Switch, Modal, Select, Input, InputNumber, Upload, message } from 'antd';
import { SettingOutlined, DoubleRightOutlined,BoldOutlined,ItalicOutlined,UnderlineOutlined,UploadOutlined  } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

class RowSetting extends Component {
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
        <NewPageTemplete addCardType={this.props.addCardType}/>
        <Collapse defaultActiveKey={['1','2','3','4','5','6','7']} >
          <Panel header="페이지 크기" key="1" className="data_collapse_panel"> 
            <PageSize/>
          </Panel>
          <Panel header="페이지템플릿 선택" key="2" className="data_collapse_panel">
            <PageTemplete/>
          </Panel>
          <Panel header="페이지 여백" key="3" className="data_collapse_panel">
            <PagePadding/>
          </Panel>
          <Panel header="페이지 색" key="4" className="data_collapse_panel">
            <PageColor/>
          </Panel>
          <Panel header="페이지 번호" key="5" className="data_collapse_panel_numbering">
            <Switch size="small" className="page_numbering_toggle" />
            <PageNumbering/>
          </Panel>
          <Panel header="머릿글" key="6" className="data_collapse_panel_page_top">
            <Switch size="small" className="page_top_toggle" />
            <PageTop/>
          </Panel>
          <Panel header="바닥글" key="7" className="data_collapse_panel_page_bottom">
            <Switch size="small" className="page_bottom_toggle" />
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

class NewPageTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible:false,
      cardType:'카드종류를 선택해 주세요',
      cardNick:'',
      cardStar:false,
      card1:'',
      card2:'',
      card3:'',
      annotation:false,
     };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(this.state.cardType);
    console.log(this.state.cardNick);
    console.log(this.state.cardStar);
    console.log(this.state.card1);
    console.log(this.state.card2);
    console.log(this.state.card3);
    console.log(this.state.annotation);
    const value = {
                  card_type: this.state.cardType,
                  card_nick: this.state.cardNick,
                  card_star: this.state.cardStar,
                  face_1: this.state.card1,
                  face_2: this.state.card2,
                  face_3: this.state.card3,
                  annotation: this.state.annotation,
                  }
    this.props.addCardType(value)
    this.setState({
      cardType:'카드종류를 선택해 주세요',
      cardNick:'',
      cardStar:false,
      card1:'',
      card2:'',
      card3:'',
      annotation:false,
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      cardType:'카드종류를 선택해 주세요',
      cardNick:'',
      cardStar:false,
      card1:'',
      card2:'',
      card3:'',
      annotation:false,
      visible: false,
    });
  };
  handleChangeCardType=(value)=> {
    this.setState({
      cardType: value,
    });
  }
  handleChangeCardNick=(e)=> {
    this.setState({
      cardNick: e.target.value
    });
  }
  handleChangeStar=(value)=> {
    this.setState({
      cardStar: value,
    });
  }
  handleChangeNum1=(value)=> {
    this.setState({
      card1: value,
    });
  }
  handleChangeNum2=(value)=> {
    this.setState({
      card2: value,
    });
  }
  handleChangeNum3=(value)=> {
    this.setState({
      card3: value,
    });
  }
  handleChangeAnnotation=(value)=> {
    this.setState({
      annotation: value,
    });
  }
  render() {
    return (
      <div className='new_templete_button_container'>
        <Button size={'small'} onClick={this.showModal} >새 페이지 템플릿 추가</Button>
        <Modal
          title="새카드 템플릿"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='만들기'
          cancelText='취소'
          maskClosable={false}
        >
          <div className="new_card_templete_container">
            <div className="new_card_templete_columns">
              <div>카드종류</div>
              <div>카드별칭</div>
              <div>중요도 면 생성</div>
              <div>1면 - 행 생성 개수</div>
              <div>2면 - 행 생성 개수</div>
              <div>3면 - 행 생성 개수</div>
              <div>주석 면 생성</div>
            </div>
            <div className="new_card_templete_contents">
              <div>
                <Select autoFocus={true} size='small' value={this.state.cardType} style={{ width: 180 }} onChange={this.handleChangeCardType}>
                  <Option value="카드종류를 선택해 주세요">카드종류를 선택해 주세요</Option>
                  <Option value="1면">1면</Option>
                  <Option value="2면">2면</Option>
                  <Option value="3면">3면</Option>
                </Select>
              </div>
              <div>
                <Input size='small' style={{ width: 180 }} placeholder="카드별칭을 입력해 주세요" value={this.state.cardNick} onChange={this.handleChangeCardNick}/>
              </div>
              <div>
                <Switch size='small' checked={this.state.cardStar} onChange={this.handleChangeStar} />
              </div>
              <div>
                {this.state.cardType !== '카드종류을 선택해 주세요' ? <InputNumber size='small' style={{ width: 50 }} value={this.state.card1} onChange={this.handleChangeNum1} min="1" max="5" /> : <InputNumber size='small' style={{ width: 50 }} onChange={this.handleChangeNum1} min="1" max="5" disabled/> }
                최대 5행
              </div>
              <div>
                {this.state.cardType === '2면' || this.state.cardType ==='3면'? <InputNumber size='small' style={{ width: 50 }} value={this.state.card2} onChange={this.handleChangeNum2} min="1" max="5" /> : <InputNumber size='small' style={{ width: 50 }} onChange={this.handleChangeNum2} min="1" max="5" disabled/> }
                최대 5행
              </div>
              <div>
                {this.state.cardType === '3면' ? <InputNumber size='small' style={{ width: 50 }} value={this.state.card3} onChange={this.handleChangeNum3} min="1" max="5" /> : <InputNumber size='small' style={{ width: 50 }} onChange={this.handleChangeNum3} min="1" max="5" disabled/> }
                최대 5행
              </div>
              <div>
                <Switch size='small' checked={this.state.annotation} onChange={this.handleChangeAnnotation} />
              </div>
            </div>
          </div>
        </Modal>
      </div>
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
                <Select size='small' style={{ width: 195 }}>
                  <Option value="선택">선택</Option>
                  <Option value="선택">선택</Option>
                  <Option value="선택">선택</Option>
                  <Option value="선택">선택</Option>
                </Select>
              </div>
          </div>
          <div className='select_page_size_div'>
            <div>직접입력</div>
            <div>
              <Input size='small' style={{ width: 90, fontSize:10 }} prefix='w' suffix='px' type="number"/>
            </div>
            <div>
              <Input size='small' style={{ width: 90, fontSize:10 }} prefix='w' suffix='px' type="number"/>
            </div>
          </div>
          <div style={{paddingLeft:30, fontSize:'10px', fontStyle: 'italic', marginTop:6, color:'grey'}}>※ 선택하신 사이즈로 모든 페이지에 적용됩니다. </div>
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
            <Select size='small'  style={{ width: 270 }}>
              <Option value="선택">선택</Option>
              <Option value="선택">선택</Option>
              <Option value="선택">선택</Option>
              <Option value="선택">선택</Option>
            </Select>
          </div>
          <div style={{paddingLeft:30, fontSize:'10px', fontStyle: 'italic', marginTop:6, color:'grey'}}>※ 설정하려는 페이지 템플릿을 선택하십시오. </div>
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
            <div className="padding_top"><Input size='small' style={{ width: 70,fontSize:10 }} prefix='상' suffix='px' type="number"/></div>
            <div className="page_padding_mid_container">
              <div><Input size='small' style={{ width: 70,fontSize:10 }} prefix='좌' suffix='px' type="number"/></div>
              <div className="padding_img_outer">
                <div>본문</div>
              </div>
              <div><Input size='small' style={{ width: 70,fontSize:10 }} prefix='우' suffix='px' type="number"/></div>
            </div>
            <div className="padding_bottom"><Input size='small' style={{ width: 70,fontSize:10 }} prefix='하' suffix='px' type="number"/></div>
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
            <div><Input size='small' style={{ width: 125 }} type="text"/></div>
          </div>
          <div className="page_color_picker">
            <div>내부여백 색</div>
            <div><input type="color"/></div>
            <div><Input size='small' style={{ width: 125 }} type="text"/></div>
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
              <Select size='small' style={{ width: 90 }}>
                <Option value="맑은고딕">맑은고딕</Option>
              </Select>
            </div>
            <div>
              <Input size='small' style={{ width: 60,fontSize: 10 }} suffix='px' type="number"/>
              </div>
            <div>
              <BoldOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey' }}/>
            </div>
            <div>
              <ItalicOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
            <div>
            <UnderlineOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
            <Select size='small' style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
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
          <div style={{paddingLeft:30, fontSize:'10px', fontStyle: 'italic', marginTop:6, color:'grey'}}>※ 페이지 번호 지정 위치에 따라 머릿글/바닥글과 겹칠 수 있습니다. </div>
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
    const props = {
      name: 'file',
      action: '',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <>
        <div className="select_page_top">
          <div className="select_page_top_font">
            <div>글자 입력</div>
            <div><Input size='small' style={{ width: 206 }} type="text"/></div>
          </div>
          <div  className="select_page_top_font">
            <div>자동생성</div>
            <Select size='small' style={{ width: 206 }}>
              <Option value="목차">목차</Option>
            </Select>
          </div>
          <div className="select_page_font">
            <div>폰트</div>
            <div>
              <Select size='small' style={{ width: 90 }}>
                <Option value="맑은고딕">맑은고딕</Option>
              </Select>
            </div>
            <div>
              <Input size='small' style={{ width: 60,fontSize: 10 }} suffix='px' type="number"/>
              </div>
            <div>
              <BoldOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey' }}/>
            </div>
            <div>
              <ItalicOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
            <div>
            <UnderlineOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
          </div>

          <div className="select_page_location">
            <div>위치</div>
            <div>
              <Select size='small' style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
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
              <div>
                <Upload className='upload_img' {...props}>
                  <Button size='small' icon={<UploadOutlined />}>그림삽입</Button>
                </Upload></div>
                <div style={{paddingLeft:30, fontSize:'10px', fontStyle: 'italic', marginTop:6, color:'grey'}}>※ 최대크기 595px X 40px </div>
            </div>
          </div>
          <div className='select_page_top_div'>
            <div>사이즈</div>
              <Select size='small' style={{ width: 206 }}>
                <Option value="비율유지">최대크기 - 비율유지</Option>
              </Select>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <Select size='small' style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
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
    const props = {
      name: 'file',
      action: '',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <>
        <div className="select_page_top">
          <div className="select_page_top_font">
            <div>글자 입력</div>
            <div><Input size='small' style={{ width: 206 }} type="text"/></div>
          </div>
          <div  className="select_page_top_font">
            <div>자동생성</div>
            <Select size='small' style={{ width: 206 }}>
              <Option value="목차">목차</Option>
            </Select>
          </div>
          <div className="select_page_font">
            <div>폰트</div>
            <div>
              <Select size='small' style={{ width: 90 }}>
                <Option value="맑은고딕">맑은고딕</Option>
              </Select>
            </div>
            <div>
              <Input size='small' style={{ width: 60,fontSize: 10 }} suffix='px' type="number"/>
              </div>
            <div>
              <BoldOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey' }}/>
            </div>
            <div>
              <ItalicOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
            <div>
            <UnderlineOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
          </div>

          <div className="select_page_location">
            <div>위치</div>
            <div>
              <Select size='small' style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
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
              <div>
                <Upload className='upload_img' {...props}>
                  <Button size='small' icon={<UploadOutlined />}>그림삽입</Button>
                </Upload></div>
                <div style={{paddingLeft:30, fontSize:'10px', fontStyle: 'italic', marginTop:6, color:'grey'}}>※ 최대크기 595px X 40px </div>
            </div>
          </div>
          <div className='select_page_top_div'>
            <div>사이즈</div>
              <Select size='small' style={{ width: 206 }}>
                <Option value="비율유지">최대크기 - 비율유지</Option>
              </Select>
          </div>
          <div className="select_page_location">
            <div>위치</div>
            <div>
              <Select size='small' style={{ width: 85, marginTop: -1 }}>
                <Option value="위바깥">위바깥</Option>
              </Select>
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

export default RowSetting;