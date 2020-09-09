import React from 'react';
import { Form, Input, Button, Space } from 'antd';

const ChangeBookTitle = (props) => {
  const [form] = Form.useForm();

  return (
    <>
      <Form
        layout={'inline'}
        form={form}
        size="small"
        className="change_book_title_input_form"
      >
        <Space>
        <Form.Item >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item className="change_book_title_buttons">
          <Button type="primary" onClick={props.onClick}>완료</Button>
          <Button type="primary" onClick={props.onClick}>취소</Button>
        </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default ChangeBookTitle