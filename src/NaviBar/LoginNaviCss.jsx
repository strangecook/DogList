import styled from 'styled-components';

export const NaviBar = styled.div`
position: absolute;
z-index: 5;
display: flex;
justify-content: space-between;
margin: 12px;
width: calc(100vw - 36px);

.naviDivLeft{
    display: flex;
}

.naviDivRight{
    display: flex;
    color: white ;
}

.naviLoginButton{
    background-color: #4caf50;
margin: 10px;
border-radius: 10px;
text-align: center;
color: white;
-webkit-text-stroke-width: 0.03px;
-webkit-text-stroke-color: black;
cursor: pointer;
font-weight: bold;
width: 120px;
height: 40px;
line-height: 40px;
}

.naviLoginButtonHovered{
    background-color: white;
margin: 10px;
border-radius: 10px;
text-align: center;
color: #4caf50;
-webkit-text-stroke-width: 0.03px;
-webkit-text-stroke-color: black;
cursor: pointer;
font-weight: bold;
width: 120px;
height: 40px;
line-height: 40px;
}

.mainImageSpan{
    width: 80px;
    height: 80px;
    border-radius: 50px;
    background-color: #4caf50;
}

.mainHoverImageSpan{
    width: 80px;
    height: 80px;
    border-radius: 50px;
    background-color: #B8E0B9;
}

.MainImage {
    width: 64px;
    height: 64px;
    color: aliceblue;
    margin: 8px;
}
`