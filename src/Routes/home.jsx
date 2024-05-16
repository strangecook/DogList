import styled from 'styled-components';
import AnimalDaterpart from '../home/animalDaterpart';
import Descriotionpage from '../home/Descriptionpage';
import LoginNavi from '../NaviBar/LoginNavi';


export default function Home(){
    
  const MainCoverdiv = styled.div`
  margin: 0;
  width: 100vw;
  background-position: center;
`;

    return (
        <>
        <MainCoverdiv>
            <LoginNavi />
            <Descriotionpage />
            <AnimalDaterpart />
        </MainCoverdiv>
        </>
    )
}