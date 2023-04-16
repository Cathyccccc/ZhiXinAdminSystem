import React from 'react';
import { Form, Input, Row, Col, message, Button } from 'antd';
import levelDetailForm from 'static/levelDetail';
import {levelRule} from 'utils/rules/levelRules';
import $http from 'api';

export default function AddForm({loadTable, setIsModalOpen}) {
  const [form] = Form.useForm();
  const submitForm = async (values) => {
    // 需要做表单验证
    // 输入职级后自动填充分数
    // 判断该职级是否已经存在？？？
    console.log(values)
    try {
      const {msg} = await $http.createLevel(values);
    } catch (error) {
      message.error('添加失败')
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={submitForm}
    >
      {levelDetailForm.map((arr) => (
        <Row justify='space-between'>
          {arr.map((item) => (
            <Col span={11}>
              <Form.Item label={item.labelTxt} name={item.itemName} rules={levelRule[item.itemName]}>
                <Input placeholder={item.placeholderVal} />
              </Form.Item>
            </Col>
          ))}
        </Row>
      ))}
      <Col span={24} offset={11}>
        <Form.Item>
          <Button type="primary" htmlType='submit'>创建</Button>
        </Form.Item>
      </Col>
    </Form>
  )
}
