import $http from 'api';
import { message } from 'antd';

export default {
  namespace: 'department',
  state: {
    departmentList: [], // 所有部门信息
    departmentDetail: null, // 某个部门详情
    showDetailModal: false, // 是否展示部门详情弹窗
  },
  reducers: {
    initDepartmentList(state, { payload }) {
      return { ...state, ...payload };
    },
    setDepartmentDetail(state, { payload }) {
      return { ...state, ...payload }
    },
    setShowDetailModal(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 获取部门列表数据
    *getDepartmentData({ payload }, { put, call }) {
      const { code, data } = yield call($http.getDepartmentList, payload);
      if (code) return;
      yield put({ type: 'initDepartmentList', payload: { departmentList: data.list } });
    },
    // 获取某个部门详细数据
    *getDepartmentDetailData({ payload }, { put, call }) {
      const { code, data } = yield call($http.getDepartmentDetail, payload);
      if (code) return;
      yield put({ type: 'setDepartmentDetail', payload: { departmentDetail: data } });
      yield put({ type: 'setShowDetailModal', payload: { showDetailModal: true } }); // 获取到部门详情数据后，再显示部门详情弹窗
    },
    *addDepartment({ payload }, { put, call }) {
      const { code } = yield call($http.addDepartment, payload);
      if (code) return;
      yield put({ type: 'getDepartmentData' })
    },
    *updateDepartment({ payload }, { put, call }) {
      const { code, msg } = yield call($http.updateDepartment, payload.id, payload.params);
      if (code) return;
      message.success(msg);
      yield put({ type: 'getDepartmentData' })
      yield put({ type: 'getDepartmentDetailData', payload: payload.id });
    },
    *deleteDepartment({ payload }, { put, call }) {
      const { code, msg } = yield call($http.deleteDepartment, payload);
      if (code) return;
      message.success(msg);
      yield put({ type: 'getDepartmentData' });
    },
  }
}