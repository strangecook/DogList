import React from 'react';
import styled from 'styled-components';

const DescriptionSection = () => {
  return (
    <DescriptionContainer>
      <DescriptionGrid>
        <QuoteCard>
          <Quote>
            "자신에게 맞는 강아지를 선택하는 것은 가족을 선택하는 일입니다. 올바른 선택은 당신과 반려견 모두의 행복을 보장합니다."
          </Quote>
          <Source>- 반려동물 입양 가이드</Source>
        </QuoteCard>
        <QuoteCard>
          <Quote>
            "강아지는 단순한 반려동물이 아닙니다. 그들은 당신의 삶을 더 풍요롭게 하고, 매 순간을 특별하게 만들어줍니다."
          </Quote>
          <Source>- 애니멀 헬스 재단</Source>
        </QuoteCard>
      </DescriptionGrid>
    </DescriptionContainer>
  );
};

export default DescriptionSection;

const DescriptionContainer = styled.div`
  padding: 40px 20px;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const DescriptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const QuoteCard = styled.div`
  z-index: 10;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    /* background-color: #e0f7fa; */
  }
`;

const Quote = styled.p`
  font-size: 1.2em;
  font-style: italic;
  color: #333;
  margin-bottom: 10px;
  transition: color 0.3s ease, font-size 0.3s ease;

  ${QuoteCard}:hover & {
    /* color: #00796b; */
    /* font-size: 1.3em; */
  }
`;

const Source = styled.p`
  font-size: 1em;
  color: #777;
  margin-top: 0;
  transition: color 0.3s ease;

  ${QuoteCard}:hover & {
    /* color: #004d40; */
  }
`;
