import ajax from '../http';

// 获取员工列表
export const getStaff = (params) => {
  return ajax.post('/getStaff', params)
}

// 获取员工详情
export const getStaffDetail = (params) => {
  return ajax.get(`/staffDetail/${params._id}`)
}

// 新增员工
export const createStaff = (params) => {
  return ajax.post('/createStaff', params)
}

// 修改员工信息
export const updateStaff = (params) => {
  return ajax.put('/updateStaff', params)
}

// 删除员工信息
export const deleteStaff = (params) => {
  return ajax.post('/destroyStaff', params)
}