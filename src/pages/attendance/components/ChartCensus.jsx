import React from 'react';
import {Card} from 'antd';
import ReactECharts from 'echarts-for-react';

export default function ChartCensus({title, renderList}) {
  // console.log(title, renderList)
  const options = {
    title: {
      text: title
    },
    grid: {
      height: 160
    },
    xAxis: {
      type: 'category',
      data: renderList.xData || []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        data: renderList.yData || [],
        barWidth: 50
      }
    ],
    dataZoom: {
      type: 'slider',
      show: true,
      height: 20,
      start: 0,
      end: 60,
      bottom: 25
    }
  }
  return (
    <Card hoverable size='small'>
      <ReactECharts option={options} />
    </Card>
  )
}
