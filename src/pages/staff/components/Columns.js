import {formatDate, formatYear, formatBirth} from 'utils/format';
import {Tag, Image} from 'antd';
import loadError from 'assets/load_error.png';
import iconMap from 'components/iconMap';
import { staffRule } from 'utils/rules/staffRules';

const Columns = ({userInfo, handleSave, openRecordDialog, showStaffDetail}) => {
  const defaultColumns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      width: '150px',
      editable: true,
      render: (value, record) => (
        <>
          <span>{value}</span>
          <span style={{position:'absolute', right: '10px', cursor: 'pointer'}} onClick={(e) => {
            e.stopPropagation();
            showStaffDetail(record._id)
          }}>{iconMap.editIcon}</span>
        </>
      )
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      width: '150px',
      editable: true,
    },
    {
      title: '职级描述',
      dataIndex: 'level',
      render: (value) => value?.levelDescription || '---'
    },
    {
      title: '姓别',
      dataIndex: 'gender',
      editable: true,
      width: '100px',
      render: (value) => <Tag>{value ? '女' : '男'}</Tag>
    },
    {
      title: '部门',
      dataIndex: 'department',
      render: (value) => value?.departmentName || '---'
    },
    {
      title: '部门负责人',
      dataIndex: 'department',
      // width: '200px',
      render: (value) => value?.departmentLeader?.userName || '---'
    },
    {
      title: '年龄',
      dataIndex: 'idNumber',
      render: (value) => formatYear(value, 'age')
    }
  ]
  
  const authColumns = [
    {
      title: '入职时间',
      dataIndex: 'onboardingTime',
      width: '150px',
      editable: true,
      render: (value) => formatDate(value)
    },
    {
      title: '毕业院校',
      dataIndex: 'graduatedSchool',
      width: '150px',
      editable: true,
    },
    {
      title: '学历',
      dataIndex: 'education',
      width: '100px',
      editable: true,
      render: (value) => {
        switch(value) {
          case 1:
            return <Tag>本科</Tag>
          case 2:
            return <Tag>硕士</Tag>
          case 3:
            return <Tag>博士</Tag>
          default:
            return <Tag>本科</Tag>
        }
      }
    },
    {
      title: '薪资',
      dataIndex: 'salary',
      width: '100px',
      editable: true,
    },
    {
      title: '银行卡号',
      dataIndex: 'bankNumber',
      width: '200px',
      editable: true,
    },
    {
      title: '身份证号',
      dataIndex: 'idNumber',
      editable: true,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (value) => <Image
          width={40}
          src={value}
          fallback={loadError}
          // preview={true}
        />
    },
    {
      title: '生日',
      dataIndex: 'idNumber',
      render: (value) => formatBirth(value)
    },
    {
      title: '婚姻状况',
      dataIndex: 'marriage',
      editable: true,
      render: (value) => <Tag>{value == 1 ? '已婚' : '未婚'}</Tag>
    },
    {
      title: '地址',
      dataIndex: 'hometown',
    },
    {
      title: '绩效考核',
      dataIndex: 'record',
      render: (text, record) => <Tag
        onClick={() => {
          console.log(record)
          openRecordDialog({
            title: '考核记录',
            apiName: 'getAssessmentList',
            params: {
              queryData: {
                staffName: record._id   
              },
            },
            type: 'assessment'
          })
        }}
      >查看</Tag>
    },
    {
      title: '调薪记录',
      dataIndex: 'record',
      render: (value, record) => <Tag
        onClick={() => {
          openRecordDialog({
            title: '调薪记录',
            apiName: 'getSalaryAdjustment',
            params: {},
            type: 'salary'
          })
        }}
      >查看</Tag>
    },
    {
      title: '奖惩记录',
      dataIndex: 'record',
      render: (value, record) => <Tag
        onClick={() => {
          openRecordDialog({
            title: '调薪记录',
            apiName: 'getRewardAndPunishment',
            params: {},
            type: 'reward'
          })
        }}
      >查看</Tag>
    },
  ]
  let columns = userInfo.identity ? [...defaultColumns, ...authColumns] : defaultColumns;
  columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    let cellType;
    switch(col.dataIndex) {
      case 'gender':
      case 'marriage':
      case 'education':
        cellType = 'selectNode';
        break;
      case 'onboardingTime':
        cellType = 'dateNode';
        break;
      default:
        cellType = 'inputNode';
        break;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        type: cellType,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        rules: staffRule[col.dataIndex],
        handleSave,
      }),
    };
  });
  return columns;
}

export default Columns;
