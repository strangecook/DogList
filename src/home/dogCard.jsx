import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { Card, ImageContainer, Image, CardContentTopLeft, Title, Text } from './animalDaterPartCss';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  color: #f5f5f5;
  border-radius: 8px;
  padding: 10px; /* 내부 여백 추가 */
  box-sizing: border-box;
`;

const BarContainer = styled.div`
  width: 100%; /* 간격을 주기 위해 width를 줄임 */
  margin: 3px 0;
  font-family: 'Nanum Gothic', sans-serif;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  display: flex; /* 이모티콘과 텍스트를 나란히 배치 */
  align-items: center;
  font-size: 0.9em; /* 텍스트 크기 줄이기 */
`;

const Emoji = styled.span`
  margin-right: 8px; /* 이모티콘과 텍스트 사이의 간격 */
`;

const BarWrapper = styled.div`
  width: 100%;
  background-color: #333; /* 바 배경색 추가 */
  border-radius: 5px;
  overflow: hidden;
  margin-top: 3px;
`;

const Bar = styled.div`
  width: ${props => props.width};
  height: 12px;
  background-color: ${props => {
    const numericWidth = parseFloat(props.width);
    if (props.reverse) {
      if (numericWidth <= 40) return '#4caf50'; // Green (0%-50%)
      if (numericWidth <= 75) return '#FFC924'; // Yellow (51%-75%)
      return '#FF4742'; // Red (76%-100%)
    } else {
      if (numericWidth <= 20) return '#FF4742'; // Red
      if (numericWidth <= 50) return '#FFC924'; // Yellow
      return '#4caf50'; // Green
    }
  }};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: width 0.5s ease-in-out; /* 채워지는 애니메이션 */
`;

const BarSection = styled.div`
  width: 100%; /* 간격을 주기 위해 width를 줄임 */
  margin: 5px 0; /* 상하 간격을 최소화 */
  padding: 0 5px; /* 좌우 패딩을 추가 */
`;

const FixedImageContainer = styled(ImageContainer)`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;


export const DogCard = forwardRef(({ breed }, ref) => {
  const [hovered, setHovered] = useState(false);

  // 특성 평균 계산
  const averageChildFriendly = (breed.goodWithYoungChildren + breed.affectionWithFamily) / 2;
  const averageDogFriendly = (breed.goodWithOtherDogs + breed.opennessToStrangers ) / 2;
  const averageTrainability = (breed.trainabilityLevel + breed.adaptabilityLevel) / 2;
  const averageEnergy = (breed.energyLevel + breed.playfulnessLevel) / 2;
  const averageGroomingLevel = (breed.groomingLevel + breed.sheddingLevel) / 2;

  return (
    <Card 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
    >

      <FixedImageContainer>
        <Image src={breed.image?.url} alt={breed.englishName} />
        <Overlay style={{ opacity: hovered ? 1 : 0 }}>
          <BarSection>
            <BarContainer>
              <Emoji>👶</Emoji>
              <Text>어린 자녀와 가족에게 적합성 (평균)</Text>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageChildFriendly * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🐕</Emoji>
              <Text>다른 반려견과 잘 어울림 (평균)</Text>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageDogFriendly * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🎓</Emoji>
              <Text>훈련 가능성 (평균)</Text>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageTrainability * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>⚡</Emoji>
              <Text>에너지 수준 (평균)</Text>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageEnergy * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🪮</Emoji>
              <Text>털 관리 및 빠짐 정도 (평균)</Text>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageGroomingLevel * 20}%`} reverse />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>😃</Emoji>
              <Text>기질: {breed.temperament}</Text>
            </BarContainer>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>📏</Emoji>
              <Text>크기: {breed.size}</Text>
            </BarContainer>
          </BarSection>
        </Overlay>
      </FixedImageContainer>
      <CardContentTopLeft className="hide-on-hover">
        <Title>{breed.koreanName}</Title>
      </CardContentTopLeft>
    </Card>
  );
});