// src/components/BreedDetailStyles.js

import styled from 'styled-components';

export const DetailContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 20px auto;
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const SliderContainer = styled.div`
  .slick-slide img {
    display: block;
    margin: auto;
  }
`;

export const SingleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export const LoaderDiv = styled.div`
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const BarContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 120px 1fr;
  gap: 8px;
  align-items: center;
  margin: 8px 0;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 0.8em;
`;

export const Emoji = styled.span`
  text-align: center;
`;

export const Label = styled.span`
  text-align: left;
  white-space: nowrap; 
`;

export const BarWrapper = styled.div`
  width: 100%;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
`;

export const Bar = styled.div`
  width: ${props => props.width};
  height: 12px;
  background-color: ${props => {
    const numericWidth = parseFloat(props.width);
    if (props.reverse === "true") {
      if (numericWidth <= 40) return '#4caf50';
      if (numericWidth <= 75) return '#FFC924';
      return '#FF4742';
    } else {
      if (numericWidth <= 20) return '#FF4742';
      if (numericWidth <= 50) return '#FFC924';
      return '#4caf50';
    }
  }};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: width 0.5s ease-in-out;
`;

export const BarSection = styled.div`
  width: 100%;
  margin: 10px 0;
  padding: 0 5px;
`;
