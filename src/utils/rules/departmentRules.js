export const departmentRule = {
  departmentName: [
    { required: true, message: '部门名称不能为空' },
    { max: 20, message: '部门名称长度不正确' },
    { min: 3, message: '部门名称长度不正确' },
  ],
  departmentLeader: [
    { required: true, message: '部门负责人不能为空' },
  ],
}