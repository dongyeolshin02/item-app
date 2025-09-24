import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { boardAPI } from '../../service/boardService';
import Pagination from '../../components/Pagination';
import '../../assets/css/board/boardList.css';

function BoardList(props) {
    const [page, setPage] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 10,
        totalCount: 0
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['board', page],
        queryFn: () => boardAPI.getBoardList({ page: page, size: 10 }),
      });

       // useEffect를 사용하여 데이터가 변경될 때 상태 업데이트
        useEffect(() => {
            if (data) {
            console.log(data.response);
            setBoardList(data.response.content || []);
            setPagination({
                currentPage: data.response.page,
                totalCount: data.response.total,
                pageSize: 10
            });
            }
        }, [data]);

        const movePage = (page) => {
           setPage(page);
        }

    return (
        <>
            <main className='container'>
                <header className="header">
                    <h2>게시글 리스트 </h2>
                </header>
                <section className='contents'>
                    <table className='table table-bordered'> 
                        <thead className='table-dark'>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boardList.map((board) => (
                                <tr key={board.brdId}>
                                    <td>{board.brdId}</td>
                                    <td>
                                        <Link 
                                            to={`/board/${board.brdId}`}
                                            className="text-decoration-none"
                                        >
                                            {board.title}
                                        </Link>
                                    </td>
                                    <td>{board.writer}</td>
                                    <td>{board.createDate}</td>
                                    <td>{board.readCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className='pagination'>
                    <Pagination
                        totalRows={20}
                        currentPage={pagination.currentPage}
                        onPageChange={movePage}
                        pagePerRows={10}
                        blockPerCount={10}
                    />
                </section>
            </main> 
        </>
    );
}

export default BoardList;