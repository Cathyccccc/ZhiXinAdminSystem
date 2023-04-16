import React, {useState} from 'react';
import { Table, message } from 'antd';
import { EditableCell, EditableRow } from 'components/Editable';
import Columns from './Columns';
import {useSelector, useDispatch} from 'umi';
import Dialog from 'components/Dialog';
import RecordTable from './RecordTable';
import $http from 'api';

export default function TableList({data, loading, reloadTable}) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const {userInfo} = useSelector(state => state.users)
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const handleSave = async (params) => {
    if (params.type == 'mobile') {
      const checkData = {
        mobile: params.updateVal
      }
      const {data, msg} = await $http.checkIsExists({checkData});
      if (data) {
        message.error(msg);
        return
      }
    }
    // 请求接口，修改当前员工信息
    const {data, msg} = await $http.updateStaff(params);
    if (!data) message.success(msg);
    // 重新获取所有员工数据，渲染表格
    reloadTable();
  };
  // 打开绩效考核/调薪记录/奖惩记录表格
  const openRecordDialog = (data) => {
    setIsModalOpen(true);
    setCurrentRecord(data);
  }
  // 打开员工详情侧边栏
  const showStaffDetail = (_id) => {
    dispatch({type: 'staff/getStaffDetailData', payload: {_id}})
  }
  return (
    <>
      <Table
        components={components}
        columns={Columns({userInfo, handleSave, openRecordDialog, showStaffDetail})}
        dataSource={data}
        rowKey={record => record._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            dispatch({type: 'auth/setSelectedIds', payload: {ids: selectedRowKeys}});
          }
        }}
        scroll={{
          x: '2400px'
        }}
        loading={loading.effects['staff/getStaffData']}
        pagination={false}
        bordered
        style={{
          background: '#fff',
        }}
        size="small"
      />
      <Dialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={currentRecord.title}
        render={() => <RecordTable {...currentRecord} />}
      />
    </>
  )
}
