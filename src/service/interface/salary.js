import ajax from '../http';

export const getSalaryAdjustment = (params) => {
  return ajax.get('/salaryAdjustment', params)
}
