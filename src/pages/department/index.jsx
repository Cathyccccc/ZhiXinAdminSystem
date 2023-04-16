import React, { useState } from 'react';
import { useSelector, useDispatch } from 'umi';
import { Button, Modal } from 'antd';
import Dialog from 'components/Dialog';
import Tree from './components/Tree';
import iconMap from 'components/iconMap';
import './index.less';
import FormComponent from './components/FormComponent';

export default function index() {

  const [status, setStatus] = useState('add');
  const [title, setTitle] = useState('新增部门');
  const [showDelModal, setShowDelModal] = useState(false);
  const { collapse } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { showDetailModal, departmentDetail } = useSelector(state => state.department);

  const modelTitle = (
    <div className='model-title-wrapper'>
      <span>{title}</span>
      {status === 'update' && (<span className='model-icon' onClick={() => setShowDelModal(true)}>{iconMap.deleteIcon}</span>)}
    </div>
  );

  // 打开新增部门弹窗(之前如果查看过部门详情，需要清除之前的departmentDetail数据)
  const openDialog = () => {
    dispatch({
      type: 'department/setDepartmentDetail',
      payload: { departmentDetail: null },
    });
    setIsModalOpen(true);
    setStatus('add');
    setTitle('新增部门');
  }

  // 获取部门详情
  const getDepartmentDetail = (_id, name) => {
    if (_id == -1) return; // 最上层没有详情
    setStatus('update');
    setTitle(name);
    dispatch({ type: 'department/getDepartmentDetailData', payload: _id })
  }

  // 删除部门
  const deleteDepartment = () => {
    dispatch({type: 'department/deleteDepartment', payload: departmentDetail._id})
    setShowDelModal(false);
  }

  // 控制部门详情弹窗的展示
  const setIsModalOpen = (status) => {
    dispatch({ type: 'department/setShowDetailModal', payload: {showDetailModal: status} });
  }

  return (
    <div className='department-container'>
      <div className={['header-container', collapse ? 'big-width' : 'small-width'].join(' ')}>
        <div className='button-list'>
          <Button shape="round" size='small' icon={iconMap.addIcon} onClick={openDialog}>创建</Button>
        </div>
      </div>
      <Tree getDepartmentDetail={getDepartmentDetail} />
      <Dialog
        isModalOpen={showDetailModal}
        setIsModalOpen={setIsModalOpen}
        title={modelTitle}
        width={600}
        className="department-detail"
        render={() => <FormComponent status={status} setIsModalOpen={setIsModalOpen} />}
      />
      <Modal
        title="提示"
        open={showDelModal}
        okText="确认"
        cancelText="取消"
        onOk={deleteDepartment}
        onCancel={() => setShowDelModal(false)}
        zIndex={1001}
      >
        确定要删除部门【{departmentDetail?.departmentName}】么?
      </Modal>
    </div>
  )
}
