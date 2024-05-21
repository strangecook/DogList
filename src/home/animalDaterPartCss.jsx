import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  font-family: Arial, sans-serif;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const Title = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.5em;
  color: #333;
`;

export const Text = styled.p`
  margin: 0 0 10px 0;
  color: #666;
  font-size: 0.9em;
`;
