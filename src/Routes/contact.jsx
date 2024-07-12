import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 20px auto; 
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
`;

const Contact = () => {
  return (
    <ContactContainer>
      <h2>개발자 문의</h2>
      <p>여기에 개발자 문의 내용을 작성하세요.</p>
    </ContactContainer>
  );
};

export default Contact;
