import styled from 'styled-components';

export const Container = styled.div`
  padding: 80px;
  background-color: #f7f7f7;
  font-family: 'Nanum Gothic', sans-serif;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }
`;

export const Card = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:hover .hide-on-hover {
    opacity: 0;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
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

export const SearchBarContainer = styled.div`
  position: relative; // 추가된 부분
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: row;
  }
`;

export const SearchBar = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  width: 100%;
  
  &:focus {
    border-color: #4caf50;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 70%;
    border-radius: 8px 0 0 8px;
    font-size: 0.8em;

    &::placeholder {
      font-size: 0.8em;
    }
  }
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    border-radius: 0 8px 8px 0;
    margin-left: 0;
    width: 30%;
    font-size: 0.8em;
  }
`;

export const AutocompleteList = styled.ul`
  position: absolute; // 변경된 부분
  top: 100%; // 변경된 부분
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0 0 8px 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const AutocompleteItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }

  @media (max-width: 768px) {
    font-size: 0.6em;
    padding: 8px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e0e0e0;
`;

export const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  object-position: center;
  border-radius: 12px 12px 0 0;
`;

export const CardContentTopLeft = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
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
  font-size: 1.8em;
  font-weight: 700;
  font-family: 'Nanum Gothic', sans-serif;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 1.2em;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: black;
  color: #f5f5f5;
  font-family: 'Nanum Gothic', sans-serif;
  @media (max-width: 768px) {
    font-size: 0.6em;
  }
`;

export const ConsonantFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ConsonantButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: ${props => (props.selected ? '#4caf50' : '#9e9e9e')};
  border: none;
  border-radius: 8px;
  margin: 0 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #4caf50;
  }
`;

export const ThemeFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ThemeButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: ${props => (props.selected ? '#4caf50' : '#9e9e9e')};
  border: none;
  border-radius: 8px;
  margin: 0 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #4caf50;
  }
`;

export const FilterInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 20px;
  }
`;

export const FilterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1em;
  color: #333;
  font-weight: bold;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: row;
    width: 70%;
    font-size: 0.8em;
  }
`;

export const ResetButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #f44336;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 10%;
  
  &:hover {
    background-color: #d32f2f;
  }

  @media (max-width: 768px) {
    width: 55%;
    margin-left: 10px;
    font-size: 0.8em;
  }
`;

export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 10px 20px;
  font-size: 1.2em;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 30%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #388e3c;
  }
`;

export const SingleLineText = styled(Text)`
  font-size: 1em;
  margin: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 0.6em;
    span {
      display: none;
    }
  }
`;
