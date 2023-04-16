import React from 'react';
import './index.less';
import {Empty} from 'antd';
import img_404 from 'assets/404.png';

export default function NotFound() {
  return (
    <Empty
      image={img_404}
      imageStyle={{
        height: 100,
        marginTop: 100
      }}
      description={
        <span className='not-found-text'>Not Found</span>
      }
    >
    </Empty>
  )
}
