import $http from 'api';

export default {
  namespace: 'staff',
  state: {
    staffList: [], // 所有员工信息
    staffTotal: null, // 员工总数
    staffDetail: null, // 某个员工的详细信息
  },
  reducers: {
    initStaffList(state, {payload}) {
      return {...state, ...payload.data};
    },
    setStaffDetail(state, {payload}) {
      return {...state, ...payload}
    }
  },
  effects: {
    *getStaffData({payload}, {put, call}) {
      const {code, data} = yield call($http.getStaff, payload);
      if (code) return;
      yield put({type: 'initStaffList', payload: {data}});
    },
    *getStaffDetailData({payload}, {put, call}) {
      const res = yield call($http.getStaffDetail, payload);
      // console.log(res)
      if (res.code) return;
      yield put({type: 'setStaffDetail', payload: {staffDetail: res.data}});
      yield put({type: 'auth/setIsShowDrawer', payload: {isShowDrawer:true}});
    },
  }
}