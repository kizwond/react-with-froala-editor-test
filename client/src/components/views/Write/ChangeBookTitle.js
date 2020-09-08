import React from 'react';
import { Form, Input, Button } from 'antd';

const ChangeBookTitle = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Form
        layout={'inline'}
        form={form}
        size="small"
      >
        <Form.Item >
          <Input placeholder="..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary">완료</Button>
          <Button type="primary">취소</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangeBookTitle