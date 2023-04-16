import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { history } from 'umi';
import $http from 'api';
import ResetForm from './components/ResetForm';
import CaptchaForm from './components/CaptchaForm';

const FormItem = Form.Item;

export default function ForgetPassword() {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const componentSelector = (props) => (step == 1 ? <CaptchaForm {...props} /> : <ResetForm {...props} />);
  const onFinish = async (values) => {
    // console.log(values);
    if (step == 1) {
      const smCode = form.getFieldValue('code');
      const { msg, data } = await $http.checkCode({ smCode })
      if (!data) {
        message.error(msg);
      } else {
        message.success(msg);
        setStep(2);
      }
    } else {
      const { msg, data } = await $http.resetPassword({ newPassword: values.newPassword });
      if (!data) {
        message.error(msg)
      } else {
        message.success(msg);
        history.replace('/users/login')
      }
    }

  }

  return (
    <Form form={form} onFinish={onFinish}>
      {componentSelector({ FormItem, Input, Button, form })}
      <FormItem>
        <Button type='primary' block htmlType='submit'>提交</Button>
      </FormItem>
    </Form>
  )
}
