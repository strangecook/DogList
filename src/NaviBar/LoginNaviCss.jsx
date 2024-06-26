import styled from 'styled-components';

export const NavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #272527;

  .naviDivLeft {
    display: flex;
    align-items: center;
  }

  .naviDivCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .naviDivRight {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .navTitle {
    color: white;
    font-size: 36px; /* 크기를 크게 설정 */
    margin-left: 15px;
    text-decoration: none;
  }

  .navLink {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-size: 18px;
    position: relative;
  }

  .navLink:hover, .navLink.active {
    color: #4caf50;
  }

  .navLink.active::after {
    content: '';
    position: absolute;
    bottom: -5px; /* 위치 조정 */
    left: 0;
    width: 100%;
    height: 2px;
    background-color: white;
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
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .naviLoginButtonHovered {
    background-color: white;
    color: #4caf50;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

  .MainImage {
    width: 64px;
    height: 64px;
    margin: 8px;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
    transition: filter 0.2s ease; /* 호버 시 색상 변경을 위한 전환 효과 */
  }

  .mainHoverImageSpan .MainImage {
    filter: invert(65%) sepia(50%) saturate(300%) hue-rotate(90deg) brightness(95%) contrast(95%); /* 호버 시 배경색과 어울리는 색상으로 변경 */
}
`;
