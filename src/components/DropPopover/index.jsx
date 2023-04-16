import React, {useState, useEffect} from 'react';
import {Popover, List, Input} from 'antd';
import './index.less';
import $http from 'api';
import commonHook from 'hook/common';

const {Search} = Input;

export default function DropPopover({searchType, interfaceName, placeholderVal, getItem}) {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = commonHook();
  const [visible, setVisible] = useState(false);
  const initDataList = async (queryData = {}) => {
    let reqData = {
      page: page.current,
      size: 5,
      queryData
    };
    if (searchType === 'departmentName') {
      reqData = { ...reqData, ...queryData }
    }
    const {data} = await $http[interfaceName](reqData);
    setList(data.list || data.staffList);
    setTotal(data.total || data.staffTotal);
  }
  useEffect(() => {
    initDataList()
  }, [])
  const onSearch = (value) => {
    console.log(value);
    initDataList({[searchType]:value})
  };
  const content = (
    <List
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item onClick={() => {
          getItem(item); // 选择列表项
          setVisible(false); // popover隐藏
        }}>
          {item[searchType]}
        </List.Item>
      )}
      pagination={{
        onChange: page => {
          setPage(page);
          initDataList();
        },
        pageSize: 5, // 默认5，请求数据也是默认5条
        total,
        current: page.current
      }}
    />
  );
  const title = (
    <Search
      placeholder={placeholderVal}
      onSearch={onSearch}
    />
  );
  
  return (
    <Popover content={content} title={title} trigger="click" open={visible} placement="bottomRight">
      <span className='drop-icon' onClick={() => setVisible(!visible)}>+</span>
    </Popover>
  )
}
