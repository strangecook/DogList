import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavBar, UserProfileImage, ProfileButton, ProfileButtonHover, UserName, MenuTrigger, MenuSpan, Overlay, MobileMenu, MobileMenuItem } from './LoginNaviCss';
import pawImage from '../Pictures/dog-paw.png';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function LoginNavi() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // 모바일 메뉴 상태 추가

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false); // 경로 변경 시 모바일 메뉴 닫기
    }, [location.pathname]);

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

    const goToMembershipPage = () => {
        navigate('/membership');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
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
                {currentUser ? (
                    <ProfileButtonHover onClick={goToProfilePage}>
                        <UserProfileImage src={currentUser.photoURL || pawImage} alt="Profile" />
                        <UserName>{currentUser.displayName || 'User'}</UserName>
                    </ProfileButtonHover>
                ) : (
                    <span
                        onClick={goToLoginPage}
                        className={isHovered ? 'naviLoginButtonHovered' : 'naviLoginButton'}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        로그인페이지
                    </span>
                )}
            </div>
                <MenuTrigger className={mobileMenuOpen ? 'active-1' : ''} onClick={toggleMobileMenu}>
                    <MenuSpan />
                    <MenuSpan />
                    <MenuSpan />
                </MenuTrigger>
            {mobileMenuOpen && <Overlay onClick={toggleMobileMenu} />}
            <MobileMenu className={mobileMenuOpen ? 'open' : ''}>
                <MobileMenuItem onClick={() => navigate('/')}>홈</MobileMenuItem>
                <MobileMenuItem onClick={() => navigate('/usage')}>사용 설명</MobileMenuItem>
                <MobileMenuItem onClick={() => navigate('/contact')}>개발자 문의</MobileMenuItem>
                {currentUser && (
                    <>
                        <MobileMenuItem onClick={goToProfilePage}>내 프로필</MobileMenuItem>
                        <MobileMenuItem onClick={goToMembershipPage}>멤버쉽 가입</MobileMenuItem>
                        <MobileMenuItem onClick={handleLogout}>로그아웃</MobileMenuItem>
                    </>
                )}
                {!currentUser && (
                    <MobileMenuItem onClick={goToLoginPage}>로그인페이지</MobileMenuItem>
                )}
            </MobileMenu>
        </NavBar>
    );
}

export default LoginNavi;
