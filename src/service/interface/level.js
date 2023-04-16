import ajax from '../http';

export const getLevelList = (params) => {
  return ajax.post('/getLevel', params)
}

export const getLevelDetail = (id) => {
  return ajax.get(`/getLevelDetail/${id}`)
}

export const addLevel = (params) => {
  return ajax.post('createLevel', params)
}

export const updateLevel = (id, params) => {
  return ajax.put(`/updateLevel/${id}`, params)
}

export const deleteLevel = (id) => {
  return ajax.del(`/destroyLevel/${id}`)
}