import React from 'react';
import {Form, Input, Select, Row, Col, message, DatePicker} from 'antd';
import staffDetailForm from 'static/staffDetail';
import {useDispatch} from 'umi';
import moment from 'moment';
import $http from 'api';
import { staffRule } from 'utils/rules/staffRules';
import DropPopover from 'components/DropPopover';
import UploadImg from 'components/UploadImg';

const {Option} = Select;

export default function DetailForm({staffDetail, loadTable}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const validateFieldItem = async ({itemName}) => {
    const newVal = form.getFieldValue(itemName);
    const oldVal = staffDetail[itemName];
    console.log(newVal, oldVal)
    if (newVal === oldVal) return false;
    try {
      const result = await form.validateFields([itemName]);
      if (itemName === 'accountName' || itemName === 'mobile') {
        const {data, msg} = await $http.checkIsExists({checkData: result});
        if (data) { // 为true则校验未通过
          form.setFieldValue([itemName], staffDetail[itemName]);
          message.error(msg);
        }
      }
      updateForm(itemName, newVal);
    } catch (error) {
      form.setFieldValue([itemName], staffDetail[itemName]); // 恢复原值
      await form.validateFields([itemName]); // 取消之前的验证报错
    }
  };
  const updateForm = async (itemName, value) => {
    if (itemName === 'education') {
      value = value - 1;
    }
    const {code, msg} = await $http.updateStaff({
      _id: staffDetail._id,
      type: itemName,
      updateVal: value
    })
    if (code) return;
    message.success(msg);
    loadTable();
    dispatch({type: 'staff/getStaffDetailData', payload: {_id: staffDetail._id}})
  }
  const getNewAvatar = (newAvatar) => {
    updateForm('avatar', newAvatar)
  }
  const formItemList = {
    input: (data) => (
      <Input placeholder={data.placeholderVal} disabled={data.itemName === 'password'} onBlur={() => validateFieldItem(data)} />
    ),
    date: (data) => (
      <DatePicker placeholder={data.placeholderVal} style={{width: '100%'}} onChange={() => validateFieldItem(data)} />
    ),
    select: (data) => (
      <Select onChange={() => validateFieldItem(data)}>
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
          validateFieldItem(reqData);
        }} />}
      />
    ),
    upload: (data) => (
      <UploadImg avatar={staffDetail.avatar} getNewAvatar={getNewAvatar} />
    )
  };
  return (
    <Form
      form={form}
      initialValues={{
        ...staffDetail,
        onboardingTime:typeof staffDetail.onboardingTime === 'string' ? moment(staffDetail.onboardingTime) : staffDetail.onboardingTime,
        departmentName: staffDetail.department?.departmentName,
        levelName: staffDetail.level?.levelName,
      }}
      layout="vertical"
    >
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
    </Form>
  )
}
