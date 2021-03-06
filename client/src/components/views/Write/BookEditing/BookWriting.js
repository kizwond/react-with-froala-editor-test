import React, { Component } from 'react'
import axios from 'axios'
import LeftDrawer from './BookWritingLeftDrawer'
import './BookWriting.css'
import {Button, Select } from 'antd';
import SettingTabs from './SettingTabs'
import EditorTry from './EditorTry'



import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/plugins.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/languages/ko'
import 'froala-editor//css/themes/gray.min.css'


import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';





const { Option } = Select;
var userId = localStorage.getItem('userId')

export class BookWriting extends Component {
  constructor(props) {
    super(props)
    this.state = {
       bookTitle:'',
       bookId:'',
       category:'',
       userEmail:'',
       user : '',
       table_of_contents:[],
       hide_show_toggle:false,
       left_drawer_toggle:false,
       card_type:[],
       card_add:false,
       editor1: '',
       editor2: '',
       editor3: '',
       editor4: '',
       editor5: '',
       editor6: '',
       editor7: '',
       editor8: '',
       editor9: '',
       editor10: '',
       editor11: '',
       editor12: '',
       editor13: '',
       editor14: '',
       editor15: '',
       contents:[],
       card_selected:'',
       arrayForEditor:[],
       current_card:{}
    }
  }

  componentDidMount() {
    this.setState({
      user: userId
    })
    axios.get('api/create/get-book-title',{params: { userId: userId }})
      .then(res => {
        const bookTitle = res.data.bookTitle.book_title;
        const bookId = res.data.bookTitle._id;
        const category = res.data.bookTitle.category;
        const userEmail = res.data.bookTitle.user_email;
        const contentsTable = res.data.contentsTable
        const cardType = res.data.cardType
        this.setState({ 
          bookTitle:bookTitle, 
          bookId:bookId, 
          category:category,
          userEmail:userEmail,
          table_of_contents:contentsTable,
          card_type:cardType,
        });
      })
  }
  addCardType =(value) => {
    console.log(value)
    axios.post('api/edit/add-card-type',{
      book_id: this.state.bookId,
      card_type: value.card_type,
      card_nick: value.card_nick,
      card_star: value.card_star,
      face_1: value.face_1,
      face_2: value.face_2,
      face_3: value.face_3,
      user_id: userId,
      annotation: value.annotation,
    }).then(res => {
      console.log(res.data)
      this.setState({
        card_type:res.data.cardTypes
      })
    })
  }

  addTable =(value) => {
    console.log(value)
    axios.post('api/edit/add-table',{
      prevTableId : value.prevTableId,
      prevTableLevel : value.prevTableLevel,
      prevTableOrder : value.prevTableOrder,
      userId : userId,
      newTable : value.value.newTable,
    }).then(res => {
      console.log(res.data)
      this.setState({
        table_of_contents:res.data.table_of_contents
      })
    })
  }
  changeTableNameHandler = (value) => {
    console.log(value)
    axios.post('api/edit/change-table-name',{
      tableId : value.tableId,
      userId : userId,
      newName : value.value.newName
    })
    .then(res => {
      console.log(res.data)
      this.setState({
        table_of_contents:res.data.table_of_contents
      })
    })
  }
  tableLevelHandler = (value) => {
    console.log(value)
    axios.post('api/edit/change-table-level',{
      tableId : value.tableId,
      userId : userId,
      action : value.action,
      presentLevel :value.presentLevel
    })
    .then(res => {
      console.log(res.data)
      this.setState({
        table_of_contents:res.data.table_of_contents
      })
    })
  }
  tableOrderlHandler = (value) => {
    console.log(value)
    axios.post('api/edit/change-table-order',{
      tableId : value.tableId,
      bookId: value.bookId,
      userId : userId,
      action : value.action,
      presentOrder :value.presentOrder
    })
    .then(res => {
      console.log(res.data)
      this.setState({
        table_of_contents:res.data.table_of_contents
      })
    })
  }
  tableDeleteHandler = (value) => {
    axios.post('api/edit/delete-table',{
      tableId : value.tableId,
      bookId: value.bookId,
      userId : userId,
    }).then(res => {
      console.log(res.data)
      this.setState({
        table_of_contents:res.data.table_of_contents
      })
    })
  }
  handleClick = (key) => {
    if(key === '1' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '2' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '3' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '4' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '0' ){
      this.setState({
        hide_show_toggle : false
      })
    }
  }
  leftDrawerHandleClick = (key) => {
    if(key === 'none' ){
      this.setState({
        left_drawer_toggle : false
      })
    } else if(key === '목차' ){
      this.setState({
        left_drawer_toggle : true
      })
    }
  }
  selectCardTypeHandler = (key) => {
    console.log(key)
    if(key === '카드선택') {
      this.setState({
        card_selected: 'none'
      })
    } else {
      this.setState({
        card_selected: key
      })
    }
  }
  addCardHandler = () => {
    console.log(this.state.card_selected)
    const contentsList = this.state.card_type.map((content)=>{
          if(content.card_nick === this.state.card_selected){
              const cardType = content.card_type
              console.log(cardType)
              if (cardType === '1면') {
                  const faceLength_1 = content.face_1
                  const face_array = []
                  for (var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  console.log(face_array)
                  this.setState({
                    current_card: {'1':faceLength_1},
                  })
                  return face_array
              } else if (cardType === '2면') {
                  const faceLength_1 = content.face_1
                  const faceLength_2 = content.face_2
                  const face_array = []
                  for (var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for (var i = 1; i < faceLength_2+1; i++) {
                    face_array.push('2면'+i+'행')
                  }
                  console.log(face_array)
                  this.setState({
                    current_card: {1:faceLength_1,2:faceLength_2},
                  })
                  return face_array
              } else if (cardType === '3면') {
                  const faceLength_1 = content.face_1
                  const faceLength_2 = content.face_2
                  const faceLength_3 = content.face_3
                  const face_array = []
                  for (var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for (var i = 1; i < faceLength_2+1; i++) {
                    face_array.push('2면'+i+'행')
                  }
                  for (var i = 1; i < faceLength_3+1; i++) {
                    face_array.push('3면'+i+'행')
                  }
                  console.log(face_array)
                  return face_array
            }
          }
      }
    )
    var filtered = contentsList.filter(function(x) {
      return x !== undefined;
    });
    const finalArray = filtered[0]
    console.log(finalArray)
      this.setState({
        card_add: true,
        arrayForEditor:finalArray
      })
  }
  handleSubmit = () => {
    axios.post('api/create/add-contents', {
      editor1: this.state.editor1,
      editor2: this.state.editor2,
      editor3: this.state.editor3,
      editor4: this.state.editor4,
      editor5: this.state.editor5,
      editor6: this.state.editor6,
      editor7: this.state.editor7,
      editor8: this.state.editor8,
      editor9: this.state.editor9,
      editor10: this.state.editor10,
      editor11: this.state.editor11,
      editor12: this.state.editor12,
      editor13: this.state.editor13,
      editor14: this.state.editor14,
      editor15: this.state.editor15,
      userId: userId,
      bookTitle: this.state.bookTitle,
      userEmail: this.state.userEmail,
      category: this.state.category,
    })
    .then(res => {
      console.log(res.data)
      this.setState({
        contents:res.data.contents,
        editor1: '',
        editor2: '',
        editor3: '',
        editor4: '',
        editor5: '',
        editor6: '',
        editor7: '',
        editor8: '',
        editor9: '',
        editor10: '',
        editor11: '',
        editor12: '',
        editor13: '',
        editor14: '',
        editor15: '',
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({card_add:false})
  }

  handleModelChangeEditor1 = (model) => {
    console.log(model)
    this.setState({
      editor1: model
    })
  }
  handleModelChangeEditor2 = (model) => {
    console.log(model)
    this.setState({
      editor2: model
    })
  }
  handleModelChangeEditor3 = (model) => {
    console.log(model)
    this.setState({
      editor3: model
    })
  }
  handleModelChangeEditor4 = (model) => {
    console.log(model)
    this.setState({
      editor4: model
    })
  }

  handleModelChangeEditor5 = (model) => {
    console.log(model)
    this.setState({
      editor5: model
    })
  }

  handleModelChangeEditor6 = (model) => {
    console.log(model)
    this.setState({
      editor6: model
    })
  }

  handleModelChangeEditor7 = (model) => {
    console.log(model)
    this.setState({
      editor7: model
    })
  }

  handleModelChangeEditor8 = (model) => {
    console.log(model)
    this.setState({
      editor8: model
    })
  }

  handleModelChangeEditor9 = (model) => {
    console.log(model)
    this.setState({
      editor9: model
    })
  }

  handleModelChangeEditor10 = (model) => {
    console.log(model)
    this.setState({
      editor10: model
    })
  }

  handleModelChangeEditor11 = (model) => {
    console.log(model)
    this.setState({
      editor11: model
    })
  }

  handleModelChangeEditor12 = (model) => {
    console.log(model)
    this.setState({
      editor12: model
    })
  }

  handleModelChangeEditor13 = (model) => {
    console.log(model)
    this.setState({
      editor13: model
    })
  }

  handleModelChangeEditor14 = (model) => {
    console.log(model)
    this.setState({
      editor14: model
    })
  }

  handleModelChangeEditor15 = (model) => {
    console.log(model)
    this.setState({
      editor15: model
    })
  }




  render() {
    if (this.state.hide_show_toggle === false){
      var toggle = '-308px' 
      var main = '0px'
    } else {
      var toggle = '0px' 
      var main = '-308px'
    }
    if (this.state.left_drawer_toggle === false){
      var toggleLeft = '-31px' 
    } else {
      var toggleLeft = '0px' 
    }
    if(this.state.current_card){
      console.log(this.state.current_card)
    }
    if(this.state.contents){
      console.log(this.state.contents)
      var contentsList = this.state.contents.map((content)=>(
        <>
          <div><FroalaEditorView model={content.editor1}/></div>
          <div><FroalaEditorView model={content.editor2}/></div>
          <div><FroalaEditorView model={content.editor3}/></div>
          <div><FroalaEditorView model={content.editor4}/></div>
          <div><FroalaEditorView model={content.editor5}/></div>
          <div><FroalaEditorView model={content.editor6}/></div>
          <div><FroalaEditorView model={content.editor7}/></div>
          <div><FroalaEditorView model={content.editor8}/></div>
          <div><FroalaEditorView model={content.editor9}/></div>
          <div><FroalaEditorView model={content.editor10}/></div>
          <div><FroalaEditorView model={content.editor11}/></div>
          <div><FroalaEditorView model={content.editor12}/></div>
          <div><FroalaEditorView model={content.editor13}/></div>
          <div><FroalaEditorView model={content.editor14}/></div>
          <div><FroalaEditorView model={content.editor15}/></div>
        </>
      ))
    }
    if(this.state.card_type){
      var optionList = this.state.card_type.map((card_type)=>(
          <Option value={card_type.card_nick}>{card_type.card_nick}</Option>
      ))
    }
    
    return (
      <>
      <div className="book_writing_container">
        <div className="left_side_container" style={{marginLeft:toggleLeft}}>
        <LeftDrawer addTable={this.addTable} tableDeleteHandler={this.tableDeleteHandler} tableOrderlHandler={this.tableOrderlHandler} tableLevelHandler={this.tableLevelHandler} changeTableNameHandler={this.changeTableNameHandler} table_of_contents={this.state.table_of_contents} toggle={this.state.left_drawer_toggle} onClick={this.leftDrawerHandleClick}/>
        </div>
        <div className="editor_container" style={{marginRight:main}}>
          <div className="editor_container_templete"></div>
        </div>
        <div className="editor_container_templete_position_absolute">
          <div className="editor_top_menu">
            <div>
              <Button size='small'>카드 이동/삭제</Button><span className="book_title">책 제목 : {this.state.bookTitle}</span>
            </div>
            <div>
              <Select size='small' defaultValue={'카드선택'} style={{width:'150px'}} onChange={this.selectCardTypeHandler}>
                <Option value="카드선택">카드선택</Option>
                {optionList}
              </Select>
              <Button size='small' onClick={this.addCardHandler}>카드추가</Button>
            </div>
          </div>
          <div className="editor_panel">
            {contentsList}
            <div id="toolbarContainer"></div>
            
            <div className="a4">
              {this.state.card_add === true ? <EditorTry editor1={this.state.editor1}
                                                         editor2={this.state.editor2}
                                                         editor3={this.state.editor3}
                                                         arrayForEditor={this.state.arrayForEditor}
                                                         handleSubmit={this.handleSubmit}
                                                         handleModelChangeEditor1={this.handleModelChangeEditor1}
                                                         handleModelChangeEditor2={this.handleModelChangeEditor2}
                                                         handleModelChangeEditor3={this.handleModelChangeEditor3}
                                                         handleModelChangeEditor4={this.handleModelChangeEditor4}
                                                         handleModelChangeEditor5={this.handleModelChangeEditor5}
                                                         handleModelChangeEditor6={this.handleModelChangeEditor6}
                                                         handleModelChangeEditor7={this.handleModelChangeEditor7}
                                                         handleModelChangeEditor8={this.handleModelChangeEditor8}
                                                         handleModelChangeEditor9={this.handleModelChangeEditor9}
                                                         handleModelChangeEditor10={this.handleModelChangeEditor10}
                                                         handleModelChangeEditor11={this.handleModelChangeEditor11}
                                                         handleModelChangeEditor12={this.handleModelChangeEditor12}
                                                         handleModelChangeEditor13={this.handleModelChangeEditor13}
                                                         handleModelChangeEditor14={this.handleModelChangeEditor14}
                                                         handleModelChangeEditor15={this.handleModelChangeEditor15}/> : ''}
            </div>
          </div>
        </div>
        <div className="right_side_container" style={{marginRight:toggle}}>
          <SettingTabs cardType={this.state.card_type} addCardType={this.addCardType} toggle={this.state.hide_show_toggle} onClick={this.handleClick}/>
        </div>
      </div>
      </>
    )
  }
}

export default BookWriting
