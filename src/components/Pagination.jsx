import React, { useState, useEffect } from 'react';

const Pagination = ({ 
  totalRows, 
  currentPage, 
  onPageChange, 
  pagePerRows = 10, 
  blockPerCount = 10,
  className = ''
}) => {
  const [paginationData, setPaginationData] = useState({
    totalPage: 0,
    totalBlock: 0,
    nowBlock: 0
  });

  const calculatePaginationData = () => {
    if (!totalRows || totalRows <= 0 || !pagePerRows || pagePerRows <= 0) {
      return { totalPage: 0, nowBlock: 0, totalBlock: 0 };
    }

    const total = totalRows / pagePerRows;
    const totalPage = Math.ceil(total);

    const nowBlockCalc = currentPage / blockPerCount;
    const nowBlock = Math.floor(nowBlockCalc);

    const totals = totalPage / blockPerCount;
    const totalBlock = Math.ceil(totals);

    return { totalPage, nowBlock, totalBlock };
  };

  useEffect(() => {
    const data = calculatePaginationData();
    setPaginationData(data);
  }, [totalRows, currentPage, pagePerRows, blockPerCount]);

  const handlePageMove = (page) => {
    if (onPageChange && page >= 0) {
      onPageChange(page);
    }
  };

  const renderPagination = () => {
    const { totalPage, nowBlock, totalBlock } = paginationData;
    
    if (totalPage === 0) {
      return null;
    }

    const elements = [];

    // 처음으로 가기
    const isFirstDisabled = currentPage === 0;
    elements.push(
      <li key="first" className={`page-item${isFirstDisabled ? ' disabled' : ''}`}>
        <a 
          className="page-link" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (!isFirstDisabled) handlePageMove(0);
          }}
        >
          처음
        </a>
      </li>
    );

    // 이전 블럭 가기
    const isPrevBlockDisabled = nowBlock === 0;
    const prevPageNum = (nowBlock * blockPerCount) - 1;
    elements.push(
      <li key="prev" className={`page-item${isPrevBlockDisabled ? ' disabled' : ''}`}>
        <a 
          className="page-link" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (!isPrevBlockDisabled) handlePageMove(prevPageNum);
          }}
        >
          이전
        </a>
      </li>
    );

    // 페이지 번호 그리기
    for (let i = 0; i < blockPerCount; i++) {
      const pageNum = (nowBlock * blockPerCount) + i;
      const isActive = currentPage === pageNum;

      elements.push(
        <li key={pageNum} className={`page-item${isActive ? ' active' : ''}`}>
          <a 
            className="page-link" 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageMove(pageNum);
            }}
          >
            {pageNum + 1}
          </a>
        </li>
      );

      if (totalPage === 0 || totalPage === (pageNum + 1)) {
        break;
      }
    }

    // 다음 블럭 가기
    const isNextBlockDisabled = (nowBlock + 1) >= totalBlock;
    const nextPageNum = (nowBlock + 1) * blockPerCount;
    elements.push(
      <li key="next" className={`page-item${isNextBlockDisabled ? ' disabled' : ''}`}>
        <a 
          className="page-link" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (!isNextBlockDisabled) handlePageMove(nextPageNum);
          }}
        >
          다음
        </a>
      </li>
    );

    // 마지막 페이지 가기
    const isLastDisabled = totalPage === (currentPage + 1);
    const lastPageNum = totalPage - 1;
    elements.push(
      <li key="last" className={`page-item${isLastDisabled ? ' disabled' : ''}`}>
        <a 
          className="page-link" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (!isLastDisabled) handlePageMove(lastPageNum);
          }}
        >
          마지막
        </a>
      </li>
    );

    return elements;
  };

  if (!totalRows || totalRows <= 0) {
    return null;
  }

  return (
    <nav className={className}>
      <ul className="pagination justify-content-center">
        {renderPagination()}
      </ul>
    </nav>
  );
};

export default Pagination;