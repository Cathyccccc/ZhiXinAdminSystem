import React, { useState } from 'react';
import iconMap from 'components/iconMap';
import { message, Row, Col } from 'antd';
import { loginRules } from 'utils/rules';
import {useDispatch} from 'umi';
import $http from 'api/index.js';

export default function CaptchaForm(props) {
  const [disabled, setDisabled] = useState(true);
  const [isGetting, setIsGetting] = useState(false);
  const [time, setTime] = useState(60);
  const dispatch = useDispatch();
  const { FormItem, Input, Button, form } = props;
  const text = !isGetting ? '获取验证码' : `${time}s`;
  const getCaptcha = (text) => {
    if (text === '获取验证码') {
      validateMobile().then(async () => {
        setIsGetting(true);
        const mobile = form.getFieldValue('mobile');
        const res = await $http.getCaptcha({mobile});
        // console.log(res)
        setDisabled(true);
        tick();
      }).catch((err) => {
        message.warning('请正确填写手机号码')
      });
      
    }
  }
  const tick = () => {
    let t = 60;
    const timer = setInterval(() => {
      t--;
      setTime(t);
      if (t == 0) {
        clearInterval(timer);
        setIsGetting(false);
      }
    }, 1000)
  }

  const validateMobile = async () => {
    try {
      const status = await form.validateFields(['mobile']);
      setDisabled(false);
    } catch (error) {
      setDisabled(true);
    }
  }
  
  return (
    <>
      <FormItem name="mobile" rules={loginRules.phoneRule} hasFeedback>
        <Input prefix={iconMap.phoneIcon} placeholder="请输入手机号码" onChange={validateMobile} />
      </FormItem>
      <FormItem>
        <Row gutter={8}>
          <Col span={14}>
            <FormItem name="code" rules={loginRules.codeRule} noStyle hasFeedback>
              <Input prefix={iconMap.codeIcon} placeholder="请输入验证码" />
            </FormItem>
          </Col>
          <Col span={10}>
          <Button
            block
            disabled={disabled}
            onClick={() => {
              getCaptcha(text)
            }}
          >{text}</Button>
          </Col>
        </Row>
      </FormItem>
    </>
  )
}
