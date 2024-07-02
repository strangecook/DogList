// src/component/Modal.jsx
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

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

const CustomModalContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  overflow-y: auto; /* overflow-y 설정 추가 */
  overflow-x: hidden;
  font-family: 'Nanum Gothic', sans-serif;
  color: #333;
  max-height: 75vh; /* 최대 높이 설정 */
`;

const DetailButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #007BFF;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h2`
  margin: 0;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const CustomModal = ({ isOpen, onRequestClose, breed }) => {
  const setSelectedBreed = useStore(state => state.setSelectedBreed);

  const handleDetailButtonClick = () => {
    setSelectedBreed(breed);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Breed Details" 
      style={{
        content: {
          maxWidth: '600px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '10px',
          overflow: 'hidden', // 모달의 overflow 제거
          width: '90%',
          maxHeight: '90vh',
          position: 'relative' // 모달 내부 컨텐츠의 위치를 조정
        },
        overlay: {
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }
      }}
    >
      <CustomModalContainer>
        <Title>{breed.koreanName} ({breed.englishName})</Title>
        <BarSection>
          <BarContainer>
            <Emoji>🌟</Emoji>
            <Label>적응력:</Label>
            <BarWrapper>
              <Bar width={`${breed.adaptabilityLevel * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>❤️</Emoji>
            <Label>가족과의 애정:</Label>
            <BarWrapper>
              <Bar width={`${breed.affectionWithFamily * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🐾</Emoji>
            <Label>다른 개와의 친화력:</Label>
            <BarWrapper>
              <Bar width={`${breed.goodWithOtherDogs * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>👶</Emoji>
            <Label>어린 아이와의 친화력:</Label>
            <BarWrapper>
              <Bar width={`${breed.goodWithYoungChildren * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🐕</Emoji>
            <Label>타인에 대한 개방성:</Label>
            <BarWrapper>
              <Bar width={`${breed.opennessToStrangers * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🛡️</Emoji>
            <Label>보호 본능:</Label>
            <BarWrapper>
              <Bar width={`${breed.guardProtectiveInstinct * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>⚡</Emoji>
            <Label>에너지 수준:</Label>
            <BarWrapper>
              <Bar width={`${breed.energyLevel * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🎮</Emoji>
            <Label>장난기:</Label>
            <BarWrapper>
              <Bar width={`${breed.playfulnessLevel * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🧠</Emoji>
            <Label>정신적 자극 필요도:</Label>
            <BarWrapper>
              <Bar width={`${breed.needsMentalStimulation * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🎓</Emoji>
            <Label>훈련 가능성:</Label>
            <BarWrapper>
              <Bar width={`${breed.trainabilityLevel * 20}%`} />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🪮</Emoji>
            <Label>털 빠짐 정도:</Label>
            <BarWrapper>
              <Bar width={`${breed.sheddingLevel * 20}%`} reverse="true" />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🧼</Emoji>
            <Label>그루밍 필요도:</Label>
            <BarWrapper>
              <Bar width={`${breed.groomingLevel * 20}%`} reverse="true" />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>🗣️</Emoji>
            <Label>짖는 수준:</Label>
            <BarWrapper>
              <Bar width={`${breed.barkingLevel * 20}%`} reverse="true" />
            </BarWrapper>
          </BarContainer>
          <BarContainer>
            <Emoji>💧</Emoji>
            <Label>침 흘림 수준:</Label>
            <BarWrapper>
              <Bar width={`${breed.droolingLevel * 20}%`} reverse="true" />
            </BarWrapper>
          </BarContainer>
        </BarSection>
        <ul>
          <ListItem>품종 그룹: {breed.breedGroup}</ListItem>
          <ListItem>털 길이: {breed.coatLength}</ListItem>
          <ListItem>털 타입: {breed.coatType}</ListItem>
          <ListItem>키: {breed.height}</ListItem> 
          <ListItem>수명: {breed.lifeExpectancy}</ListItem>
          <ListItem>기원: {breed.origin}</ListItem>
          <ListItem>크기: {breed.size}</ListItem>
          <ListItem>체중: {breed.weight}</ListItem>     
        </ul>
        <p>{breed.description}</p>
        <DetailButton to={`/breeds/${breed.englishName.toLowerCase()}`} onClick={handleDetailButtonClick}>
          자세한 정보 보러가기
        </DetailButton>
      </CustomModalContainer>
    </Modal>
  );
}

export default CustomModal;
