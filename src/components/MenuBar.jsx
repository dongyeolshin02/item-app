import React from 'react';
import '../assets/css/menu/menubar.css';
import { NavLink } from 'react-router';
import {useAuthStore} from "../store/Auth.js";
function MenuBar(props) {
    const isLoggedIn= true;
    const isAuthenticated = useAuthStore((state)=> state.isAuthenticated());
    const userName = useAuthStore((s)=> s.userName);

    console.log(userName)
    return (
        <>
            <nav className='nav'>
                <ul className='nav-list'>
                    <li>
                        <NavLink to="/"
                                 className={({isActive}) => isActive ? 'active' : ''}
                                 end
                        >Home</NavLink>
                    </li>
                    <li className='nav-board'>
                        <span>Board</span>
                        <ul className='nav-submenu'>
                            <li>
                                <NavLink to="/board"
                                         className={({isActive}) => isActive ? 'active' : ''}
                                         end
                                >게시판</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="ms-auto">
                        {isAuthenticated ? (
                            // 로그인 상태일 때
                            <div className='nav-user'>
                                <span>{userName}님 안녕하세요</span>
                                <ul className='nav-submenu'>
                                    <li>
                                        <NavLink to="/profile"
                                                 className={({isActive}) => isActive ? 'active' : ''}
                                        >회원정보</NavLink>
                                    </li>
                                    <li>
                                        <button className="logout-btn" > 로그아웃 </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            // 로그아웃 상태일 때
                            <NavLink to="/login"
                                     className={({isActive}) => isActive ? 'active' : ''}
                            >로그인</NavLink>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default MenuBar;