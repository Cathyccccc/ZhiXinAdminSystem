import React, { useState, useEffect } from 'react';
import {Form, Input} from 'antd';
import {useDispatch, useSelector} from 'umi';

export default function FilterForm({reloadTable}) {
  const [form] = Form.useForm();
  const [queryData, setQueryData] = useState({
    levelName: null,
    levelDescription: null
  });

  const dispatch = useDispatch();
  const {isClearForm} = useSelector(state => state.auth);
  useEffect(() => {
    if (isClearForm) {
      form.resetFields(); // 清空表单
      reloadTable(); // 重新加载表格
      setQueryData({
        levelName: null,
        levelDescription: null
      });
      dispatch({type: 'auth/setIsClearForm', payload: {isClearForm: false}});
    }
  }, [isClearForm]);

  // 字段搜索，过滤表格
  const searchLevel = (name) => {
    const reqData = JSON.parse(JSON.stringify(queryData));
    if (typeof name === 'string') {
      reqData[name] = form.getFieldValue(name);
    }
    setQueryData(reqData);
    filterData(reqData);
  }
  // 去除form表单中没有填写的表单项后，再进行过滤搜索
  const filterData = (reqData) => {
    Object.keys(reqData).forEach((key) => {
      if (!reqData[key]) {
        delete reqData[key];
      }
    })
    reloadTable(reqData);
  }
  return (
    <Form
      form={form}
      layout="vertical"
      style={{width: "220px"}}
    >
      <Form.Item label="名称" name="levelName">
        <Input type="text" placeholder='请输入职级名称' onPressEnter={() => searchLevel('levelName')} />
      </Form.Item>
      <Form.Item label="描述" name="levelDescription">
        <Input type="text" placeholder='请输入职级描述'  onPressEnter={() => searchLevel('levelDescription')} />
      </Form.Item>
    </Form>
  )
}
