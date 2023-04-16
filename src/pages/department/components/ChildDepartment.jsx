import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import iconMap from 'components/iconMap';
import AddChildModal from './AddChildModal';
import { useSelector } from 'umi';

export default function ChildDepartment({ childList, pushOrUpdateList }) {

  const [delChild, setDelChild] = useState([]);
  const [showChildModal, setShowChildModal] = useState(false); // 控制子部门列表选项的弹窗显示
  const [showDelModal, setShowDelModal] = useState(false); // 控制解除子部门时，解除确认弹窗显示
  const { departmentDetail } = useSelector(state => state.department);

  // 删除子部门
  const deleteChildDepartment = () => {
    // 1.打开部门详情，删除子部门
    // 2.新增部门时，调整子部门
    if (departmentDetail) {
      pushOrUpdateList({ type: 'del', list: delChild });
    } else {
      const newArr = childList.filter((child) => {
        return delChild.every(item => item._id !== child._id)
      })
      pushOrUpdateList({ type: 'add', list: newArr});
    }
    setShowDelModal(false);
  };

  return (
    <>
      <Table
        dataSource={childList}
        rowSelection={{
          onChange: (selectedRowKeys, seletedRows) => {
            setDelChild(seletedRows);
          }
        }}
        rowKey={(record) => record._id}
        size="small"
        pagination={false}
        expandable={{
          showExpandColumn: false,
        }}
      >
        <Table.Column title="名称" dataIndex="departmentName"></Table.Column>
      </Table>
      <Button type="primary" style={{ marginRight: '10px' }} icon={iconMap.connectIcon} onClick={() => setShowChildModal(true)}>增加子部门</Button>
      <Button disabled={!delChild.length} icon={iconMap.deleteIcon} onClick={() => setShowDelModal(true)}>解除子部门关联</Button>
      <AddChildModal
        visible={showChildModal}
        setVisible={setShowChildModal}
        pushOrUpdateList={pushOrUpdateList}
        existList={childList}
      />
      <Modal
        title="提示"
        open={showDelModal}
        okText="确认"
        cancelText="取消"
        onOk={deleteChildDepartment}
        onCancel={() => setShowDelModal(false)}
      >
        确定要删除选择的部门么?
      </Modal>
    </>
  )
}
