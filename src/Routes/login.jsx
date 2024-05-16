import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dogLoginPicture from "../Pictures/fatty-corgi-EpRAM95thHU-unsplash.jpg";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

const LoginCover = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DogLoginImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

const LoginBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px 60px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
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

const SignUpButton = styled.button`
  background: none;
  border: none;
  color: #4caf50;
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    color: #B8E0B9;
  }
`;

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const moveToCreatePage = () => {
    navigate("/CreateAccount");
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    // 서버 요청 등의 비동기 작업을 처리 후 isLoading 상태를 false로 설정
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <LoginCover>
      <DogLoginImage src={dogLoginPicture} alt="dog" />
      <LoginBox>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            name="email"
            placeholder="이메일"
            type="email"
          />
          <Input
            {...register("password")}
            name="password"
            placeholder="비밀번호"
            type="password"
          />
          <Input
            type="submit"
            value={isLoading ? "계정 확인 중..." : "로그인"}
            disabled={isLoading}
          />
        </Form>
        <SignUpButton onClick={moveToCreatePage}>회원가입</SignUpButton>
      </LoginBox>
    </LoginCover>
  );
}
