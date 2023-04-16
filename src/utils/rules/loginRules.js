export const loginRules = {
  userRule: [
    { required: true, message: '用户名不能为空' },
    { min: 4, message: '用户名长度至少4个字符'},
  ],
  passwordRule: [
    { required: true, message: '密码不能为空' },
    { min: 6, max: 16, type: 'string', message: '密码长度应为6-16个字符' },
  ],
  phoneRule: [
    { required: true, message: '手机号码不能为空' },
    { pattern: /^1\d{10}$/, message: '手机号码格式不正确' }
  ],
  codeRule: [
    { required: true, message: '验证码不能为空' },
    { min: 6, max: 6, message: '验证码长度应为6个字符'},
  ],
  confirmPasswordRule(form) {
    return [
      {
        validator: async (rule, value, callback) => {
          const password = await form.getFieldValue('newPassword');
          switch(true) {
            case value == '':
              return Promise.reject('确认密码不能为空');
            case password !== value:
              return Promise.reject('两次输入的密码不一致');
            default: 
              return Promise.resolve();
          }
        }
      }
    ]
  }
}