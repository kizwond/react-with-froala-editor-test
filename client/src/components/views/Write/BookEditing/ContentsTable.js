import React, { Component } from 'react';
import { Modal } from 'antd';
import { PlusCircleOutlined,DeleteOutlined,CaretDownOutlined,CaretUpOutlined,SettingOutlined,EditOutlined,StepBackwardOutlined,StepForwardOutlined } from '@ant-design/icons';
import './ContentsTable.css'
class ContentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <Modal
        title={[<SettingOutlined />, " 목차편집"]}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
        width={900}
      >
        <div className="mokcha_container">
          <div className="mokcha_columns">
            <div className="mokcha_left_columns">
              <div>레벨</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
            <div className="mokcha_right_columns">
              <div>이름변경</div>
              <div>레벨이동</div>
              <div>순서이동</div>
              <div>삭제</div>
            </div>
          </div>
          <div className="mokcha_contents">
            <div className="mokcha_levels">
              <div></div>
              <div><PlusCircleOutlined /></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="mokcha_tools">
              <div><EditOutlined /></div>
              <div><StepBackwardOutlined /> <StepForwardOutlined /></div>
              <div><CaretUpOutlined /> <CaretDownOutlined /></div>
              <div><DeleteOutlined /></div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ContentsTable;