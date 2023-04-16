// 请求模板
import { message } from 'antd'; // 请求结果全局提示
import { history } from 'umi'; // 路由跳转
const qs = require('querystring');
import {request } from 'umi';

// request的响应拦截器
const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    if (response.data.code !== 0) { // 返回的不是我们需要的数据
      const res = JSON.parse(response.data)
      message.error(`错误${res.code}，${res.msg}`);
      history.push('/users/login');
      sessionStorage.clear();
    } else {
      const token = response.headers.authorization;
      token && sessionStorage.setItem('token', token);
      return response.data;
    }
  } else if (response.code === 0) {
    return response; // 修改员工详情信息时有时候请求返回的直接是数据而不是response对象？？？
  } else {
    throw new Error(response.data.msg);
  }
}

class Http {
  static async staticFetch(url = '', options = {}) {
    // 对url进行处理
    url = '/api' + url;
    const defaultOptions = {
      mode: 'cors', // 跨域请求
      getResponse: true, // 获取axios完整的response结构
      headers: {
        Authorization: sessionStorage.getItem('token') || null,
      },
      responseInterceptors: [handleResponse] // 为request添加相应阶段的拦截器
    }
    // 对options进行处理
    if (options.method === 'POST' || options.method === 'PUT') {
      defaultOptions.headers['Content-Type'] = 'application/json;charset=utf-8';
    }
    options = { ...defaultOptions, ...options };

    return request(url, options)
    // .then(checkStatus) // 根据响应状态码判断请求是否发送成功（连接）
    // .then(judgeOkStatus) // 根据返回数据的code属性判断是否是我们需要的数据（如不正确时，会返回其他数据如提示参数错误等、没有token等）
    .then((res) => { // 拿到我们需要的数据(JSON格式)
      return res;
    })
    .catch(handleError);
  }

  get(url='', params={}, options={}) {
    url=url+'?'+qs.stringify(params);
    options.method = options.method || 'GET';
    return Http.staticFetch(url, options);
  }
  post(url='', params={}, options={}) {
    options.method = options.method || 'POST';
    options.data = JSON.stringify(params);
    return Http.staticFetch(url, options);
  }
  put(url='', params={}, options={}) {
    options.method = options.method || 'PUT';
    options.data = JSON.stringify(params);
    return Http.staticFetch(url, options);
  }
  del(url='', params={}, options={}) {
    url=url+'?'+qs.stringify(params);
    options.method = options.method || 'DELETE';
    return Http.staticFetch(url, options);
  }
}

// const checkStatus = (res) => {
//   console.log('checkStatus', res)
//   if (res.status >= 200 && res.status < 300) {
//     return res;
//   }
//   throw new Error(res.statusText);
// };

// const judgeOkStatus = (res) => {
//   console.log('judgeOkStatus', res)
//   const cloneRes = res.clone().json();
//   if (res.code !== 0) { // 返回的不是我们需要的数据
//     message.error(`错误${cloneRes.code}，${cloneRes.msg}`);
//     history.push('/users/login');
//     sessionStorage.clear();
//   }
//   return res;
// };

const handleError = (err) => {
  console.log(err)
  if (typeof err === 'error') {
    message.error(`错误${err}`);
    return {
      code: -1,
      data: false,
      msg: err
    }
  }
};

const http = new Http();

export default http;