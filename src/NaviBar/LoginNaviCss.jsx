import styled from 'styled-components';

export const NavBar = styled.div`
  position: absolute; /* 상단에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  background-color: #272527;
  box-sizing: border-box; /* 패딩을 포함한 너비 계산 */

  .naviDivLeft, .naviDivCenter, .naviDivRight {
    flex: 1; 
    display: flex;
    align-items: center;
  }

  .naviDivCenter {
    justify-content: center;
  }

  .naviDivRight {
    justify-content: flex-end; 
    margin-right: 40px;
  }

  .navTitle {
    color: white;
    font-size: 36px;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease;
    margin-left: 10px;
  }

  .navTitle:hover {
    color: #6CC18E;
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
    bottom: -5px;
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  .MainImage {
    width: 40px;
    height: 40px;
    margin: 8px;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
    transition: filter 0.2s ease;
  }

  .mainHoverImageSpan .MainImage {
    filter: invert(65%) sepia(50%) saturate(300%) hue-rotate(90deg) brightness(95%) contrast(95%);
  }

  .userMenuContainer {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
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

export const UserMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0px 0px 10px 10px;
  overflow: hidden;
  z-index: 1000;
  padding: 10px 0;
  width: 200px;
`;

export const UserMenuItem = styled.div`
  padding: 10px 20px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ProfileButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px 10px 0px 0px;
  color: white;
  background-color: #272527;
  width: 180px;
  justify-content: flex-start;
  overflow: hidden;
`;

export const ProfileButtonHover = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px 10px 0px 0px;
  background-color: white;
  color: black;
  width: 180px;
  justify-content: flex-start;
  overflow: hidden;
`;

export const UserName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px; /* 닉네임의 최대 너비를 설정 */
`;
