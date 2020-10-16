import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Button, Modal, Tree } from 'antd';
import { UnorderedListOutlined, DoubleLeftOutlined,CarryOutOutlined, FormOutlined  } from '@ant-design/icons';
import ContentsTable from './ContentsTable'
const { TabPane } = Tabs;


class LeftDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'right',
      order_key:'none',
      visible: false,
      level_1:[],
      level_2:[]
    };
  }

  handleChange = (key) => {
    this.setState({
      order_key:key
    })
    this.props.onClick(key)
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { mode } = this.state;
    if(this.props.toggle === false) {
      var toggle = <UnorderedListOutlined />
    } else {
      var toggle = <DoubleLeftOutlined />
    }
    let level_all =[];

    const contentsTableList = this.props.table_of_contents.map((table, index)=>{
        if(table){
          if(table.level === 1){
            let level = {
              title: table.table_name,
              key: table.order,
              level: 1,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          } else if(table.level === 2){
            let level = {
              title: table.table_name,
              key: table.order,
              level: 2,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          } else if(table.level === 3){
            let level = {
              title: table.table_name,
              key: table.order,
              level: 3,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          } else if(table.level === 4){
            let level = {
              title: table.table_name,
              key: table.order,
              level: 4,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          } else if(table.level === 5){
            let level = {
              title: table.table_name,
              key: table.order,
              level: 5,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          }     
        } 
      }
    )

    const level_5 = obj => obj.level === 5;
    const level_4 = obj => obj.level === 4;
    const level_3 = obj => obj.level === 3;
    const level_2 = obj => obj.level === 2;
    if(level_all.length > 0){
      let level_5_exist = level_all.some(level_5)
      let level_4_exist = level_all.some(level_4)
      let level_3_exist = level_all.some(level_3)
      let level_2_exist = level_all.some(level_2)

      //level_5 exist
      if(level_5_exist === true){
        let temp_data_4 = []
        let temp_data_3 = []
        let temp_data_2 = []
        let temp_data_1 = []

        for(var i = 0; i < level_all.length; i += 1) {
          if(level_all[i]['level'] === 4) {
            temp_data_4.push(level_all[i])
          } else if(level_all[i]['level'] === 5 && temp_data_4.length > 0) {
            for(var a = 0; a < temp_data_4.length; a += 1) {
              temp_data_4[temp_data_4.length - 1]['children'].push(level_all[i])
              break;
            }
          } else if(level_all[i]['level'] === 3){
            temp_data_3.push(level_all[i])
            console.log(temp_data_3)
          } else if(level_all[i]['level'] === 5 && temp_data_3.length > 0) {
            for(var a = 0; a < temp_data_3.length; a += 1) {
              temp_data_3[temp_data_3.length - 1]['children'].push(level_all[i])
              break;
            }
          } else if(level_all[i]['level'] === 2){
            temp_data_2.push(level_all[i])
            console.log(temp_data_2)
          } else if(level_all[i]['level'] === 5 && temp_data_2.length > 0) {
            for(var a = 0; a < temp_data_2.length; a += 1) {
              temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
              break;
            }
          } else if(level_all[i]['level'] === 1){
            temp_data_1.push(level_all[i])
            console.log(temp_data_1)
          } else if(level_all[i]['level'] === 5 && temp_data_1.length > 0) {
            for(var a = 0; a < temp_data_1.length; a += 1) {
              temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
              break;
            }
          }
        }
        var i = 0;
        while (i < level_all.length) {
          if (level_all[i]['level'] === 5) {
            level_all.splice(i, 1);
          } else {
            ++i;
          }
        }

        if(temp_data_4.length > 0){
          let temp_data_3 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 3) {
              temp_data_3.push(level_all[i])
            } else if(level_all[i]['level'] === 4) {
              for(var a = 0; a < temp_data_3.length; a += 1) {
                temp_data_3[temp_data_3.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_3.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 4) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_2 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for(var a = 0; a < temp_data_2.length; a += 1) {
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_2.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 3) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_1 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for(var a = 0; a < temp_data_1.length; a += 1) {
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
        }

        if(temp_data_3.length > 0){
          var i = 0;
          while (i < level_all.length) {
            if (level_all[i]['level'] === 4) {
              level_all.splice(i, 1);
            } else {
              ++i;
            }
          }

          let temp_data_2 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for(var a = 0; a < temp_data_2.length; a += 1) {
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_2.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 3) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_1 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for(var a = 0; a < temp_data_1.length; a += 1) {
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
        }

        if(temp_data_2.length > 0){
          var i = 0;
          while (i < level_all.length) {
            if (level_all[i]['level'] === 3) {
              level_all.splice(i, 1);
            } else {
              ++i;
            }
          }
    
          let temp_data_1 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for(var a = 0; a < temp_data_1.length; a += 1) {
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          
    
        }console.log('result:',level_all)
        //level_4 exist
      } else if(level_4_exist === true){
        let temp_data_3 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 3) {
              temp_data_3.push(level_all[i])
            } else if(level_all[i]['level'] === 4) {
              for(var a = 0; a < temp_data_3.length; a += 1) {
                temp_data_3[temp_data_3.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
        
        if(temp_data_3.length > 0){
          var i = 0;
          while (i < level_all.length) {
            if (level_all[i]['level'] === 4) {
              level_all.splice(i, 1);
            } else {
              ++i;
            }
          }

          let temp_data_2 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for(var a = 0; a < temp_data_2.length; a += 1) {
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_2.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 3) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_1 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for(var a = 0; a < temp_data_1.length; a += 1) {
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          
    
        }console.log('result:',level_all)
        //level_3 exist
      } else if(level_3_exist === true){
        let temp_data_2 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for(var a = 0; a < temp_data_2.length; a += 1) {
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
        
        if(temp_data_2.length > 0){
          var i = 0;
          while (i < level_all.length) {
            if (level_all[i]['level'] === 3) {
              level_all.splice(i, 1);
            } else {
              ++i;
            }
          }
    
          let temp_data_1 = []
          for(var i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for(var a = 0; a < temp_data_1.length; a += 1) {
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          
    
        }console.log('result:',level_all)
        //level_2 exist
      } else if(level_2_exist === true){

        let temp_data_1 = []
        for(var i = 0; i < level_all.length; i += 1) {
          if(level_all[i]['level'] === 1) {
            temp_data_1.push(level_all[i])
          } else if(level_all[i]['level'] === 2) {
            for(var a = 0; a < temp_data_1.length; a += 1) {
              temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
              break;
            }
          } 
        }

        if(temp_data_1.length > 0){
            var i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          
          console.log('result:',level_all)
    
        }
      }
    }

    
    

    if(level_all.length > 0){
      var treeData = level_all
    }
    
    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };
    return (
        <Tabs defaultActiveKey={this.state.order_key} className="left_drawer" onChange={this.handleChange} type="card" size='small' tabPosition={mode} >
          <TabPane tab={toggle} key="none">
          </TabPane>
          <TabPane className="left_drawer_mokcha" tab="목차" key="목차">
            <div><Button onClick={this.showModal} size="small">목차편집</Button> </div>
            <ContentsTable tableDeleteHandler={this.props.tableDeleteHandler} tableOrderlHandler={this.props.tableOrderlHandler} tableLevelHandler={this.props.tableLevelHandler} changeTableNameHandler={this.props.changeTableNameHandler}  addTable={this.props.addTable} table_of_contents={this.props.table_of_contents} handleOk={this.handleOk} showModal={this.showModal} handleCancel={this.handleCancel} visible={this.state.visible}/>
            <div className="table_of_contents_container">
              <Tree
                showLine={true}
                showIcon={true}
                defaultExpandAll={true}
                onSelect={onSelect}
                treeData={treeData}
              />
            </div>
          </TabPane>
        </Tabs>
    );
  }
}



export default LeftDrawer