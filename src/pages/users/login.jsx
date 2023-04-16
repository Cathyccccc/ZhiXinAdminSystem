import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import CaptchaForm from './components/CaptchaForm';
import PasswordForm from './components/PasswordForm';
import iconMap from 'components/iconMap';
import './css/login.less';
import { history, useDispatch, useSelector } from 'umi';

const FormItem = Form.Item;

export default function Login() {
  const [type, setType] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading); // 框架会默认添加一个命名空间为 loading 的 model，该 model 包含 effects 异步加载 loading 的相关信息
  // console.log(loading)     { effects: {}, global: false, models: {} }
  const [form] = Form.useForm();
  const componentSelector = (props) => !type ? <PasswordForm {...props} /> : <CaptchaForm {...props} />
  const onFinish = (values) => {
    // console.log(values, type)
    dispatch({type: 'users/login', payload: {...values, type}})
  }
  const switchLoginType = (type) => {
    setType(type ? 0 : 1);
  }
  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        { componentSelector({FormItem, Input, Button, form}) }
        <FormItem>
          <Button type="primary" block htmlType='submit' loading={loading.effects['users/login']}>登录</Button>
        </FormItem>
      </Form>
      <div className='bottom-text'>
        <span onClick={() => history.push('/users/forgetPassword')}>忘记密码？</span>
        <span className='align-right' onClick={() => switchLoginType(type)}>
          {!type ? '验证码登录' : '账号密码登录'} {iconMap.arrowRightOutlined}
        </span>
      </div>
    </>
  )
}
