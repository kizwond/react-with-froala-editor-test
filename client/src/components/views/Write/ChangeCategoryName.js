import React from 'react';
import { Form, Input, Button, Space } from 'antd';

const ChangeCategory = (props) => {
  const [form] = Form.useForm();
  const onFinish = value => {
    props.changeCategoryHandler({value, categoryId:props.category._id})
    props.inputAreaVisible()
  };
  const cancel = () => {
    props.inputAreaVisible()
    console.log(props.inputAreaVisible)
    console.log('cancel clicked!!!')
    console.log(props.vi)
  }

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
          <Input placeholder={props.category.category_name} />
        </Form.Item>
        <Form.Item className="change_book_title_buttons">
          <Button type="primary" htmlType="submit">완료</Button>
          <Button type="primary" onClick={cancel}>취소</Button>
        </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default ChangeCategory