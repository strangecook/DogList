import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const MembershipContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #2C3E50;
`;

const Subtitle = styled.h2`
  color: #34495E;
  margin-bottom: 20px;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 20px;
`;

const BadgeTitle = styled.h2`
  color: #2C3E50;
  margin-bottom: 10px;
`;

const BadgeDescription = styled.p`
  color: #7F8C8D;
  margin-bottom: 20px;
  text-align: center;
`;

const BadgePrice = styled.p`
  font-size: 1.5em;
  color: #4caf50;
  margin-bottom: 20px;
`;

const BadgeButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;

const DonationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 20px;
`;

const DonationTitle = styled.h2`
  color: #2C3E50;
  margin-bottom: 10px;
`;

const DonationDescription = styled.p`
  color: #7F8C8D;
  margin-bottom: 20px;
  text-align: center;
`;

const DonationAmounts = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const DonationAmount = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
  transition: border 0.3s;

  &:hover {
    border: 1px solid #4caf50;
  }

  ${({ selected }) =>
    selected &&
    `
    border: 2px solid #4caf50;
  `}
`;

const DonationButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const BenefitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin-top: 20px;
  text-align: left;
`;

const BenefitItem = styled.div`
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #2C3E50;

  &::before {
    content: "✔️";
    margin-right: 10px;
    color: #4caf50;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color: #2C3E50;
`;

const ModalButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
  },
};

const Membership = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const donationAmounts = [
    { id: 1, amount: '$5' },
    { id: 2, amount: '$10' },
    { id: 3, amount: '$20' },
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDonate = () => {
    if (selectedAmount) {
      openModal();
    }
  };

  const handleBadgePurchase = () => {
    openModal();
  };

  return (
    <MembershipContainer>
      <Title>APEUni VIP</Title>
      <SectionContainer>
        <BadgeContainer>
          <BadgeTitle>초기멤버 뱃지</BadgeTitle>
          <BadgeDescription>
            초기멤버 뱃지를 구매하고 특별한 혜택을 누리세요!
          </BadgeDescription>
          <BadgePrice>$1</BadgePrice>
          <BadgeButton onClick={handleBadgePurchase}>구매하기</BadgeButton>
        </BadgeContainer>

        <DonationContainer>
          <DonationTitle>제작자 기부</DonationTitle>
          <DonationDescription>
            다양한 금액으로 제작자에게 기부하고, 개발에 힘이 되도록 응원해주세요!
          </DonationDescription>
          <DonationAmounts>
            {donationAmounts.map((amount) => (
              <DonationAmount key={amount.id} onClick={() => handleAmountSelect(amount)} selected={selectedAmount?.id === amount.id}>
                {amount.amount}
              </DonationAmount>
            ))}
          </DonationAmounts>
          <DonationButton onClick={handleDonate} disabled={!selectedAmount}>
            {selectedAmount ? '기부하기' : '금액 선택'}
          </DonationButton>
        </DonationContainer>
      </SectionContainer>

      <BenefitsContainer>
        <Subtitle>구독 혜택</Subtitle>
        <BenefitItem>프로필에 초기멤버 뱃지 표시</BenefitItem>
        <BenefitItem>특별한 초기멤버 전용 제작자의 관심</BenefitItem>
        <BenefitItem>향후 서비스 개선 시 우선적인 피드백 기회 제공</BenefitItem>
        <BenefitItem>제작자와의 직접적인 소통 기회</BenefitItem>
      </BenefitsContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Coming Soon"
        ariaHideApp={false}
      >
        <ModalContent>
          <ModalTitle>곧 출시 예정입니다!</ModalTitle>
          <ModalButton onClick={closeModal}>닫기</ModalButton>
        </ModalContent>
      </Modal>
    </MembershipContainer>
  );
};

export default Membership;
