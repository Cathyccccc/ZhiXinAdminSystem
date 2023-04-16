import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'umi';
import TableHeader from 'components/TableHeader';
import SearchContainer from 'components/SearchContainer';
import FilterForm from './components/FilterForm';
import TableList from './components/TableList';
import DetailDrawer from 'components/DetailDrawer';
import DetailForm from './components/DetailForm';
import commonHook from '../../hook/common';
import Dialog from 'components/Dialog';
import AddForm from './components/AddForm';

export default function index() {
  const [page, setPage] = commonHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    loadTable();
  }, [])
  const {staffList, staffTotal, staffDetail} = useSelector(state => state.staff)
  const {loading} = useSelector(state => state)
  const changePage = (currentPage) => {
    loadTable(currentPage);
  }
  const loadTable = (currentPage, queryData = {}) => {
    setPage(currentPage);
    dispatch({type: 'staff/getStaffData', payload: {page:page.current, size: 10, queryData}})
  }
  return (
    <div className='container'>
      <TableHeader total={staffTotal} changePage={changePage} page={page.current} openDialog={() => setIsModalOpen(true)} interfaceDelMethod="deleteStaff" />
      <SearchContainer>
        <FilterForm reloadTable={(data) => loadTable(1, data)} />
      </SearchContainer>
      <div className='table-wrapper'>
        <TableList data={staffList && staffList} loading={loading} reloadTable={loadTable} />
      </div>
      <Dialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="新增员工"
        width={750}
        render={() => <AddForm loadTable={loadTable} setIsModalOpen={setIsModalOpen} />}
      />
      <DetailDrawer title={staffDetail?.userName} _id={staffDetail?._id} interfaceName="deleteStaff" render={<DetailForm staffDetail={staffDetail} loadTable={loadTable} />} renderList={loadTable} />
    </div>
  )
}
