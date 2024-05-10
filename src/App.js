import React from 'react';
import AnimalDaterpart from './animalDaterpart';
import Descriotionpage from './Descriptionpage';
import styled from 'styled-components';

const App = () => {

  const MainCoverdiv = styled.div`
  margin: 0;
  width: 100vw;
  background-position: center;
`;


  return (
    <MainCoverdiv>
      <Descriotionpage />
      <AnimalDaterpart />
    </MainCoverdiv>
  );
};

export default App;
