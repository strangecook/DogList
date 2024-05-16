import { useNavigate } from "react-router-dom";
import dogLoginPicture from "../Pictures/fatty-corgi-EpRAM95thHU-unsplash.jpg";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { LoginCover, DogLoginImage, LoginBox, Form, Input, SignUpButton, ErrorMessage } from "../login/loginCss";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
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

  // 첫 번째 오류 메시지를 가져오는 함수
  const getFirstErrorMessage = () => {
    if (errors.email) return errors.email.message;
    if (errors.password) return errors.password.message;
    return null;
  };

  return (
    <LoginCover>
      <DogLoginImage src={dogLoginPicture} alt="dog" />
      <LoginBox>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {
              required: "이메일을 입력하세요",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "유효한 이메일 주소를 입력하세요"
              }
            })}
            name="email"
            placeholder="이메일"
            type="email"
          />
          <Input
            {...register("password", {
              required: "비밀번호를 입력하세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다"
              }
            })}
            name="password"
            placeholder="비밀번호"
            type="password"
          />
          {getFirstErrorMessage() && <ErrorMessage>{getFirstErrorMessage()}</ErrorMessage>}
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
