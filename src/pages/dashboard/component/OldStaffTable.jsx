import React from 'react';
import { Card, Table } from 'antd';

const {Column} = Table;

export default function OldStaffTable({title, renderList, styleData}) {
  // console.log(title, renderList, styleData)
  const columnsData = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (text) => <span style={{color: '#C63300'}}>{text}</span>
    }
  ]
  const data = renderList && renderList.map((item, index) => {

    return {
      key: index,
      department: item.department || '未绑定部门',
      userName: item.userName
    }
  }); // 一定要renderList有值再使用map，直接使用会报错。第一次得到的数据为undefind
  return (
    <Card
      size="small"
      hoverable
      style={styleData}
    >
      <div size="small" className='card-title'>{title}</div>
      <Table columns={columnsData} dataSource={data} pagination={false}/>
    </Card>
  )
}
