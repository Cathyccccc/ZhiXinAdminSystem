import React from 'react';
import { Outlet, history, useDispatch, useSelector } from 'umi';
import {Layout, Menu} from 'antd';
const { Header, Content, Sider } = Layout;
import './default.less';
import iconMap from 'components/iconMap';
import NotFound from '../pages/notFound';
import HeaderMenu from 'components/HeaderMenu';

export default function Default() {
  const dispatch = useDispatch();
  const {collapse} = useSelector(state => state.auth)

  const {location} = history;
  const routeList = JSON.parse(sessionStorage.getItem('routeList'));
  const getItem = routeList.map((item) => {
    return {
      icon: iconMap[item.icon],
      label: item.zhName,
      key: item._id
    }
  })
  const changeRoute = ({key}) => {
    history.push(routeList.filter(item => item._id === key)[0].route)
  }

  // 判断登录用户在地址栏中输入路径时，是否包含在routeList中。进行一个首页跳转 / 404页面的处理
  const isCorrectRoute = () => {
    if (location.pathname === '/') {
      // 跳转到首页第一个页面
      history.replace(routeList[0].route);
      return true;
    }
    // 匹配：正常跳转显示；不匹配：显示404
    return routeList.some(i => i.route === location.pathname);
  }

  const changeCollapseStatus = () => {
    dispatch({type: 'auth/changeCollapse', payload: {collapse: !collapse}})
  }

  return (
    <Layout className='default-container'>
      <HeaderMenu Header={Header} collapse={collapse} changeCollapseStatus={changeCollapseStatus}>
      </HeaderMenu>
      <Layout>
        <Sider collapsed={collapse} width={200} theme="light" className="side-bar">
          <Menu
            defaultSelectedKeys={[isCorrectRoute() ? routeList.filter(item => item.route === location.pathname)[0]._id : '']} // 控制显示第一界面还是404
            items={getItem}
            onClick={changeRoute}
          >
          </Menu>
        </Sider>
        <Layout style={{overflowY:'scroll'}}>
          <Content>
            { isCorrectRoute() ? <Outlet /> : <NotFound /> } {/* children */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
