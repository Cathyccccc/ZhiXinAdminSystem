import React from 'react';
import {Card, Table} from 'antd';

export default function TableCensus({title, renderList}) {
  // console.log(title, renderList)
  const data = renderList && renderList.map(i => ({key: i._id, ...i}))
  const columnsData = [
    {
      title: '姓名',
      dataIndex: 'staffName',
      render: (value) => value?.username
    },
    {
      title: '考勤时间',
      dataIndex: 'createTime',
    },
    {
      title: '考勤类型',
      dataIndex: 'attendanceType',
    },
    {
      title: '部门',
      dataIndex: 'staffName',
      render: (value) => value?.department.departmentName || '暂未分配部门'
    }
  ]
  return (
    <Card hoverable size="small">
      <div className='table-title'>{title}</div>
      <Table columns={columnsData} dataSource={data} rowKey={(record) => record._id} pagination={false} />
    </Card>
  )
}
