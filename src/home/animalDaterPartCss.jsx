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
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* 4:3 비율 */
  background-color: #f7f7f7; /* 배경색 추가 */
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
`;

export const CardContentTopLeft = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
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
  font-size: 1.5em;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 0.9em;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
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
