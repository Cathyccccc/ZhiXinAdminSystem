import React from 'react'
import { Outlet } from 'umi';
import pic from 'assets/logo.svg';
import './users.less'

export default function Users() {
  {/* 这里的布局将会在/users开头的路径中出现 */}
  {/* 登录布局 */}
  return (
    <div className='form'>
      <div className='logo'>
        <img src={pic} />
        <span>智信人事管理系统</span>
      </div>
      <Outlet /> {/* children */}
    </div>
  )
}
