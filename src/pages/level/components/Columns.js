import iconMap from 'components/iconMap';
import {levelRule} from 'utils/rules/levelRules';
const Columns = ({handleSave, showLevelDetail}) => {
  let columns = [
    {
      title: '职级名称',
      dataIndex: 'levelName',
      width: '150px',
      editable: true,
      render: (value, record) => {
        return (
          <>
            <span>{value}</span>
            <span style={{position:'absolute', right: '10px', cursor: 'pointer'}} onClick={(e) => {
              e.stopPropagation();
              showLevelDetail(record._id);
            }}>{iconMap.editIcon}</span>
          </>
        )
      }
    },
    {
      title: '职级描述',
      dataIndex: 'levelDescription',
      width: '150px',
      editable: true,
    },
    {
      title: '考核要求',
      dataIndex: 'assessmentRequire',
      width: '150px',
      editable: true,
    },
    {
      title: '面试要求',
      dataIndex: 'interviewRequire',
      width: '150px',
      editable: true, 
    },
    {
      title: '分红权配赠基数',
      dataIndex: 'baseNumber',
      width: '150px',
      editable: true,
    },
    {
      title: '职级对应分数',
      dataIndex: 'levelScore',
      width: '150px',
      editable: true,
    }
  ];
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
        rules: levelRule[col.dataIndex],
        handleSave,
      }),
    };
  });
  return columns;
};
export default Columns;