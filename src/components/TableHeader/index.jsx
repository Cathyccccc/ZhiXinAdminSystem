import React from 'react';
import './index.less';
import {Button, message, Pagination, Modal} from 'antd';
import iconMap from '../iconMap';
import {useSelector} from 'umi';
import $http from 'api';

export default function TableHeader({total, size=10, page=1, changePage, openDialog, interfaceDelMethod}) {
  const {collapse, ids} = useSelector(state => state.auth);
  const handleDelete = async () => {
    if (ids.length) {
      Modal.confirm({
        title: '删除员工',
        content: '确认删除当前选中的员工吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const {msg} = await $http[interfaceDelMethod](ids);
          changePage(1);
          message.success(msg);
        }
      });
    } else {
      message.warning('请选择要删除的列表项')
    }
  }
  return (
    <div className={['table-header-container', collapse ? 'big-width' : 'small-width'].join(' ')}>
      <div className='button-list'>
        <Button shape="round" size='small' icon={iconMap.addIcon} onClick={openDialog}>创建</Button>
        <Button shape="round" size='small' icon={iconMap.deleteIcon} danger onClick={handleDelete}>批量删除</Button>
      </div>
      <div className='pagination'>
        <Pagination simple defaultCurrent={page} current={page} pageSize={size} total={total} onChange={changePage} />
        <span className='total-number'>共计 {total} 条记录</span>
      </div>
    </div>
  )
}
