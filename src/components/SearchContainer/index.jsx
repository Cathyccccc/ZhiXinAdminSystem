import React,{useState} from 'react';
import './index.less';
import iconMap from 'components/iconMap';
import classNames from 'classnames'; // 处理静态类名和动态类名的插件
import {useDispatch} from 'umi';

export default function SearchContainer(props) {
  const [closeStatus, setCloseStatus] = useState(false);
  const dispatch = useDispatch();
  const handleToggle = () => {
    setCloseStatus(!closeStatus)
  }
  const clearForm = () => {
    dispatch({type: 'auth/setIsClearForm', payload: {isClearForm: true}})
  }
  return (
    <div className={classNames('search-container', {'close-container':closeStatus})}>
      <div className='search-title'>
        <div>字段过滤</div>
        <div className='refresh-icon' onClick={clearForm}>{iconMap.refreshIcon}</div>
      </div>
      <div className='search-form'>
        {props.children}
      </div>
      <div className='toggle-icon' onClick={handleToggle}>
        {closeStatus ? iconMap.rightIcon : iconMap.leftIcon}
      </div>
    </div>
  )
}
