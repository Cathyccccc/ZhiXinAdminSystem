import React from 'react';
import iconMap from 'components/iconMap';
import { loginRules } from 'utils/rules'; 

export default function PasswordForm(props) {
  const {FormItem, Input} = props
  return (
    <>
      <FormItem name="accountName" rules={loginRules.userRule} hasFeedback>
        <Input prefix={iconMap.userIcon} placeholder="请输入用户名" />
      </FormItem>
      <FormItem name="password" rules={loginRules.passwordRule} hasFeedback>
        <Input.Password prefix={iconMap.passwordIcon} placeholder="请输入密码" />
      </FormItem>
    </>
  )
}
