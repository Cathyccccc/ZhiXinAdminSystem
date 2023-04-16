import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import RecordColumns from './RecordColumns';
import $http from 'api';

export default function RecordTable({apiName, type, params, page=1}) {
  const [source, setSource] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    initTableData();
  }, [])
  const initTableData = async () => {
    const res = await $http[apiName](params, page);
    setSource(res.data.list);
    setTotal(res.total)
  }
  return (
    <Table
      dataSource={source}
      columns={RecordColumns[type]}
      rowKey={(record) => record._id}
      pagination={{current: page, pageSize: 5, total}}
    />
  )
}
