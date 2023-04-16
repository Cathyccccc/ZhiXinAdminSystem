import React from 'react';
import iconMap from '../iconMap';
import './index.less';
import logo from 'assets/logo.png';
import { Dropdown, Menu, Avatar, Image } from 'antd';
import {useSelector} from 'umi';

const menu = (
  <Menu
    items={[
      {
        label: (
          <a rel="noopener noreferrer" href="/users/login">
            <span className='exit-icon'>{iconMap.signOut}</span>
            <span className='exit'>退出</span>
          </a>
        ),
        key: '0',
      },
      {
        type: 'divider',
      },
      {
        label: '3rd menu item',
        key: '3',
        disabled: true,
      },
    ]}
  />
);

export default function index({Header, collapse, changeCollapseStatus}) {
  const {userInfo} = useSelector(state => state.users)
  return (
    <Header>
      <div className={collapse ? 'collapse brand' : 'brand'}>
        <div className="logo">
          <img src={logo}/>
          {!collapse && <h1>渡一教育</h1>}
        </div>
      </div>
      <div className='collapse-icon' onClick={changeCollapseStatus}>
        {collapse ? iconMap.unFoldIcon : iconMap.foldIcon}
      </div>
      <Dropdown overlay={menu}>
        <a onClick={e => e.preventDefault()}> {/**为什么这里直接点击退出后sessionStorage就被清空了 */}
          <span>{userInfo.accountName}</span>
          <Avatar 
            // src={
            //   <Image
            //     src={userInfo.avatar}
            //     style={{
            //       width: 32,
            //     }}
            //   />
            // }
            style={{
              backgroundColor: '#1890FF',
              marginLeft: '10px'
            }}
          >
            {iconMap.userIcon}
          </Avatar>
        </a>
      </Dropdown>
    </Header>
  )
}
