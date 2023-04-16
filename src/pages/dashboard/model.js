import $http from 'api';

export default {
  namespace: 'dashboard',
  state: {
    amountDataList: [],
    staffData: {},
    pieList: [],
    columnList: [],
    constellationData: {}
  },
  reducers: {
    setAnalyzeStaffData(state, { payload }) {
      const { data } = payload
      const filterData = {
        amountDataList: [
          {
            title: '总人数',
            amount: data.total,
            styleData: { width: '100%', height: '170px' }
          },
          {
            title: '入职1年内员工',
            amount: data.onboardingTimeData.one,
            styleData: { width: '33%', height: '170px' }
          },
          {
            title: '入职1-2年员工',
            amount: data.onboardingTimeData.two,
            styleData: { width: '33%', height: '170px' }
          },
          {
            title: '入职3年以上员工',
            amount: data.onboardingTimeData.three,
            styleData: { width: '33%', height: '170px' }
          }
        ],
        pieList: [
          {
            title: '学历情况',
            renderList: data.educationList,
            styleData: { width: '49.8%', height: '350px' }
          },
          {
            title: '员工性别占比',
            renderList: data.genderList,
            styleData: { width: '49.8%', height: '350px' },
            isLegend: true
          },
          {
            title: '员工婚姻状况',
            renderList: data.marriageList,
            styleData: { width: '49.8%', height: '350px' },
            isCircle: true
          }
        ],
        columnList: [
          {
            title: '员工年龄段',
            renderList: data.ageMap,
            styleData: { width: '49.8%', height: '350px' },
          },
          {
            title: '部门员工数量',
            renderList: data.departmentList,
            styleData: { width: '49.8%', height: '350px' },
          }
        ],
        staffData: {
          title: '工龄最老的10个人',
          renderList: data.wordingYearsMaps,
          styleData: { width: '49.8%', height: '350px' }
        },
        constellationData: {
          title: '员工星座分布',
          renderList: data.constellationList,
          styleData: { width: '49.8%', height: '350px' },
          isArea: true
        }
      }
      return { ...state, ...filterData }
    }
  },
  effects: {
    *analyzeStaff({ payload }, { put, call }) {
      const { data } = yield call($http.getAnalyzeStaffData)
      yield put({ type: 'setAnalyzeStaffData', payload: { data } })
    }
  }
}