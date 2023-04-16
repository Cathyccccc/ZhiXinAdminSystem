import React from 'react';
import { loginRules } from 'utils/rules';

export default function ResetForm(props) {
  const {FormItem, Input, form} = props;
  return (
    <>
      <FormItem name="newPassword" rules={loginRules.passwordRule}>
        <Input type="password" placeholder='请输入新密码' />
      </FormItem>
      <FormItem name="confirmPassword" rules={loginRules.confirmPasswordRule(form)}>
        <Input type="password"  placeholder="请再次确认密码" />
      </FormItem>
    </>
  )
}
