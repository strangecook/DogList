import React from 'react';
import styled, { keyframes } from 'styled-components';

const run = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -600px 0;
  }
`;

const progress = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Dog = styled.div`
  width: 100px;
  height: 100px;
  background-image: url('https://www.animatedimages.org/data/media/202/animated-dog-image-0166.gif');
  background-size: 600px 100px;
  animation: ${run} 1s steps(6) infinite;
`;

const LoadingBarWrapper = styled.div`
  width: 80%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
`;

const LoadingBar = styled.div`
  height: 100%;
  background-color: #4caf50;
  animation: ${progress} 3s linear infinite;
`;

const Loading = () => (
  <LoaderWrapper>
    <Dog />
    <LoadingBarWrapper>
      <LoadingBar />
    </LoadingBarWrapper>
  </LoaderWrapper>
);

export default Loading;