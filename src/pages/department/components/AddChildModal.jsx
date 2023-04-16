import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import { useSelector } from 'umi';

export default function AddChildModal({ visible, setVisible, pushOrUpdateList, existList }) {

  // 这里老师提供的代码逻辑有点问题？？？部门关系有问题，如果parentLists.length为0，说明这个部门处在最上层，如果新增部门时，将该部门再作为新部门的子部门就很奇怪
  const data = useSelector((state) => state.department.departmentList.filter(item => !item.parentLists.length));
  const { departmentDetail } = useSelector(state => state.department);
  const [selectChild, setSelectChild] = useState([]); // 需要将选中的项通过pushOrUpdateList传递给上级

  // 添加选中的子部门
  const handleOk = () => {
    // 将选中的数据传递给上层
    if (departmentDetail) { // 1.部门详情页面，添加子部门（更新部门详情）
      pushOrUpdateList({ type: 'update', list: existList.concat(selectChild)})
    } else { // 2.新增部门页面，添加子部门
      pushOrUpdateList({ type: 'add', list: selectChild });
    }
    // 关闭当前子部门列表选项弹窗
    setVisible(false);
  }

  return (
    <Modal
      open={visible}
      destroyOnClose={true}
      title="子部门列表"
      width={400}
      onCancel={() => setVisible(false)}
      onOk={handleOk}
      okText="确认"
      cancelText="取消"
    >
      <Table
        dataSource={data}
        rowSelection={{
          onChange: (selectedRowKeys, seletedRows) => {
            setSelectChild(seletedRows);
          }
        }}
        rowKey={(record) => record._id}
        size="small"
        pagination={{
          pageSize: 5
        }}
        expandable={{
          showExpandColumn: false,
        }}
      >
        <Table.Column title="名称" dataIndex="departmentName"></Table.Column>
      </Table>
    </Modal>
  )
}
