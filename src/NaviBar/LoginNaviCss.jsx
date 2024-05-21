import styled from 'styled-components';

export const NaviBar = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
z-index: 10;
display: flex;
justify-content: space-between;
align-items: center;
padding: 12px 24px;


.naviDivLeft {
    display: flex;
    align-items: center;
}

.naviDivRight {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.naviLoginButton, .naviLoginButtonHovered {
    display: inline-block;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
}

.naviLoginButton {
    background-color: #4caf50;
    color: white;
    border: none; /* 테두리를 없앱니다 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 버튼에 그림자를 추가하여 입체감 부여 */
}

.naviLoginButtonHovered {
    background-color: white;
    color: #4caf50;
    border: none; /* 테두리를 없앱니다 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 호버 시에도 동일한 그림자 적용 */
}

.mainImageSpan, .mainHoverImageSpan {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.mainImageSpan {
    background-color: rgba(76, 175, 80, 0.7);
}

.mainHoverImageSpan {
    background-color: #B8E0B9;
}

.MainImage {
    width: 64px;
    height: 64px;
    margin: 8px;
}
`