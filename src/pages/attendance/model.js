import $http from 'api';

export default {
  namespace: 'attendance',
  state: {
    tableList: [],
    chartList: []
  },
  reducers: {
    formatData(state, {payload}) {
      const {data} = payload;
      console.log(data)
      const filterData = {
        tableList: [
          {
            title: '迟到详情', renderList: data.lateTable,
          },
          {
            title: '早退详情', renderList: data.earlyTable
          }
        ],
        chartList: [
          {
            title: '迟到员工数量', renderList: data.lateBI,
          },
          {
            title: '早退员工数量', renderList: data.earlyBI
          }
        ]
      }
      return {...state, ...filterData}
    }
  },
  effects: {
    *getAttendanceTable({payload}, {put, call}) {
      const {data, code} = yield call($http.getAttendanceList);
      if (code) return; // 容错处理
      yield put({type: 'formatData', payload: {data}});
    }
  }
}