import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'umi';
import BarChart from './component/BarChart';
import Number from './component/Number';
import OldStaffTable from './component/OldStaffTable';
import PieChart from './component/PieChart';
import XBarChart from './component/XBarChart';
import './css/index.less';

export default function index() {
  const {
    amountDataList,
    staffData,
    pieList,
    columnList,
    constellationData
  } = useSelector(state => state.dashboard)
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'dashboard/analyzeStaff'});
  }, []);
  
  return (
    <div className='card-list'>
      {amountDataList.map(item => <Number {...item} key={item.title} />)}
      {pieList[1] && <XBarChart {...pieList[1]} />}
      {columnList.map(item => <BarChart {...item} key={item.title} />)}
      {pieList.map(item => <PieChart {...item} key={item.title} />)}
      <OldStaffTable {...staffData} />
      <PieChart {...constellationData} isArea={true} />
    </div>
  )
}
