import $http from 'api';

export default {
  namespace: 'level',
  state: {
    levelList: null,
    levelTotal: null,
    levelDetail: null,
  },
  reducers: {
    setLevelList(state, { payload }) {
      return { ...state, ...payload }
    },
    setLevelDetail(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *getLevelData({ payload }, { put, call }) {
      const { data, code } = yield call($http.getLevelList, payload);
      if (code) return;
      yield put({ type: 'setLevelList', payload: { levelList: data.list, levelTotal: data.total } });
    },
    *getLevelDetailData({ payload }, { put, call }) {
      const { data, code } = yield call($http.getLevelDetail, payload._id);
      if (code) return;
      yield put({ type: 'setLevelDetail', payload: { levelDetail: data } });
      yield put({ type: 'auth/setIsShowDrawer', payload: { isShowDrawer: true }});
    },
  }
}