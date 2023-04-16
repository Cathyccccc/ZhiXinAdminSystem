import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'umi';
import ChartCensus from './components/ChartCensus';
import TableCensus from './components/TableCensus';
import './css/index.less';

export default function index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'attendance/getAttendanceTable'});
  }, [])
  const {tableList, chartList} = useSelector(state => state.attendance);
  return (
    <div className='attendance-container'>
      {chartList.map((i, index) => <ChartCensus {...i} key={index}/>)}
      {tableList.map((i, index) => <TableCensus {...i} key={index} />)}
    </div>
  )
}

