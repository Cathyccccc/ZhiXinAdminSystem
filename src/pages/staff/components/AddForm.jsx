import React from 'react';
import {Form, Input, Select, Row, Col, message, DatePicker, Button} from 'antd';
import staffDetailForm from 'static/staffDetail';
import { staffRule } from 'utils/rules/staffRules';
import DropPopover from 'components/DropPopover';
import UploadImg from 'components/UploadImg';
import $http from 'api';

const {Option} = Select;

export default function AddForm({loadTable, setIsModalOpen}) {
  const [form] = Form.useForm();
  const validateFields = async ({itemName}) => {
    if (itemName !== 'accountName' && itemName !== 'mobile') return;
    const result = await form.validateFields([itemName]);
    const {data, msg} = await $http.checkIsExists({checkData: result});
    if (data) { // 为true则校验未通过
      form.setFieldValue([itemName], '');
      message.error(msg);
    }
  };
  const formItemList = {
    input: (data) => (
      <Input placeholder={data.placeholderVal} onBlur={() => validateFields(data)} />
    ),
    date: (data) => (
      <DatePicker placeholder={data.placeholderVal} style={{width: '100%'}} onChange={() => validateFields(data)} />
    ),
    select: (data) => (
      <Select onChange={() => validateFields(data)}>
        {data.optionData.map((optionItem, index) => <Option key={index} value={data.itemName==='education'?index+1:index}>{optionItem}</Option>)}
      </Select>
    ),
    popover: (data) => (
      <Input
        placeholder={data.placeholderVal}
        readOnly
        addonAfter={<DropPopover searchType={data.itemName} interfaceName={data.url&&data.url} placeholderVal={data.placeholderVal} getItem={(value) => {
          form.setFieldsValue({
            [data.itemName]: value[data.itemName],
            [data.itemName.split('N')[0]]: value._id // 因为是联表查询，department在users表中实际上是字符串_id(department表)
          })
          const reqData = JSON.parse(JSON.stringify(data));
          reqData.itemName = reqData.itemName.split('N')[0];
          validateFields(reqData);
        }} />}
      />
    ),
    upload: (data) => (
      <UploadImg avatar={data.avatar} getNewAvatar={(newAvatar) => form.setFieldsValue({avatar: newAvatar})}/>
    )
  };
  const submitForm = async (values) => {
    delete values['departmentName'];
    delete values['levelName'];
    try {
      const {msg} = await $http.createStaff(values);
      message.success(msg);
      loadTable();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('添加失败')
    }
  }
  return (
    <Form form={form} layout="vertical" onFinish={submitForm}>
      {staffDetailForm.map((arr, index) => (
        <Row key={index} justify="space-between">
          {arr.map((item, i) => (
            <Col span={11} key={i}>
              <Form.Item style={item.style} label={item.labelTxt} name={item.itemName} rules={staffRule[item.itemName]}>
                {formItemList[item.renderType](item)}
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
