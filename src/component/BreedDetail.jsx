// components/BreedDetail.js
import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useStore from '../store/useStore';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetailContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
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
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const GraphContainer = styled.div`
  margin-bottom: 30px;
`;

const BreedDetail = () => {
  const selectedBreed = useStore(state => state.selectedBreed);

  if (!selectedBreed) {
    return <DetailContainer>해당 강아지의 정보를 찾을 수 없습니다.</DetailContainer>;
  }

  // 숫자 데이터만 추출하여 그래프 데이터로 변환
  const numericData = {
    labels: [
      '적응력', '가족과의 애정', '다른 개와의 친화력', '어린 아이와의 친화력', 
      '타인에 대한 개방성', '보호 본능', '에너지 수준', '장난기', 
      '정신적 자극 필요도', '훈련 가능성', '털 빠짐 정도', '그루밍 필요도', 
      '짖는 수준', '침 흘림 수준'
    ],
    datasets: [
      {
        label: 'Level',
        data: [
          selectedBreed.adaptabilityLevel, selectedBreed.affectionWithFamily, 
          selectedBreed.goodWithOtherDogs, selectedBreed.goodWithYoungChildren, 
          selectedBreed.opennessToStrangers, selectedBreed.guardProtectiveInstinct, 
          selectedBreed.energyLevel, selectedBreed.playfulnessLevel, 
          selectedBreed.needsMentalStimulation, selectedBreed.trainabilityLevel, 
          selectedBreed.sheddingLevel, selectedBreed.groomingLevel, 
          selectedBreed.barkingLevel, selectedBreed.droolingLevel
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <DetailContainer>
      <h2>{selectedBreed.koreanName} ({selectedBreed.englishName})</h2>
      {selectedBreed.image && <Image src={selectedBreed.image.url} alt={selectedBreed.englishName} />}

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
        <GraphContainer>
          <Bar data={numericData} />
        </GraphContainer>
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
