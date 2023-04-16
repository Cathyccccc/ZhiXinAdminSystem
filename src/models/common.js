import $http from 'api';
import { message } from 'antd';

export default {
  namespace: 'auth',
  state: {
    collapse: false,
    isShowDrawer: false,
    isClearForm: false,
    ids: []
  },
  subscriptions: {
    setup({ dispatch, history }) { // ???这个setup是怎么回事，自动执行了
      dispatch({ type: 'checkUserLogin', payload: { history } })
    }
  },
  reducers: {
    changeCollapse(state, {payload}) {
      return {...state, ...payload}
    },
    setIsShowDrawer(state, {payload}) {
      return {...state, ...payload}
    },
    setIsClearForm(state, {payload}) {
      return {...state, ...payload}
    },
    setSelectedIds(state, {payload}) {
      return {...state, ...payload}
    },
  },
  effects: {
    *checkUserLogin({ payload }, { put, call, select }) {
      const { pathname } = payload.history.location;
      if (!pathname.includes('/users')) {
        // 不是 /users开头的路由，需要判断用户是否登录
        if (!sessionStorage.getItem('token') || !sessionStorage.getItem('userProfile') || !sessionStorage.getItem('routeList')) {
          // 这三样中有一个没有，就要重新登录，请求获取相应的内容
          payload.history.replace('/users/login');
        } else {
          // 检测用户是否登录（token是否过期，或者是否切换登录身份）
          const { code, msg } = yield call($http.checkLoginStatus);
          if (code !== 0) {
            message.error(msg);
          } else {
            // 手动刷新页面等非登录进入网页
            const { data: routeList } = yield call($http.getRouteList);
            sessionStorage.setItem('routeList', JSON.stringify(routeList));
          }
        }
      } else {
        sessionStorage.clear();
      }
    },
  }
}