import ajax from '../http';

export const getDepartmentList = (params) => {
  return ajax.get('/department', params)
}

export const getDepartmentDetail = (id) => {
  return ajax.get(`/department/${id}`)
}

export const addDepartment = (params) => {
  return ajax.post('/department', params)
}

export const updateDepartment = (id, params) => {
  return ajax.put(`/department/${id}`, params)
}

export const deleteDepartment = (id) => {
  console.log(id)
  return ajax.del(`/department/${id}`)
}