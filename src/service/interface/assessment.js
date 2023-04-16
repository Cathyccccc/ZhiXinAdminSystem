import ajax from '../http.js';

export const getAssessmentList = (params) => {
  return ajax.post('/getAssessmentList', params)
}
