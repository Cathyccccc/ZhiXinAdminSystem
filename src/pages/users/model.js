import $http from 'api/index.js';
import { message } from 'antd';
import {history} from 'umi';

export default {
  namespace: 'users', // 命名空间
  state: {
    userInfo: sessionStorage.getItem('userProfile') ? JSON.parse(sessionStorage.getItem('userProfile')) : null,
  },
  reducers: {
    // 同步action，修改state
    setUserInfo(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    // 异步action，发送异步请求
    *login({ payload }, { put, call, select }) {
      const { data, msg } = yield call($http.userLogin, payload);
      if (!data) {
        message.error(msg);
        return
      }
      sessionStorage.setItem('userProfile', JSON.stringify(data));
      const {data:routeList} = yield call($http.getRouteList);
      sessionStorage.setItem('routeList', JSON.stringify(routeList));
      yield put({ type: 'setUserInfo', payload: { userInfo: data } });
      history.push(routeList[0].route); // 登录成功，跳转到主界面
    },
  }
}