import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavBar, UserMenu, UserMenuItem, UserProfileImage, ProfileButton, ProfileButtonHover } from './LoginNaviCss';
import pawImage from '../Pictures/dog-paw.png';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function LoginNavi() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleMouseEnter = () => {
        setMenuOpen(true);
    };

    const handleMouseLeave = () => {
        setMenuOpen(false);
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

    const goToProfilePage = () => {
        navigate('/profile');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <NavBar>
            <div className='naviDivLeft'>
                <Link to="/">
                    <span
                        className={isLogoHovered ? 'mainHoverImageSpan' : 'mainImageSpan'}
                        onMouseEnter={handleLogoMouseEnter}
                        onMouseLeave={handleLogoMouseLeave}
                    >
                        <img className='MainImage' src={pawImage} alt="Paw Icon" />
                    </span>
                </Link>
                <Link to="/" className="navTitle">Dog List</Link>
            </div>
            <div className='naviDivCenter'>
                <Link to="/" className={`navLink ${location.pathname === '/' ? 'active' : ''}`}>홈</Link>
                <Link to="/usage" className={`navLink ${location.pathname === '/usage' ? 'active' : ''}`}>사용 설명</Link>
                <Link to="/contact" className={`navLink ${location.pathname === '/contact' ? 'active' : ''}`}>개발자 문의</Link>
            </div>
            <div className='naviDivRight'>
                {
                    currentUser ?
                        <div className="userMenuContainer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {menuOpen
                                ? <ProfileButtonHover onClick={goToProfilePage}>
                                    <UserProfileImage src={currentUser.photoURL || pawImage} alt="Profile" />
                                    {currentUser.displayName || 'User'}
                                </ProfileButtonHover>
                                : <ProfileButton onClick={goToProfilePage}>
                                    <UserProfileImage src={currentUser.photoURL || pawImage} alt="Profile" />
                                    {currentUser.displayName || 'User'}
                                </ProfileButton>
                            }

                            {menuOpen && (
                                <UserMenu >
                                    <UserMenuItem onClick={goToProfilePage}>내 프로필</UserMenuItem>
                                    <UserMenuItem onClick={handleLogout}>로그아웃</UserMenuItem>
                                </UserMenu>
                            )}
                        </div>
                        :
                        <span
                            onClick={goToLoginPage}
                            className={isHovered ? 'naviLoginButtonHovered' : 'naviLoginButton'}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            로그인페이지
                        </span>
                }
            </div>
        </NavBar>
    );
}

export default LoginNavi;
