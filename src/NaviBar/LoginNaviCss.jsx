import styled from 'styled-components';

export const NavBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  background-color: #272527;

  .naviDivLeft {
    display: flex;
    align-items: center;
    flex: 1; /* 왼쪽 여유 공간 확보 */
  }

  .naviDivCenter {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1; /* 중앙에 오게 하기 위해 flex 사용 */
  }

  .naviDivRight {
    display: flex;
    align-items: center;
    flex: 1; /* 오른쪽 여유 공간 확보 */
    justify-content: flex-end; /* 오른쪽 끝으로 정렬 */
    margin-right: 40px;
  }

  .navTitle {
    color: white;
    font-size: 36px; /* 크기를 작게 설정 */
    font-weight: bold; /* 글꼴 굵게 설정 */
    text-decoration: none;
    transition: color 0.3s ease; /* 호버 시 색상 변경을 위한 전환 효과 */
    margin-left: 10px;
  }

  .navTitle:hover {
    color: #6CC18E; /* 호버 시 색상 변경 */
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
    width: 60px; /* 크기 작게 조정 */
    height: 60px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  .MainImage {
    width: 40px; /* 크기 작게 조정 */
    height: 40px;
    margin: 8px;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
    transition: filter 0.2s ease; /* 호버 시 색상 변경을 위한 전환 효과 */
  }

  .mainHoverImageSpan .MainImage {
    filter: invert(65%) sepia(50%) saturate(300%) hue-rotate(90deg) brightness(95%) contrast(95%); /* 호버 시 배경색과 어울리는 색상으로 변경 */
  }

  @media (max-width: 768px) {
    padding: 10px 20px;

    .navTitle {
      font-size: 24px;
    }

    .navLink {
      font-size: 16px;
    }

    .naviLoginButton, .naviLoginButtonHovered {
      padding: 8px 16px;
      font-size: 14px;
    }

    .mainImageSpan, .mainHoverImageSpan {
      width: 50px;
      height: 50px;
    }

    .MainImage {
      width: 30px;
      height: 30px;
    }
  }
`;
