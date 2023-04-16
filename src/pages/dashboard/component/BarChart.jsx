import React from 'react'
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';

export default function BarChart({title, renderList, styleData}) {
  const option = {
    title: {
      text: title
    },
    grid: {
      height: 160
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: renderList.xData,
      axisLabel: { // 设置x轴文字纵向显示
        interval: 0,
        formatter: function (value) {
          return title === '部门员工数量' ? value.split("").join("\n") : value;
        },
      },
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: title === '员工年龄段' ? '年龄/数量' : '部门/数量',
      type: 'bar',
      data: renderList.yData,
      barWidth: 15
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
        opts={{ renderer: 'svg' }}
      />
    </Card>
  );
}
