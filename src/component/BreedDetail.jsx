// src/components/BreedDetail.js

import React, { useEffect, useState, useCallback } from 'react';
import Slider from 'react-slick';
import useStore from '../store/useStore';
import BreedHelmet from './BreedHelmet';
import BarItem from './BarItem';
import { fetchImagesFromStorage, fetchAndStoreBreeds, getBreedsData } from '../dataPatch/fetchAndStoreBreeds';
import { sliderSettings } from './SliderComponents';
import {
  DetailContainer,
  Section,
  SectionTitle,
  Image,
  SliderContainer,
  SingleImageContainer,
  LoaderDiv,
  Loader,
  BarSection
} from './BreedDetailStyles';

const BreedDetail = () => {
  const selectedBreed = useStore(state => state.selectedBreed);
  const setSelectedBreed = useStore(state => state.setSelectedBreed);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [error, setError] = useState(null);

  // 페이지가 로드될 때 로컬 스토리지에서 selectedBreed 값을 불러오는 로직
  useEffect(() => {
    const storedBreed = localStorage.getItem('selectedBreed');
    if (storedBreed) {
      setSelectedBreed(JSON.parse(storedBreed));
    }
  }, [setSelectedBreed]);

  // selectedBreed 값을 로컬 스토리지에 저장하는 로직
  useEffect(() => {
    if (selectedBreed) {
      localStorage.setItem('selectedBreed', JSON.stringify(selectedBreed));
    }
  }, [selectedBreed]);

  const fetchImages = useCallback(async () => {
    if (selectedBreed) {
      setLoading(true);
      const imageUrls = await fetchImagesFromStorage(selectedBreed.englishName);
      setImages(imageUrls);
      setLoading(false);
    }
  }, [selectedBreed]);

  const initializeBreedsData = useCallback(async () => {
    const breedsData = getBreedsData();
    if (!breedsData) {
      try {
        const newBreedsData = await fetchAndStoreBreeds();
        if (newBreedsData) {
          fetchImages();
        } else {
          setError('데이터를 불러오는 데 문제가 발생했습니다.');
          setLoading(false);
        }
      } catch (error) {
        setError('데이터를 불러오는 데 문제가 발생했습니다.');
        setLoading(false);
      }
    } else {
      fetchImages();
    }
  }, [fetchImages]);

  useEffect(() => {
    window.scrollTo(0, 0);
    initializeBreedsData();
  }, [initializeBreedsData]);

  useEffect(() => {
    if (images.length > 0) {
      let loadedCount = 0;
      images.forEach((url) => {
        const img = document.createElement('img');
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setAllImagesLoaded(true);
          }
        };
      });
    }
  }, [images]);

  if (error) {
    return <DetailContainer>{error}</DetailContainer>;
  }

  if (!selectedBreed) {
    return <DetailContainer>해당 강아지의 정보를 찾을 수 없습니다.</DetailContainer>;
  }

  return (
    <DetailContainer>
      <BreedHelmet breed={selectedBreed} images={images} />
      {loading || !allImagesLoaded ? (
        <LoaderDiv>
          <Loader />
        </LoaderDiv>
      ) : images.length > 1 ? (
        <SliderContainer>
          <Slider {...sliderSettings}>
            {images.map((url, index) => (
              <div key={index}>
                <Image src={url} alt={`${selectedBreed.englishName} ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </SliderContainer>
      ) : (
        images.length === 1 && (
          <SingleImageContainer>
            <Image src={images[0]} alt={selectedBreed.englishName} />
          </SingleImageContainer>
        )
      )}
      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <ul>
          <li><strong>품종 그룹: </strong>{selectedBreed.breedGroup}</li>
          <li><strong>털 길이: </strong>{selectedBreed.coatLength}</li>
          <li><strong>털 타입: </strong>{selectedBreed.coatType}</li>
          <li><strong>키: </strong>{selectedBreed.height}</li>
          <li><strong>체중: </strong>{selectedBreed.weight}</li>
          <li><strong>수명: </strong>{selectedBreed.lifeExpectancy}</li>
          <li><strong>기원: </strong>{selectedBreed.origin}</li>
        </ul>
      </Section>
      <Section>
        <SectionTitle>성격 및 훈련</SectionTitle>
        <BarSection>
          {renderBars(selectedBreed)}
        </BarSection>
      </Section>
      <Section>
        <SectionTitle>추가 정보</SectionTitle>
        <p><strong>운동: </strong>{selectedBreed.exercise}</p>
        <p><strong>영양: </strong>{selectedBreed.nutrition}</p>
        <p><strong>훈련: </strong>{selectedBreed.training}</p>
      </Section>
      <Section>
        <SectionTitle>설명</SectionTitle>
        <p>{selectedBreed.description}</p>
      </Section>
    </DetailContainer>
  );
};

const renderBars = (breed) => (
  <>
    <BarItem emoji="🌟" label="적응력" level={breed.adaptabilityLevel} />
    <BarItem emoji="❤️" label="가족과의 애정" level={breed.affectionWithFamily} />
    <BarItem emoji="🐾" label="다른 개와의 친화력" level={breed.goodWithOtherDogs} />
    <BarItem emoji="👶" label="아이와의 친화력" level={breed.goodWithYoungChildren} />
    <BarItem emoji="🐕" label="타인에 대한 개방성" level={breed.opennessToStrangers} />
    <BarItem emoji="🛡️" label="보호 본능" level={breed.guardProtectiveInstinct} />
    <BarItem emoji="⚡" label="에너지 수준" level={breed.energyLevel} />
    <BarItem emoji="🎮" label="장난기" level={breed.playfulnessLevel} />
    <BarItem emoji="🧠" label="정신적 자극 필요도" level={breed.needsMentalStimulation} />
    <BarItem emoji="🎓" label="훈련 가능성" level={breed.trainabilityLevel} />
    <BarItem emoji="🪮" label="털 빠짐 정도" level={breed.sheddingLevel} reverse={true} />
    <BarItem emoji="🧼" label="그루밍 필요도" level={breed.groomingLevel} reverse={true} />
    <BarItem emoji="🗣️" label="짖는 수준" level={breed.barkingLevel} reverse={true} />
    <BarItem emoji="💧" label="침 흘림 수준" level={breed.droolingLevel} reverse={true} />
  </>
);

export default BreedDetail;
