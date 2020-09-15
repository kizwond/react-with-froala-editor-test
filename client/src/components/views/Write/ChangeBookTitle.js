import React from 'react';
import { Form, Input, Button, Space } from 'antd';

const ChangeBookTitle = (props) => {
  const [form] = Form.useForm();

  const onFinish = value => {
    console.log(value);
    props.changeBookTitleHandler({value, bookId:props.bookTitle._id})
    props.onClick()
  };
  return (
    <>
      <Form
        layout={'inline'}
        form={form}
        size="small"
        onFinish={onFinish}
        className="change_book_title_input_form"
      >
        <Space>
        <Form.Item name={['newName']} rules={[{ required: true }]} >
          <Input placeholder={props.bookTitle.book_title} />
        </Form.Item>
        <Form.Item className="change_book_title_buttons">
          <Button type="primary" htmlType="submit">완료</Button>
          <Button type="primary" onClick={props.onClick}>취소</Button>
        </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default ChangeBookTitle