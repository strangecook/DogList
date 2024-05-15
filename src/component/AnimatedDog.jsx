import React from 'react';
import styled, { keyframes } from 'styled-components';

// 회전 애니메이션 키프레임
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 스피너를 감싸는 컨테이너 스타일
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// 스피너 모양 스타일
const Spinner = styled.div`
  border: 5px solid #f3f3f3; /* 회전 원의 테두리 색 */
  border-top: 5px solid #3498db; /* 회전 원의 윗면 색 */
  border-radius: 50%; /* 원형 모양 */
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 2s linear infinite; /* 회전 애니메이션 적용 */
`;

// 로딩창 컴포넌트
const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
