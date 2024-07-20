import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet-async';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import useStore from '../store/useStore';

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 20px auto;
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const SliderContainer = styled.div`
  .slick-slide img {
    display: block;
    margin: auto;
  }
`;

const SingleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const LoaderDiv = styled.div`
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const BarContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 120px 1fr;
  gap: 8px;
  align-items: center;
  margin: 8px 0;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 0.8em;
`;

const Emoji = styled.span`
  text-align: center;
`;

const Label = styled.span`
  text-align: left;
`;

const BarWrapper = styled.div`
  width: 100%;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
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

const BarSection = styled.div`
  width: 100%;
  margin: 10px 0;
  padding: 0 5px;
`;

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

  useEffect(() => {
    window.scrollTo(0, 0);

    if (selectedBreed) {
      const fetchImages = async () => {
        setLoading(true);
        const imageUrls = await fetchImagesFromStorage(selectedBreed.englishName);
        setImages(imageUrls);
        setLoading(false);
      };
      fetchImages();
    }
  }, [selectedBreed]);

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
      <Helmet>
        <title>{selectedBreed.koreanName} ({selectedBreed.englishName}) - Dog List</title>
        <meta name="description" content={`당신에게 맞는 강아지를 찾고 있나요? ${selectedBreed.koreanName}은(는) ${selectedBreed.temperament} 성격을 가진 품종입니다. ${selectedBreed.breedGroup} 그룹에 속하며, 키: ${selectedBreed.height}, 체중: ${selectedBreed.weight}, 수명: ${selectedBreed.lifeExpectancy}. 지금 더 알아보세요!`} />
        <meta name="keywords" content={`강아지, 개 품종, ${selectedBreed.koreanName}, ${selectedBreed.englishName}, 반려동물, 애완견`} />
        <meta property="og:title" content={`${selectedBreed.koreanName} (${selectedBreed.englishName}) - Dog List`} />
        <meta property="og:description" content={`품종: ${selectedBreed.koreanName}. 이 품종은 ${selectedBreed.breedGroup} 그룹에 속하며, 키: ${selectedBreed.height}, 체중: ${selectedBreed.weight}, 성격: ${selectedBreed.temperament}. 더 알아보세요!`} />
        <meta property="og:image" content={images[0]} />
        <meta property="og:url" content={`https://www.doglist.info/breeds/${selectedBreed.englishName}`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://www.doglist.info/breeds/${selectedBreed.englishName}`} />
        <script type="application/ld+json">
          {`
        {
          "@context": "https://schema.org",
          "@type": "DogBreed",
          "name": "${selectedBreed.koreanName}",
          "alternateName": "${selectedBreed.englishName}",
          "image": "${images[0]}",
          "description": "${selectedBreed.description}",
          "breedGroup": "${selectedBreed.breedGroup}",
          "height": "${selectedBreed.height}",
          "weight": "${selectedBreed.weight}",
          "lifeExpectancy": "${selectedBreed.lifeExpectancy}",
          "origin": "${selectedBreed.origin}",
          "coatLength": "${selectedBreed.coatLength}",
          "coatType": "${selectedBreed.coatType}",
          "adaptabilityLevel": "${selectedBreed.adaptabilityLevel}",
          "affectionWithFamily": "${selectedBreed.affectionWithFamily}",
          "goodWithOtherDogs": "${selectedBreed.goodWithOtherDogs}",
          "goodWithYoungChildren": "${selectedBreed.goodWithYoungChildren}",
          "opennessToStrangers": "${selectedBreed.opennessToStrangers}",
          "guardProtectiveInstinct": "${selectedBreed.guardProtectiveInstinct}",
          "energyLevel": "${selectedBreed.energyLevel}",
          "playfulnessLevel": "${selectedBreed.playfulnessLevel}",
          "needsMentalStimulation": "${selectedBreed.needsMentalStimulation}",
          "trainabilityLevel": "${selectedBreed.trainabilityLevel}",
          "sheddingLevel": "${selectedBreed.sheddingLevel}",
          "groomingLevel": "${selectedBreed.groomingLevel}",
          "barkingLevel": "${selectedBreed.barkingLevel}",
          "droolingLevel": "${selectedBreed.droolingLevel}",
          "temperament": "${selectedBreed.temperament}"
        }
        `}
        </script>
      </Helmet>
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
          <BarContainer>
            <Emoji>🌟</Emoji>
            <Label>적응력:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.adaptabilityLevel * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>❤️</Emoji>
            <Label>가족과의 애정:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.affectionWithFamily * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🐾</Emoji>
            <Label>다른 개와의 친화력:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.goodWithOtherDogs * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>👶</Emoji>
            <Label>어린 아이와의 친화력:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.goodWithYoungChildren * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🐕</Emoji>
            <Label>타인에 대한 개방성:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.opennessToStrangers * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🛡️</Emoji>
            <Label>보호 본능:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.guardProtectiveInstinct * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>⚡</Emoji>
            <Label>에너지 수준:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.energyLevel * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🎮</Emoji>
            <Label>장난기:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.playfulnessLevel * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🧠</Emoji>
            <Label>정신적 자극 필요도:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.needsMentalStimulation * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🎓</Emoji>
            <Label>훈련 가능성:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.trainabilityLevel * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🪮</Emoji>
            <Label>털 빠짐 정도:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.sheddingLevel * 20}%`} reverse="true" />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🧼</Emoji>
            <Label>그루밍 필요도:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.groomingLevel * 20}%`} reverse="true" />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🗣️</Emoji>
            <Label>짖는 수준:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.barkingLevel * 20}%`} reverse="true" />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>💧</Emoji>
            <Label>침 흘림 수준:</Label>
            <BarWrapper>
              <Bar width={`${selectedBreed.droolingLevel * 20}%`} reverse="true" />
            </BarWrapper>
          </BarContainer>
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

export default BreedDetail;
