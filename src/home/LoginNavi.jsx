import styled from 'styled-components';
import { Link } from 'react-router-dom';
import localImage from './free-icon-dog-2138611.png'

function LoginNavi() {

    const NaviBar = styled.div`
    position: absolute;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    margin: 12px;
    width: calc(100vw - 36px);

    .naviDivLeft{
        display: flex;
    }

    .naviDivRight{
        display: flex;
        color: white ;
    }
    .mainImageSpan{
        width: 80px;
        height: 80px;
        border-radius: 50px;
        background-color: #4caf50;
    }

    .MainImage {
        width: 64px;
        height: 64px;
        color: aliceblue;
        margin: 8px;
    }
    `

    return (
        <>
            <NaviBar>
                <div className='naviDivLeft'>
                    <span className='mainImageSpan'> 
                    <Link to="/">
                        <img className='MainImage' src={localImage} alt="Local" />
                    </Link>
                    </span>
                </div>
                <div className='naviDivRight'>
                    Right
                </div>
            </NaviBar>
        </>
    )
}

export default LoginNavi;