import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Affix, Button, Collapse, Switch, Modal, Select, Input, InputNumber, Upload, message } from 'antd';
import { SettingOutlined, DoubleRightOutlined,BoldOutlined,ItalicOutlined,UnderlineOutlined,UploadOutlined,AlignCenterOutlined,AlignLeftOutlined,AlignRightOutlined  } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

class CardSetting extends Component {
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
        <NewTemplete addCardType={this.props.addCardType}/>
        <Collapse defaultActiveKey={['1','2','3','4','5','6','7']} >
          <Panel header="템플릿 선택" key="1" className="data_collapse_panel"> 
            <SelectTemplete cardType={this.props.cardType} />
          </Panel>
          <Panel header="레이아웃" key="2" className="data_collapse_panel">
            <LayoutSetting/>
          </Panel>
          <Panel header="카드 배경색" key="3" className="data_collapse_panel">
            <CardBackgroundColor/>
          </Panel>
          <Panel header="카드 테두리 바깥쪽 여백" key="4" className="data_collapse_panel">
            <CardMargin/>
          </Panel>
          <Panel header="카드 테두리 안쪽 여백" key="5" className="data_collapse_panel_numbering">
            <CardPadding/>
          </Panel>
          <Panel header="카드 테두리" key="6" className="data_collapse_panel_page_top">
            <Switch size="small" className="page_top_toggle" />
            <CardBorder/>
          </Panel>
          <Panel header="폰트 일괄 변경" key="7" className="data_collapse_panel_page_bottom">
            <Switch size="small" className="page_bottom_toggle" />
            <FontChange/>
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
        <Button size={'small'} onClick={this.showModal} >새 카드 템플릿 추가</Button>
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


class SelectTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      card_selected:''
     };
  }
  onCardChangeHandler = (value) => {
    console.log(value)
    this.setState({
      card_selected:value
    })
  }
  render() {
    console.log(this.props.cardType)
    const cardTypeListOption = this.props.cardType.map((card_type)=>(
      <Option key={card_type._id} value={card_type.card_nick}>{card_type.card_nick} - ({card_type.card_type} 카드)</Option>
    ))
    const cardFaceListOption = this.props.cardType.map((card_type)=>{
      if(card_type.card_nick === this.state.card_selected){
        if(card_type.card_type === '1면'){
          return <><Option key={1} value='1면'>1면</Option></>
        } else if(card_type.card_type === '2면'){
          return <><Option key={1} value='1면'>1면</Option><Option key={2} value='2면'>2면</Option></>
        } else if(card_type.card_type === '3면'){
          return <><Option key={1} value='1면'>1면</Option><Option key={2} value='2면'>2면</Option><Option key={3} value='3면'>3면</Option></>
        }
      }
    })
    return (
      <>
        <div className="select_card_templete">
          <div className='select_page_size_div'>
              <div>카드</div>
              <div>
                <Select defaultValue="카드선택" size='small' onChange={this.onCardChangeHandler} style={{ width: 195 }}>
                  <Option value="카드선택">카드선택</Option>
                  {cardTypeListOption}
                </Select>
              </div>
          </div>
          <div className='select_page_size_div'>
              <div>면</div>
              <div>
                <Select defaultValue="면선택" size='small' style={{ width: 195 }}>
                  <Option value="면선택">면선택</Option>
                  {cardFaceListOption}
                </Select>
              </div>
          </div>
          <div className='select_page_size_div'>
              <div>행</div>
              <div>
                <Select defaultValue="행선택" size='small' style={{ width: 195 }}>
                  <Option value="행선택">행선택</Option>
                </Select>
              </div>
          </div>
        </div>
      </>
    );
  }
}

class LayoutSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="layout_container">
          <div className='select_mode_container'>
            <div>방향</div>
            <div>
              <Select size='small' style={{ width: 195 }}>
                <Option value="좌우">좌우</Option>
                <Option value="상하">상하</Option>
              </Select>
            </div>
          </div>
          <div className='select_mode_container'>
            <div></div>
            <div className='layout_example_img'>
              <img src="img/leftright.png" width='90px' alt="좌우"/>
              <img src="img/updown.png" width='90px'  alt="상하"/>
            </div>
          </div>
          <div className='select_mode_container'>
            <div>면간 비율</div>
            <div className='layout_ratio'>
              <div>
                <Input size='small' style={{ width: 62,fontSize:10 }} prefix='1면' suffix='%' type="text"/>
              </div>
              <div>
                <Input size='small' style={{ width: 62,fontSize:10 }} prefix='2면' suffix='%' type="text"/>
              </div>
              <div>
                <Input size='small' style={{ width: 62,fontSize:10 }} prefix='주석' suffix='%' type="text"/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

class CardBackgroundColor extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_card_bg_color_container">
          <div className="select_card_bg_color">
            <div>배경색</div>
            <div className="select_card_bg_color_right">
              <div><input type="color"/></div>
              <div><Input size='small' style={{ width: 125 }} type="text"/></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
class CardMargin extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_card_margin">
            <div className="card_margin_top"><Input size='small' style={{ width: 70,fontSize:10 }} prefix='상' suffix='px' type="number"/></div>
            <div className="card_margin_mid_container">
              <div><Input size='small' style={{ width: 70,fontSize:10 }} prefix='좌' suffix='px' type="number"/></div>
              <div className="">
                <img src="img/cardmargin.png" width="100" alt="cardmargin_img"/>
              </div>
              <div><Input size='small' style={{ width: 70,fontSize:10 }} prefix='우' suffix='px' type="number"/></div>
            </div>
            <div className="card_margin_bottom"><Input size='small' style={{ width: 70,fontSize:10 }} prefix='하' suffix='px' type="number"/></div>
        </div>
      </>
    );
  }
}
class CardPadding extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="select_card_margin">
            <div className="card_margin_top"><Input size='small' style={{ width: 70,fontSize:10 }} prefix='상' suffix='px' type="number"/></div>
            <div className="card_margin_mid_container">
              <div><Input size='small' style={{ width: 70,fontSize:10 }} prefix='좌' suffix='px' type="number"/></div>
              <div className="">
                <img src="img/cardpadding.png" width="100" alt="cardpadding_img"/>
              </div>
              <div><Input size='small' style={{ width: 70,fontSize:10 }} prefix='우' suffix='px' type="number"/></div>
            </div>
            <div className="card_margin_bottom"><Input size='small' style={{ width: 70,fontSize:10 }} prefix='하' suffix='px' type="number"/></div>
        </div>
      </>
    );
  }
}
class CardBorder extends Component {
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
        <div className="card_border_container">
          <div className="select_card_bg_color">
            <div>전체테두리</div>
            <div className="card_border_total">
              <div>
                <Select size='small' style={{ width: 50 }}>
                  <Option value="선택">선택</Option>
                  <Option value="선택">선택</Option>
                </Select>
              </div>
              <div><Input size='small' type="color" style={{width:20}}/></div>
              <div><Input size='small' style={{ width: 60 }} type="text"/></div>
              <div>
                <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
              </div>
            </div>
          </div>
          <div style={{paddingLeft:50}}>
            <Collapse className="border_detail" >
              <Panel header="테두리 상세 설정" key="1" className="data_collapse_panel"> 
                <div className="select_card_bg_color">
                  <div>상</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
                <div className="select_card_bg_color">
                  <div>하</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
                <div className="select_card_bg_color">
                  <div>좌</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
                <div className="select_card_bg_color">
                  <div>우</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="card_border_radius_container">
            <div>라운드</div>
            <div className="card_border_radius">
              <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/> 
            </div>
          </div>
          <div className="card_border_radius_container">
            <div>그림자</div>
            <div className="card_border_radius">
              <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/> 
            </div>
          </div>
        </div>
      </>
    );
  }
}
class FontChange extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="card_font_container">
          <div className="card_border_radius_container">
              <div>라운드</div>
              <div className="text_align">
                <AlignLeftOutlined />
                <AlignCenterOutlined />
                <AlignRightOutlined />
              </div>
          </div>
          <div className="card_border_radius_container">
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
        </div>
      </>
    );
  }
}

export default CardSetting;