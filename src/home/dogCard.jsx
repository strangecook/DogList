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
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
`;

const BarContainer = styled.div`
  width: 100%;
  margin: 3px 0;
  font-family: 'Nanum Gothic', sans-serif;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 0.9em;
  position: relative;
`;

const Emoji = styled.span`
  margin-right: 8px;
`;

const BarWrapper = styled.div`
  width: 100%;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 3px;
  position: relative;
`;

const Bar = styled.div`
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

const InfoIcon = styled.span`
  margin-left: 8px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  background: rgba(255, 255, 255, 0.3);
  padding: 2px 5px;
  border-radius: 20px;
  z-index: 10;

  &:hover::after {
    content: "${props => props.tooltip}";
    position: absolute;
    top: -5px;
    left: 105%;
    transform: translateX(0);
    background: rgba(0, 0, 0, 0.9);
    color: #fff;
    padding: 8px;
    border-radius: 5px;
    font-size: 0.8em;
    white-space: pre-wrap;
    width: 250px;
    z-index: 100;
  }
`;

const BarSection = styled.div`
  width: 100%;
  margin: 5px 0;
  padding: 0 5px;
`;

const FixedImageContainer = styled(ImageContainer)`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

export const DogCard = forwardRef(({ breed, onClick }, ref) => {
  const [hovered, setHovered] = useState(false);

  const averageChildFriendly = (breed.goodWithYoungChildren + breed.affectionWithFamily) / 2;
  const averageDogFriendly = (breed.goodWithOtherDogs + breed.opennessToStrangers) / 2;
  const averageTrainability = (breed.trainabilityLevel + breed.adaptabilityLevel) / 2;
  const averageEnergy = (breed.energyLevel + breed.playfulnessLevel) / 2;
  const averageGroomingLevel = (breed.groomingLevel + breed.sheddingLevel) / 2;

  return (
    <Card 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(breed)}
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
              <Bar width={`${averageGroomingLevel * 20}%`} reverse="true" />
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
