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
  box-sizing: border-box;

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

  .menu-trigger {
    display: inline-block;
  }

  @media (max-width: 768px) {
    .naviDivCenter, .naviDivRight {
      display: none;
    }

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

export const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ProfileButtonHover = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px 10px 0px 0px;
  color: white;
  width: 180px;
  justify-content: flex-start;
  overflow: hidden;
`;

export const UserName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;

export const MenuTrigger = styled.div`
  display: inline-block;
  width: 44px;
  height: 40px;
  position: relative;
  cursor: pointer;

  span {
    display: inline-block;
    width: 100%;
    height: 4px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 0;
    transition: all 0.4s;
  }

  span:nth-of-type(1) {
    top: 0;
  }

  span:nth-of-type(2) {
    top: 18px;
  }

  span:nth-of-type(3) {
    bottom: 0;
  }

  &.active-1 span:nth-of-type(1) {
    transform: translateY(20px) rotate(-45deg);
  }

  &.active-1 span:nth-of-type(2) {
    opacity: 0;
  }

  &.active-1 span:nth-of-type(3) {
    transform: translateY(-20px) rotate(45deg);
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 24px; /* Adjusted height to match the overall layout */

    span {
      height: 2px; /* Adjusted height for smaller screen */
    }

    span:nth-of-type(1) {
      top: 0;
    }

    span:nth-of-type(2) {
      top: 10px; /* Adjusted position for middle bar */
    }

    span:nth-of-type(3) {
      top: 20px; /* Adjusted position for bottom bar */
      bottom: auto; /* Reset bottom property to ensure proper positioning */
    }

    &.active-1 span:nth-of-type(1) {
      transform: translateY(10px) rotate(-45deg); /* Adjusted transformation */
    }

    &.active-1 span:nth-of-type(3) {
      transform: translateY(-10px) rotate(45deg); /* Adjusted transformation */
    }
  }
`;


export const MenuSpan = styled.span`
  display: inline-block;
  width: 100%;
  height: 4px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  left: 0;
  transition: all 0.4s;
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100%;
  background-color: #272527;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease;
  z-index: 1001;
  padding-top: 60px;
  display: flex;
  flex-direction: column;

  &.open {
    right: 0;
  }
`;

export const MobileMenuItem = styled.div`
  padding: 10px 20px;
  color: white;
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #4caf50;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
