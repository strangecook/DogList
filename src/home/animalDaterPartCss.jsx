import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px;
  background-color: #f7f7f7;
  font-family: 'Nanum Gothic', sans-serif; /* 글로벌 폰트 적용 */
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
`;

export const Card = styled.div`
  position: relative;
  background: white;
  border-radius: 12px; /* 모서리 둥글게 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* 그림자 더 크게 */
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* 그림자 더 크게 */
  }

  &:hover .hide-on-hover {
    opacity: 0;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Dropdown = styled.select`
  padding: 10px;
  margin: 0 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

export const SearchBar = styled.input`
  padding: 10px;
  margin: 0 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  width: 90%;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;
export const SearchButton  = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 1em;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* 4:3 비율 */
  background-color: #f7f7f7; /* 배경색 추가 */
  border-bottom: 1px solid #e0e0e0; /* 밑줄 추가 */
`;

export const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  object-position: center; /* 이미지를 가운데로 배치 */
  border-radius: 12px 12px 0 0; /* 이미지 모서리 둥글게 */
`;

export const CardContentTopLeft = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* 텍스트 그림자 강화 */
  transition: opacity 0.2s ease-in-out;
`;

export const CardContentBottomRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  text-align: right;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.8em; /* 폰트 크기 약간 더 크게 */
  font-weight: 700; /* 폰트 굵게 */
  font-family: 'Nanum Gothic', sans-serif; /* 폰트 적용 */
`;

export const Text = styled.p`
  margin: 0;
  font-size: 1.2em;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: black;
  color: #f5f5f5; /* 텍스트 색상을 밝은 회색으로 변경 */
  font-family: 'Nanum Gothic', sans-serif; /* 폰트 적용 */
`;


