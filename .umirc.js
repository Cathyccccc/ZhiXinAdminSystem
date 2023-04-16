import { defineConfig } from 'umi'; // 在写配置时有提示
import { resolve } from 'path';

export default defineConfig({
  npmClient: 'npm',
  publicPath: '/',
  mfsu: false,
  plugins: [
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/dva',
    '@umijs/plugins/dist/request',
  ],
  antd: { // 引入antd
    import: true
  },
  dva: {}, // 引入dva（直接给一个空对象也表示引入）
  request: {
    dataField: ''
  },
  alias: {
    utils: resolve(__dirname, './src/utils'),
    components: resolve(__dirname, './src/components'),
    assets: resolve(__dirname, './src/assets'),
    api: resolve(__dirname, './src/service'),
    static: resolve(__dirname, './src/static'),
    hook: resolve(__dirname, './src/hook'),
  },
  routes: [
    {
      path: '/users',
      component: '@/layouts/users',
      routes: [
        { path: '/users/login', component: 'users/login' },
        { path: '/users/forgetPassword', component: 'users/forgetPassword' },
      ]
    },
    {
      path: '/',
      component: '@/layouts/default',
      routes: [
        { path: '/dashboard', component: 'dashboard' },
        { path: '/assessment', component: 'assessment' },
        { path: '/attendance', component: 'attendance' },
        { path: '/attendanceInfo', component: 'attendanceInfo' },
        { path: '/department', component: 'department' },
        { path: '/level', component: 'level' },
        { path: '/rewardAndPunishment', component: 'rewardAndPunishment' },
        { path: '/salary', component: 'salary' },
        { path: '/staff', component: 'staff' },
        { path: '*', component: '/notFound' } // 非匹配路由，需要显示404界面
      ]
    }
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    }
  }
});
