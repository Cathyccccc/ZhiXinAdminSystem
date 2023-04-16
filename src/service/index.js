// 负责导出所有的api
const files = require.context('.', true, /\.js$/); // 获取webpack上下文（.表示所有路径）
const module = {};

files.keys().forEach((key) => {
  if (key === './index.js' || key === './http.js') return;
  Object.assign(module, files(key));
})

export default module;
