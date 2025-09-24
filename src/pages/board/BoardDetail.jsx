import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { boardAPI } from '../../service/boardService';
import '../../assets/css/board/boardDetail.css';

function BoardDetail() {
    const { brdId } = useParams();
    const navigate = useNavigate();

    const { data:board, isLoading, error } = useQuery({
        queryKey: ['boardDetail', brdId],
        queryFn: () => boardAPI.getBoardDetail(brdId),
        enabled: !!brdId
    });

    useEffect(() => {
        console.log(board);
    }, [board]);


    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }



    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                게시글을 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    if (!board) {
        return (
            <div className="alert alert-warning" role="alert">
                게시글을 찾을 수 없습니다.
            </div>
        );
    }

    const handleBackToList = () => {
        navigate('/board');
    };

    const handleEdit = () => {
        navigate(`/board/${brdId}/edit`);
    };

    const handleDelete = () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            // TODO: 삭제 API 호출
            console.log('Delete board:', brdId);
        }
    };

    const fileDown = (bfId)=>{
        
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">게시글 상세</h4>
                            <div>
                                <button 
                                    className="btn btn-outline-primary btn-sm me-2"
                                    onClick={handleEdit}
                                >
                                    수정
                                </button>
                                <button 
                                    className="btn btn-outline-danger btn-sm me-2"
                                    onClick={handleDelete}
                                >
                                    삭제
                                </button>
                                <button 
                                    className="btn btn-secondary btn-sm"
                                    onClick={handleBackToList}
                                >
                                    목록
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-md-2">
                                    <strong>제목:</strong>
                                </div>
                                <div className="col-md-10">
                                    {board.title}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-2">
                                    <strong>작성자:</strong>
                                </div>
                                <div className="col-md-4">
                                    {board.writer}
                                </div>
                                <div className="col-md-2">
                                    <strong>작성일:</strong>
                                </div>
                                <div className="col-md-4">
                                    {board.createDate}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-2">
                                    <strong>조회수:</strong>
                                </div>
                                <div className="col-md-4">
                                    {board.readCount || 0}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                    <div className="board-content">
                                        {board.content || '내용이 없습니다.'}
                                    </div>
                                </div>
                            </div>

                            {Array.isArray(board.fileList) && board.fileList.length > 0 && (
                                <>
                                    <hr />
                                    <div className="row mb-2">
                                        <div className="col-md-2">
                                            <strong>첨부파일:</strong>
                                        </div>
                                        <div className="col-md-10">
                                            <ul className="list-unstyled mb-0">
                                                {board.fileList.map((file, index) => {
                                                    return (
                                                        <li key={file.bfId} className="mb-1">
                                                            <a href={`/api/v1/board/file/${file.bfId}`}  target="_blank"
                                                                            className="btn btn-sm btn-outline-primary">
                                                                {file.fileName}
                                                            </a>
                                                            {file.fileSize ? (
                                                                <span className="text-muted ms-2">({typeof file.fileSize === 'number' ? 
                                                                     `${(file.fileSize / 1024).toFixed(1)} KB` : file.fileSize})</span>
                                                            ) : null}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardDetail;