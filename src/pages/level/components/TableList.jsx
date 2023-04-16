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
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const handleSave = async (params) => {
    const {code, msg} = $http.updateLevel(params._id, params)
    if (code) return;
    message.success(msg || '修改成功');
    reloadTable();
  }
  // 打开职级详情侧边栏
  const showLevelDetail = (_id) => {
    dispatch({type: 'level/getLevelDetailData', payload: {_id}})
  }
  return (
    <>
      <Table
        components={components}
        columns={Columns({handleSave, showLevelDetail})}
        dataSource={data}
        rowKey={record => record._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            dispatch({type: 'auth/setSelectedIds', payload: {ids: selectedRowKeys}});
          }
        }}
        scroll={{
          x: '1000px'
        }}
        loading={loading.effects['level/getLevelData']}
        pagination={false}
        bordered
        style={{
          background: '#fff',
        }}
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
