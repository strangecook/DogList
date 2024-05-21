import styled from 'styled-components';

export let DescriptionCover = styled.div`
width: 100vw;
position: relative;

`
export let Dogimage = styled.img`
height: auto;
width: 100vw;
background-size: cover;
background-position: 0 -25px;
`

export let Context = styled.div`
position: absolute;
top: 80%;
left: 30%;
height: 100%;
transform: translate(-50%, -50%);

.contextH1 {
    white-space: pre-wrap;
    font-size: 56px;
    line-height: 1;
    color: #fff;
    text-transform: initial;
    line-height: 1.2em;
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: black;
}

.contextH3 {
    white-space: pre-wrap;
    font-weight: 500;
margin-top: 0;
font-size: 21px;
margin-bottom: 14px;
padding-right: 56px;
color: #fff;
-webkit-text-stroke-width: 0.3px;
-webkit-text-stroke-color: black;
}

.emailcontainer{
    width: 50%;
    max-width: 350px;
    background-color: #fff;
    border-radius: 10px;
    padding: 7px;
    border: 1px solid
}

.buttonNormal{
margin-bottom: 14px;
padding-top: 14px;
padding-bottom: 14px;
background-color: #4caf50;
margin: 10px;
border-radius: 10px;
text-align: center;
color: white;
-webkit-text-stroke-width: 0.03px;
-webkit-text-stroke-color: black;
border: solid 1px;
cursor: pointer;
font-weight: bold;
width: 95%;
transition: all 0.3s ease;

}

.buttonHovered{
margin-bottom: 14px;
padding-top: 14px;
padding-bottom: 14px;
background-color: white;
margin: 10px;
border-radius: 10px;
text-align: center;
color: #4caf50;
-webkit-text-stroke-width: 0.03px;
-webkit-text-stroke-color: black;
border: solid 1px;
cursor: pointer;
font-weight: bold;
width: 95%;
transition: all 0.3s ease;
}

.emaildiv{
    margin: 10px;

    .emailInput{
        width: 100%;
        margin: auto;
        border: 0; 
        padding: 7px 0; 
        border-bottom: 2px solid #ccc;
        font-size: 1.2rem;
    }
    .emailInput:focus{
        width: 100%;
        margin: auto;
        border: 0; 
        padding: 7px 0; 
        border-bottom: 2px solid #ccc;
        transition: 0.4s;
        border-color: #4caf50;
        outline: none;
    }
}

`
