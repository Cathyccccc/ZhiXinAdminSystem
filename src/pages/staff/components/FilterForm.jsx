import React, {useEffect, useState} from 'react';
import {Form,Input, Select} from 'antd';
import DropPopover from 'components/DropPopover';
import selectMap from 'components/selectMap';
import {useSelector, useDispatch} from 'umi';

export default function FilterForm({reloadTable}) {
  const [form] = Form.useForm();
  const {isClearForm} = useSelector(state => state.auth);
  const {userInfo: {identity}} = useSelector(state => state.users)
  const [queryData, setQueryData] = useState({
    education: null,
    level: null,
    department: null,
    marriage: null,
    userName: null
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (isClearForm) {
      form.resetFields(); // 清空过滤表单
      reloadTable(); // 重新加载表格
      setQueryData({
        education: null,
        level: null,
        department: null,
        marriage: null,
        userName: null
      });
      dispatch({type: 'auth/setIsClearForm', payload: {isClearForm:false}});
    }
  }, [isClearForm])
  const searchStaff = (type) => {
    const reqData = JSON.parse(JSON.stringify(queryData));
    if (typeof type === 'string') {
      reqData[type] = form.getFieldValue(type);
    } else {
      Object.assign(reqData, type);
    }
    setQueryData(reqData);
    filterData(reqData);
  }
  const filterData = (queryData) => {
    Object.keys(queryData).forEach((key) => {
      if (!queryData[key]) {
        delete queryData[key];
      }
    })
    reloadTable(queryData);
  }
  return (
    <Form form={form} layout="vertical" style={{width: "220px"}}>
      <Form.Item label="姓名" name="userName">
        <Input placeholder='请输入要搜索的员工姓名' onChange={() => searchStaff('userName')} />
      </Form.Item>
      <Form.Item label="部门" name="department">
        <Input
          placeholder='请输入部门'
          addonAfter={<DropPopover
            searchType="departmentName"
            interfaceName="getDepartmentList"
            placeholderVal="请选择部门"
            getItem={(value) => {
              form.setFieldsValue({
                department: value['departmentName'],
              })
              searchStaff({department: value._id})
            }}
          />}
        />
      </Form.Item>
      <Form.Item label="职级" name="level">
        <Input
          placeholder='请输入职级'
          addonAfter={<DropPopover
            searchType="levelName"
            interfaceName="getLevelList"
            placeholderVal="请选择职级"
            getItem={(value) => {
              form.setFieldsValue({
                level: value['levelName'],
              })
              searchStaff({level: value._id})
            }}
          />}
        />
      </Form.Item>
      { identity === 1 && (
        <>
          <Form.Item label="婚姻状况" name="marriage">
            <Select placeholder="根据婚姻状况进行搜索" onChange={() => searchStaff('marriage')}>
              {selectMap.marriage.map((item, index) => (<Select.Option key={index} value={index}>{item}</Select.Option>))}
            </Select>
          </Form.Item>
          <Form.Item label="学历" name="education">
            <Select placeholder="根据学历进行搜索" onChange={() => searchStaff('education')}>
              {selectMap.education.map((item, index) => (<Select.Option key={index} value={index+1}>{item}</Select.Option>))}
            </Select>
          </Form.Item>
        </>)
      }
    </Form>
  )
}
