import React from 'react'
import { Outlet, useSelector } from 'umi';
import Loading from 'components/Loading';

export default function index() {
  const loading = useSelector((state) => state.loading);
  return (
    <div>
      {/* 全局布局 */}
      {/* 这里的布局将会在所有的页面中呈现 */}
      <Loading loading={!loading.effects['users/login', 'dashboard/analyzeStaff', 'attendance/getAttendanceTable']} />
      <Outlet /> {/* children */}
    </div>
  )
}
