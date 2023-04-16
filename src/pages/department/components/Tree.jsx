import React, { useEffect } from 'react';
import OrgTree from 'react-org-tree';
import { useDispatch, useSelector } from 'umi';

export default function Tree({ getDepartmentDetail }) {
  const dispatch = useDispatch();
  const { departmentList } = useSelector(state => state.department);
  useEffect(() => {
    dispatch({ type: 'department/getDepartmentData' });
  }, []);
  // 得到第一层级（没有上级的）
  const data = JSON.parse(JSON.stringify(departmentList)).filter(item => !item.parentLists.length);
  // 处理数据函数（将请求到的数据变成树状图需要的格式（对象））
  const mapData = (data) => {
    return data.map(item => ({
      id: item._id,
      label: item.departmentName,
      children: item.children && mapData(item.children)
    }))
  }
  const list = {
    id: -1,
    label: '公司组织架构图',
    children: mapData(data)
  }
  return (
    <OrgTree
      data={list}
      horizontal={false}
      collapsable={false}
      expandAll={true}
      onClick={(e, data) => getDepartmentDetail(data.id, data.label)}
    />
  )
}
