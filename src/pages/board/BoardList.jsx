import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { boardAPI } from '../../service/boardService';

function BoardList(props) {
    const [page, setPage] = useState(1);
    const [boardList, setBoardList] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        totalCount: 0
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['posts', page],
        queryFn: () => boardAPI.getBoardList({ page: page-1, size: 10 }),
      });

       // useEffect를 사용하여 데이터가 변경될 때 상태 업데이트
        useEffect(() => {
            if (data) {
            console.log(data);
            setBoardList(data.content || []);
            setPagination({
                currentPage: data.page || 1,
                totalPages: data.totalPages || 1,
                pageSize: data.size || 10,
                totalCount: data.totalElements || 0
            });
            }
        }, [data, setBoardList, setPagination]);


    return (
        <>
            <main className='container'>
                <header className="text-center">
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
                                    <td>{board.title}</td>
                                    <td>{board.writer}</td>
                                    <td>{board.createDate}</td>
                                    <td>{board.readCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className='pagination'>
                    
                </section>
            </main> 
        </>
    );
}

export default BoardList;