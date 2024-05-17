import styled from "styled-components";


export const LoginCover = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const DogLoginImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
`;


export const LoginBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px 60px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: auto;
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


export const Input = styled.input`
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4caf50;
  }

  &[type="submit"] {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: #B8E0B9;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;


export const SignUpButton = styled.button`
  background: none;
  border: none;
  color: #4caf50;
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;
  margin-top: auto; /* 회원가입 버튼을 아래로 내리기 위해 auto로 조정합니다 */

  &:hover {
    color: #B8E0B9;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px; /* 구글 로그인 버튼과 페이스북 로그인 버튼 사이의 간격을 조정합니다 */
`;

export const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1; /* 동일한 너비를 가지도록 flex 속성을 추가했습니다 */
  padding: 12px;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3367D6;
  }
  
  img {
    width: 24px;
    margin-right: 8px;
  }
`;

export const FacebookLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1; /* 동일한 너비를 가지도록 flex 속성을 추가했습니다 */
  padding: 12px;
  background-color: #1877F2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0D6DD2;
  }

  img {
    width: 24px;
    margin-right: 8px;
  }
`;