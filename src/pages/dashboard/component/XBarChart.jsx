import React from 'react'
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';

export default function XBarChart({renderList, styleData}) {
  const option = {
    title: {
      text: '平均年龄'
    },
    grid: {
      height: 200
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'value',
      max: Math.ceil(Math.max(...renderList.map(i => i.age)))
    },
    yAxis: {
      type: 'category',
      data: renderList.map(i => i.name),
      inverse: true
    },
    series: [{
      name: '平均年龄',
      type: 'bar',
      data: renderList.map(i => i.age),
      realtimeSort: true,
      barWidth: 40
    }]
  };

  return (
    <Card
      size="small"
      hoverable
      style={styleData}
    >
      <ReactECharts
        option={option}
        style={{ height: 300 }}
        opts={{ renderer: 'svg' }}
      />
    </Card>
  );
}
