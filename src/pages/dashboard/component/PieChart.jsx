import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';

export default function PieChart({title, renderList, styleData, isArea = false, isLegend = false, isCircle = false}) {
  // console.log(title, renderList, styleData, isArea, isLegend, isCircle)
  const option = {
    title : {
      text: title,
      x:'left'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: isLegend ? {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      data: renderList && renderList.map(i => i.name)
    } : null,
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : isCircle ? ['30%', '50%']:'40%',
        center: ['50%', '40%'],
        data: renderList,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        roseType: isArea ? 'radius' : false
      },
    ],
  };

  return (
    <Card
      size="small"
      hoverable
      style={styleData}
    >
      <ReactECharts
        option={option}
        style={{ height: 400 }}
      />
    </Card>
  );
}
