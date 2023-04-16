import ajax from '../http.js';

export const userLogin = (params) => {
  return ajax.post('/login', params)
};

export const getCaptcha = (params) => {
  return ajax.get('/getCode', params)
}

export const resetPassword = (params) => {
  return ajax.post('/resetPassword', params)
}

export const checkCode = (params) => {
  return ajax.get('/checkSmCode', params)
}

export const getUploadToken = (params) => {
  return ajax.get('/getUploadToken', params)
}

export const deleteFile = (params) => {
  return ajax.post('/deleteFile', params)
}

export const checkLoginStatus = () => {
  return ajax.get('/queryLoginStatus')
}

export const getRouteList = () => {
  return ajax.get('/getRouteList')
}

// 检测手机号码或账户名是否有效
export const checkIsExists = (params) => {
  return ajax.post('/checkIsExists', params)
}