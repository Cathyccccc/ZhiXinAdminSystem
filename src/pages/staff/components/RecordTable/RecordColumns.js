import {formatDate} from 'utils/format';
import {Tag} from 'antd';

export default {
  assessment: [
    {
      title: '员工姓名',
      dataIndex: 'staffName',
      render: (value) => value?.userName,
    },
    {
      title: '考核等级',
      dataIndex: 'result',
    },
    {
      title: '调整职级',
      dataIndex: 'currentLevel',
      render: (value) => value || '---',
    },
    {
      title: '对应职级分数',
      dataIndex: 'standardScore',
    },
    {
      title: '考核得分',
      dataIndex: 'assessmentScore',
    },
  ],
  salary: [
    {
      title: '员工姓名',
      dataIndex: 'staffName',
      render: (value) => value?.userName,
    },
    {
      title: '调整后薪资',
      dataIndex: 'newSalary',
    },
    {
      title: '时间',
      dataIndex: 'startTime',
      render: (value) => formatDate(value),
    },
    {
      title: '调薪原因',
      dataIndex: 'reason',
    },
  ],
  reward: [
    {
      title: '员工姓名',
      dataIndex: 'staffName',
      render: (value) => value?.userName,
    },
    {
      title: '奖惩类型',
      dataIndex: 'type',
      // 1 => 优秀员工   2=> 知识创新  3=> 通报批评 4 => 警告处分
      render: (value) => {
        let text;
        switch(value) {
          case 1:
            text = '优秀员工';
            return text
          case 2:
            text = '知识创新';
          case 3:
            text = '通报批评';
          case 4:
            text = '警告处分';
        }
        return (<Tag color={value > 2 ? '#f50' : '#87d068'}>{text}</Tag>)
      }
    },
    {
      title: '时间',
      dataIndex: 'date',
      render: (value) => formatDate(value),
    },
    {
      title: '原因',
      dataIndex: 'reason',
    },
  ]
};