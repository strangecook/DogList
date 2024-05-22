import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, breed }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Breed Details"
      style={customStyles}
    >
      <ModalContent>
        <CloseButton onClick={onRequestClose}>X</CloseButton>
        <ModalTitle>{breed.name}</ModalTitle>
        <ModalText>Bred for: {breed.bred_for || 'N/A'}</ModalText>
        <ModalText>Breed group: {breed.breed_group || 'N/A'}</ModalText>
        <ModalText>Life span: {breed.life_span || 'N/A'}</ModalText>
        <ModalText>Shedding level: {breed.shedding_level || 'N/A'}</ModalText>
      </ModalContent>
    </Modal>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 2em;
  color: #333;
`;

const ModalText = styled.p`
  margin: 10px 0;
  color: #666;
  font-size: 1em;
`;

export default CustomModal;
