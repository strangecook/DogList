import styled from 'styled-components';

export let DescriptionCover = styled.div`
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden; /* x축 스크롤을 숨기기 위해 추가 */
`;

export let Dogimage = styled.img`
  width: 100vw; /* 이미지가 화면 너비를 넘지 않도록 설정 */
  height: auto;
  object-fit: cover;
`;

export let Context = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  text-align: left;
  color: #fff;

  .contextH1 {
    white-space: pre-wrap;
    font-size: 3vw;
    line-height: 1.2em;
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: black;
  }

  .contextH3 {
    white-space: pre-wrap;
    font-size: 1.5vw;
    margin-top: 0;
    margin-bottom: 14px;
    -webkit-text-stroke-width: 0.3px;
    -webkit-text-stroke-color: black;
  }

  .emailcontainer {
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: center;
    border: 1px solid #ccc;
  }

  .emaildiv {
    width: 100%;

    .emailInput {
      width: 100%;
      padding: 10px;
      border: 0;
      border-bottom: 2px solid #ccc;
      font-size: 1.2rem;
    }

    .emailInput:focus {
      border-color: #4caf50;
      outline: none;
      transition: border-color 0.3s ease;
    }
  }

  .buttonNormal,
  .buttonHovered {
    padding: 10px 20px;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .buttonNormal {
    background-color: #4caf50;
    color: white;
    border: solid 1px;
  }

  .buttonHovered {
    background-color: white;
    color: #4caf50;
    border: solid 1px;
  }

  @media (max-width: 768px) {
    left: 5%;
    .contextH1 {
      font-size: 6vw;
    }

    .contextH3 {
      font-size: 3vw;
    }

    .emailcontainer {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .buttonNormal,
    .buttonHovered {
      width: 100%;
    }
  }
`;

export let Notification = styled.p`
  color: ${(props) => (props.isError ? 'red' : 'green')};
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  width: 50%;
  max-width: 350px;
  padding: 7px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
