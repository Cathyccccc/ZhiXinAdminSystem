import React, {useRef} from 'react';

export default function commonHook() {
  const page = useRef(1);
  const setPage = (currentPage) => {
    page.current = currentPage;
  }
  return [page, setPage];
}
