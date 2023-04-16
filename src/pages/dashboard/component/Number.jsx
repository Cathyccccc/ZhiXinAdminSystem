import React from 'react';
import { Card } from 'antd';

export default function Number({title, amount, styleData}) {
  return (
    <Card
      size="small"
      hoverable
      style={styleData}
    >
      <div className='card-title'>{title}</div>
      <div className='card-content'>
        <span className='card-number'>{amount}</span>
        <span className='card-unit'>人</span>
      </div>
    </Card>
  )
}
