import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NaviBar } from './LoginNaviCss';
import localImage from '../Pictures/free-icon-dog-2138611.png';
import hoveredLocalImage from '../Pictures/free-icon-dog-2317843.png';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";

function LoginNavi() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const handleLogoMouseEnter = () => {
        setIsLogoHovered(true);
    };

    const handleLogoMouseLeave = () => {
        setIsLogoHovered(false);
    };

    const goToLoginPage = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <>
            <NaviBar>
                <div className='naviDivLeft'>
                    {
                        isLogoHovered
                            ?
                            <span
                                className='mainHoverImageSpan'
                                onMouseEnter={handleLogoMouseEnter}
                                onMouseLeave={handleLogoMouseLeave}
                            >
                                <Link to="/">
                                    <img className='MainImage' src={hoveredLocalImage} alt="Local" />
                                </Link>
                            </span>
                            :
                            <span
                                className='mainImageSpan'
                                onMouseEnter={handleLogoMouseEnter}
                                onMouseLeave={handleLogoMouseLeave}
                            >
                                <Link to="/">
                                    <img className='MainImage' src={localImage} alt="Local" />
                                </Link>
                            </span>
                    }
                </div>
                <div className='naviDivRight'>
                    {
                        currentUser ? 
                        <span
                            onClick={handleLogout}
                            className={isHovered ? 'naviLoginButtonHovered' : 'naviLoginButton'}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        > 로그아웃
                        </span>
                        : 
                        <span
                            onClick={goToLoginPage}
                            className={isHovered ? 'naviLoginButtonHovered' : 'naviLoginButton'}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        > 로그인페이지
                        </span>
                    }
                </div>
            </NaviBar>
        </>
    );
}

export default LoginNavi;
