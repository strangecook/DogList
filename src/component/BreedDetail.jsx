// src/components/BreedDetail.js

import React, { useEffect, useState, useCallback } from 'react';
import Slider from 'react-slick';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import useStore from '../store/useStore';
import BreedHelmet from './BreedHelmet';
import BarItem from './BarItem'; // Import BarItem
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

const fetchImagesFromStorage = async (breedName) => {
  try {
    const formattedBreedName = breedName.replace(/ /g, '_');
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
      return [];
    }
  } catch (error) {
    console.error(`Error fetching images from Storage for breed ${breedName}:`, error);
    return [];
  }
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "rgba(0, 0, 0, 0.5)", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "rgba(0, 0, 0, 0.5)", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
};

const BreedDetail = () => {
  const selectedBreed = useStore(state => state.selectedBreed);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const fetchImages = useCallback(async () => {
    if (selectedBreed) {
      setLoading(true);
      const imageUrls = await fetchImagesFromStorage(selectedBreed.englishName);
      setImages(imageUrls);
      setLoading(false);
    }
  }, [selectedBreed]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchImages();
  }, [fetchImages]);

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

  if (!selectedBreed) {
    return <DetailContainer>해당 강아지의 정보를 찾을 수 없습니다.</DetailContainer>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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
