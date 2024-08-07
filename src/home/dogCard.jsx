// src/components/DogCard.js
import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import useStore from '../store/useStore';
import { Card, ImageContainer, Image, CardContentTopLeft, Text, CardContentBottomRight, SingleLineText } from './animalDaterPartCss';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import { Link } from 'react-router-dom';

const fetchImagesFromStorage = async (breedName) => {
  try {
    const formatBreedName = (breedName) => {
      return breedName.replace(/ /g, '_');
    };
    const formattedBreedName = formatBreedName(breedName);
    const folderRef = ref(storage, `dog/${formattedBreedName}`);
    const fileList = await listAll(folderRef);

    if (fileList.items.length > 0) {
      const imageUrls = await Promise.all(
        fileList.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        })
      );
      return imageUrls;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching images from Storage for breed ${breedName}:`, error);
    return null;
  }
};

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

  @media (max-width: 768px) {
    background: rgba(0, 0, 0, 0.8);
    opacity: ${props => (props.showContent ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
    padding: 5px;
    overflow: hidden;
    justify-content: flex-start;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
  }
`;

const Emoji = styled.span`
  margin-right: 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const BarWrapper = styled.div`
  width: 100%;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 3px;
  position: relative;
  @media (max-width: 768px) {
    height: 4px;
  }
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

  @media (max-width: 768px) {
    height: 4px;
  }
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
  @media (max-width: 768px) {
    display: none;
  }

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
  box-sizing: border-box;

  &.hide-on-mobile {
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 2px 5px;
    margin: 2px 0;
    display: flex;
    height: 12px;
  }
`;

const FixedImageContainer = styled(ImageContainer)`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

const DetailButton = styled(Link)`
  display: inline-block;
  width: 100%;
  margin: 3px auto;
  background-color: #4caf50;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
`;

const DogCard = forwardRef(({ breed, onClick }, ref) => {
  const [hovered, setHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const setSelectedBreed = useStore(state => state.setSelectedBreed);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      const images = await fetchImagesFromStorage(breed.englishName);
      if (images && images.length > 0) {
        setImageUrl(images[0]);
      }
      setLoading(false);
    };

    fetchImage();
  }, [breed.englishName]);

  const handleCardClick = (breed) => {
    if (window.innerWidth <= 768) {
      setShowContent(!showContent);
    } else {
      setSelectedBreed(breed);
      onClick(breed);
    }
  };

  useEffect(() => {
    console.log(showContent)
  }, [showContent])

  const handleDetailButtonClick = () => {
    setSelectedBreed(breed);
  };

  const averageChildFriendly = breed.affectionWithFamily;
  const averageDogFriendly = breed.goodWithOtherDogs;
  const averageTrainability = breed.trainabilityLevel;
  const averageEnergy = breed.energyLevel;
  const averageGroomingLevel = (breed.groomingLevel + breed.sheddingLevel) / 2;

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => handleCardClick(breed)}
      ref={ref}
    >
      <FixedImageContainer>
        {loading ? (
          <ClipLoader color="#4caf50" size={50} />
        ) : (
          imageUrl && <Image src={imageUrl} alt={breed.englishName} dog breed/>
        )}
        <Overlay className={showContent ? "" : "mobile-flex"} style={{ opacity: hovered ? 1 : 0 }} showContent={showContent}>
          <BarSection>
            <BarContainer>
              <Emoji>👶</Emoji>
              <Text>가족과의 친화도</Text>
              <InfoIcon tooltip={`이 값은 강아지가 가족과의 애정 수준을 평가한 값입니다. 높은 값일수록 강아지가 가족과 잘 어울리는 경향이 있습니다.`}>ℹ️</InfoIcon>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageChildFriendly * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🐕</Emoji>
              <Text>친화력</Text>
              <InfoIcon tooltip={`이 값은 강아지가 다른 반려견과 얼마나 잘 어울리는지 평가한 값입니다. 높은 값일수록 강아지가 다른 반려견들과 잘 어울리는 경향이 있습니다.`}>ℹ️</InfoIcon>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageDogFriendly * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🎓</Emoji>
              <Text>훈련 가능성</Text>
              <InfoIcon tooltip={`이 값은 강아지의 훈련 가능성을 평가한 값입니다. 높은 값일수록 강아지가 훈련하기 쉬운 경향이 있습니다.`}>ℹ️</InfoIcon>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageTrainability * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>⚡</Emoji>
              <Text>에너지 수준</Text>
              <InfoIcon tooltip={`이 값은 강아지의 에너지 수준을 평가한 값입니다. 높은 값일수록 강아지가 에너지가 넘치는 경향이 있습니다.`}>ℹ️</InfoIcon>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageEnergy * 20}%`} />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🪮</Emoji>
              <Text>털 관리 및 빠짐</Text>
              <InfoIcon tooltip={`이 값은 강아지의 털 관리 필요성 및 털 빠짐 정도를 합산한 후 평균을 구한 것입니다. 높은 값일수록 강아지의 털 관리가 더 많이 필요하고, 털이 많이 빠지는 경향이 있습니다.`}>ℹ️</InfoIcon>
            </BarContainer>
            <BarWrapper>
              <Bar width={`${averageGroomingLevel * 20}%`} reverse="true" />
            </BarWrapper>
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>📏</Emoji>
              <Text>크기: {breed.size}</Text>
            </BarContainer>
          </BarSection>
          {
            showContent &&
            <BarSection>
              <BarContainer>
                <DetailButton to={`/breeds/${breed.englishName.toLowerCase()}`} onClick={handleDetailButtonClick}>
                  자세한 정보
                </DetailButton>
              </BarContainer>
            </BarSection>
          }
        </Overlay>
      </FixedImageContainer>
      <CardContentTopLeft className="hide-on-hover">
      </CardContentTopLeft>
      {
        showContent ||
        <CardContentBottomRight>
          <SingleLineText>
            {breed.koreanName}
            <span>({breed.englishName})</span>
          </SingleLineText>
        </CardContentBottomRight>
      }

    </Card>
  );
});

export default DogCard;
