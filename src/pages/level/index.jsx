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
  const {levelList, levelTotal, levelDetail} = useSelector(state => state.level)
  const {loading} = useSelector(state => state)
  const changePage = (currentPage) => {
    loadTable(currentPage);
  }
  const loadTable = (currentPage, queryData = {}) => {
    setPage(currentPage);
    dispatch({type: 'level/getLevelData', payload: {page:page.current, size: 10, queryData}})
  }

  return (
    <div className='container'>
      <TableHeader
        total={levelTotal}
        changePage={changePage}
        page={page.current}
        openDialog={() => setIsModalOpen(true)}
        interfaceDelMethod="deleteLevel"
      />
      <SearchContainer>
        <FilterForm reloadTable={(data) => loadTable(1, data)} />
      </SearchContainer>
      <div className='table-wrapper'>
        <TableList data={levelList && levelList} loading={loading} reloadTable={loadTable} />
      </div>
      <Dialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="新增职级"
        width={750}
        render={() => <AddForm loadTable={loadTable} setIsModalOpen={setIsModalOpen} />}
      />
      <DetailDrawer
        title={levelDetail?.levelName}
        _id={levelDetail?._id}
        interfaceName="deleteLevel"
        render={<DetailForm levelDetail={levelDetail} loadTable={loadTable} />}
        renderList={loadTable}
      />
    </div>
  )
}
