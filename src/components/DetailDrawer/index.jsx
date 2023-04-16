import React from 'react';
import { Drawer, Space, message } from 'antd';
import {useSelector, useDispatch} from 'umi';
import iconMap from 'components/iconMap';
import './index.less';
import $http from 'api';

export default function index({title, _id, render, interfaceName, renderList}) {
  const dispatch = useDispatch();
  const {isShowDrawer} = useSelector(state => state.auth);
  const extra = (
    <Space>
      <span className='icon' onClick={() => handleClick()}>{iconMap.deleteIcon}</span>
      |
      <span className='icon' onClick={() => handleClose()}>{iconMap.closeIcon}</span>
    </Space>
  );
  const handleClick = async () => {
    const {msg, code} = await $http[interfaceName]([_id]); // ？？？这里员工详情获取的不对，直接是管理员的，所以实际上删除不了；而且这里删除不成功的状态码也是0，应该为其他的。。。
    dispatch({type: 'auth/setIsShowDrawer', payload: {isShowDrawer: false}});
    if (code) {
      message.error(msg);
    } else {
      message.success(msg);
      renderList(1); // 删除成功后跳转到第一页
    }
  }
  const handleClose = () => {
    dispatch({type: 'auth/setIsShowDrawer', payload: {isShowDrawer: false}});
  }
  return (
    <Drawer title={title} closable={false} extra={extra} open={isShowDrawer} destroyOnClose={true} size="large">
      {render}
    </Drawer>
  )
}
