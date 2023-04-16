import React from 'react';
import iconMap from '../iconMap';
import './index.less';

export default function Loading(props) {
  // console.log(props)
  return (
    <div className={props.loading ? 'loading-container hidden': 'loading-container'}>
      <div className='loading-icon'>
        {/* <img src="" alt="" /> */}
        {iconMap.loadingIcon}
      </div>
      <div className='loading-text'>L O A D I N G ...</div>
    </div>
  )
}
