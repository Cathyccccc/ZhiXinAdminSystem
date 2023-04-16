import React from 'react';
import { Form, Input, Row, Col, message } from 'antd';
import levelDetailForm from 'static/levelDetail';
import $http from 'api';
import {levelRule} from 'utils/rules/levelRules';

export default function DetailForm({levelDetail, loadTable}) {
  const [form] = Form.useForm();
  const handleUpdate = async (itemName) => {
    const newVal = form.getFieldValue(itemName);
    if (newVal === levelDetail[itemName]) return;
    try {
      await form.validateFields([itemName]);
      const params = {
        _id: levelDetail._id,
        type: itemName,
        updateVal: newVal
      }
      const {code, msg} = $http.updateLevel(levelDetail._id, params)
      if (code) return;
      message.success(msg || '修改成功');
      loadTable();
    } catch (error) {
      form.setFieldValue([itemName], levelDetail[itemName]);
      await form.validateFields([itemName]);
    }
  } 
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={levelDetail}
    >
      {levelDetailForm.map((arr, index) => (
        <Row key={index} justify="space-between">
          {arr.map((item) => (
            <Col span={11} key={item.itemName}>
              <Form.Item label={item.labelTxt} name={item.itemName} rules={levelRule[item.itemName]}>
                <Input onBlur={() => handleUpdate(item.itemName)} />
              </Form.Item>
            </Col>
          ))}
        </Row>
      ))}
    </Form>
  )
}
