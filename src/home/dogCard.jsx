import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { Card, ImageContainer, Image, CardContentTopLeft, Title, Text, CardContentBottomRight } from './animalDaterPartCss';

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
  position: relative; /* 툴팁을 위한 상대 위치 */
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
  position: relative; /* 툴팁을 위한 상대 위치 */
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

const InfoIcon = styled.span`
  margin-left: 8px; /* 바와 이모티콘 사이의 간격 */
  cursor: pointer;
  position: relative;
  display: inline-block;
  background: rgba(255, 255, 255, 0.3);; /* 흰색 배경 추가 */
  padding: 2px 5px;
  border-radius: 20px;
  z-index: 10;

  &:hover::after {
    content: "${props => props.tooltip}";
    position: absolute;
    top: -5px;
    left: 105%;
    transform: translateX(0);
    background: rgba(0, 0, 0, 0.9); /* 배경색을 더 진하게 */
    color: #fff;
    padding: 8px;
    border-radius: 5px;
    font-size: 0.8em;
    white-space: pre-wrap; /* 줄바꿈 허용 */
    width: 250px; /* 최대 너비 설정 */
    z-index: 100; /* z-index 설정 */
  }
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
  const averageDogFriendly = (breed.goodWithOtherDogs + breed.opennessToStrangers) / 2;
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
              <Text>가족과의 친화도</Text>
              <InfoIcon tooltip={`이 값은 강아지가 어린 자녀와 얼마나 잘 지내는지와 가족과의 애정 수준을 합산한 후 평균을 구한 것입니다. 높은 값일수록 강아지가 가족과 특히 어린 자녀들과 잘 어울리는 경향이 있습니다.`}>ℹ️</InfoIcon>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageChildFriendly * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🐕</Emoji>
              <Text>친화력</Text>
              <InfoIcon tooltip={`이 값은 강아지가 다른 반려견과 얼마나 잘 어울리는지와 낯선 사람에 대한 개방성을 합산한 후 평균을 구한 것입니다. 높은 값일수록 강아지가 다른 반려견 및 사람들과 잘 어울리는 경향이 있습니다.`}>ℹ️</InfoIcon>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageDogFriendly * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🎓</Emoji>
              <Text>훈련 가능성</Text>
              <InfoIcon tooltip={`이 값은 강아지의 훈련 가능성과 환경 변화에 대한 적응성을 합산한 후 평균을 구한 것입니다. 높은 값일수록 강아지가 훈련하기 쉽고 새로운 환경에 잘 적응하는 경향이 있습니다.`}>ℹ️</InfoIcon>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageTrainability * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>⚡</Emoji>
              <Text>에너지 수준</Text>
              <InfoIcon tooltip={`이 값은 강아지의 에너지 수준과 장난기 수준을 합산한 후 평균을 구한 것입니다. 높은 값일수록 강아지가 에너지가 넘치고 장난기 많은 경향이 있습니다.`}>ℹ️</InfoIcon>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageEnergy * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🪮</Emoji>
              <Text>털 관리 빠짐 정도</Text>
              <InfoIcon tooltip={`이 값은 강아지의 털 관리 필요성 및 털 빠짐 정도를 합산한 후 평균을 구한 것입니다. 높은 값일수록 강아지의 털 관리가 더 많이 필요하고, 털이 많이 빠지는 경향이 있습니다.`}>ℹ️</InfoIcon>
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
      <CardContentBottomRight>
      <Text style={{ fontSize: '1.2em', margin: 0, background: 'rgba(0, 0, 0, 0.5)', padding: '5px 10px', borderRadius: '8px' }}>{breed.englishName}</Text>
      </CardContentBottomRight>
    </Card>
  );
});