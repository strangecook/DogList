import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { NaviBar } from './LoginNaviCss';
import localImage from './free-icon-dog-2138611.png'
import hoveredLocalImage from './free-icon-dog-2317843.png'

function LoginNavi() {

    const [isHovered, setIsHovered] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);

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
    return (
        <>
            <NaviBar>
                <div className='naviDivLeft'>
                    {
                    isLogoHovered 
                    ?
                    <span 
                        className='mainHoverImageSpan' // 버튼의 클래스 조건부 적용
                        onMouseEnter={handleLogoMouseEnter} // 마우스를 가져다 대는 동작에 대한 이벤트 핸들러
                        onMouseLeave={handleLogoMouseLeave} // 마우스를 버튼에서 떼는 동작에 대한 이벤트 핸들러
                    > 
                    <Link to="/">
                        <img className='MainImage' src={hoveredLocalImage} alt="Local" />
                    </Link>
                    </span>

                    :
                    <span 
                    className='mainImageSpan' // 버튼의 클래스 조건부 적용
                    onMouseEnter={handleLogoMouseEnter} // 마우스를 가져다 대는 동작에 대한 이벤트 핸들러
                    onMouseLeave={handleLogoMouseLeave} // 마우스를 버튼에서 떼는 동작에 대한 이벤트 핸들러
                > 
                <Link to="/">
                    <img className='MainImage' src={localImage} alt="Local" />
                </Link>
                </span>

                    }

                </div>
                <div className='naviDivRight'>
                        <span     
                        className={isHovered ? 'naviLoginButtonHovered' : 'naviLoginButton'} // 버튼의 클래스 조건부 적용
                        onMouseEnter={handleMouseEnter} // 마우스를 가져다 대는 동작에 대한 이벤트 핸들러
                        onMouseLeave={handleMouseLeave} // 마우스를 버튼에서 떼는 동작에 대한 이벤트 핸들러
                        > 로그인
                        </span>
                    </div>
            </NaviBar>
        </>
    )
}

export default LoginNavi;