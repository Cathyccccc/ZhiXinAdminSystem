import React, { useState } from 'react';
import { Form, Descriptions, Input, Button, Row } from 'antd';
import { departmentRule } from 'utils/rules/departmentRules';
import ChildDepartment from '../ChildDepartment';
import DropPopover from 'components/DropPopover';
import './index.less';
import { useDispatch, useSelector } from 'umi';

export default function FormComponent({ status, setIsModalOpen }) {

  const [form] = Form.useForm();
  const [childList, setChildList] = useState([]);
  const dispatch = useDispatch();
  const { departmentDetail } = useSelector(state => state.department);

  // 提交表单（新增部门）
  const addDepartment = (data) => {
    const departmentLeader = form.getFieldValue('departmentLeader')
    delete data.departmentLeaderName;
    const children = form.getFieldValue('children');
    console.log(children);
    dispatch({
      type: 'department/addDepartment', payload: {
        ...data,
        departmentLeader,
        children,
      }
    }); // 这里发请求添加成功了，但实际上并没有添加数据到数据库中，所以页面上显示的还是原来的数据
    setIsModalOpen(false);
  };

  // 判断当前是更新部门详情还是新增部门，对子部门数组进行不同的操作
  const pushOrUpdateList = ({ list, type }) => {
    const childIds = list.map(item => item._id);
    if (type === 'update' || type === 'del') { // 修改部门详情
      const isDelete = type === 'del';
      updateDepartmentDetail({ type: 'children', updateVal: childIds, isDelete });
    } else {
      setChildList(childList);
      form.setFieldValue({ children: childIds });
    }
  }

  // 修改部门详情(type为修改的字段)
  const updateDepartmentDetail = ({ type, updateVal, isDelete = false }) => {
    if (!updateVal) {
      updateVal = form.getFieldValue(type);
      if (updateVal = departmentDetail[type]) return;
    }
    const params = {
      type,
      updateVal,
      isDelete,
    }
    dispatch({ type: 'department/updateDepartment', payload: { id: departmentDetail._id, params } });
  }

  return (
    <div>
      <Form
        initialValues={{
          departmentName: departmentDetail?.departmentName,
          departmentLeaderName: departmentDetail?.departmentLeader?.userName,
          remark: departmentDetail?.remark,
        }}
        form={form}
        onFinish={addDepartment}
      >
        <Descriptions column={1} labelStyle={{ width: '150px' }} bordered>
          <Descriptions.Item label="名称">
            <Form.Item name="departmentName" rules={departmentRule['departmentName']}>
              <Input onBlur={() => {
                status === 'update' && updateDepartmentDetail({ type: 'departmentName' })
              }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="备注">
            <Form.Item name="remark">
              <Input onBlur={() => {
                status === 'update' && updateDepartmentDetail({ type: 'remark' })
              }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="子部门">
            <ChildDepartment childList={departmentDetail?.children || childList} pushOrUpdateList={pushOrUpdateList} />
          </Descriptions.Item>
          <Descriptions.Item label="部门负责人">
            <Form.Item name="departmentLeaderName" rules={departmentRule['departmentLeader']}>
              <Input
                placeholder="请选择部门负责人"
                readOnly
                addonAfter={<DropPopover searchType="userName" interfaceName="getStaff" getItem={(value) => {
                  form.setFieldsValue({
                    // 因为是联表查询，department在users表中实际上是字符串_id(department表)
                    departmentLeaderName: value.userName,
                    departmentLeader: value._id
                  })
                  status === 'update' && updateDepartmentDetail({ type: 'departmentLeader' })
                }} />}
              />
            </Form.Item>
          </Descriptions.Item>
          {status === 'update' && <Descriptions.Item label="部门员工"></Descriptions.Item>}
        </Descriptions>
        {status === 'add' && <Form.Item>
          <Row justify='end'>
            <Button type='primary' htmlType="submit">新增</Button>
          </Row>
        </Form.Item>}
      </Form>
    </div>
  )
}
