//src\component\Modal.jsx
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
  overflow-y: auto;
  max-height: 80vh;
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

const CustomModal = ({ isOpen, onRequestClose, breed }) => {

  const setSelectedBreed = useStore(state => state.setSelectedBreed);


  const handleDetailButtonClick = () => {
    setSelectedBreed(breed);
  };
  
return(
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
        overflow: 'hidden',
        width: '90%',
        maxHeight: '90vh',
      },
      overlay: {
        zIndex: 100
      }
    }}
  >
    <CustomModalContainer>
      <h2>{breed.koreanName} ({breed.englishName})</h2>
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
        <li>품종 그룹: {breed.breedGroup}</li>
        <li>털 길이: {breed.coatLength}</li>
        <li>털 타입: {breed.coatType}</li>
        <li>키: {breed.height}</li> 
        <li>수명: {breed.lifeExpectancy}</li>
        <li>기원: {breed.origin}</li>
        <li>크기: {breed.size}</li>
        <li>체중: {breed.weight}</li>     
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
